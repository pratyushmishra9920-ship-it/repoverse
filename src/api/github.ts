import type {
  RepositoryMetadata,
  FileTreeNode,
  LanguageStats,
  Contributor,
  CommitInfo,
  RepositoryData,
} from '../types'

const GITHUB_API_BASE = 'https://api.github.com'
const MAX_TREE_DEPTH = 3
const MAX_TREE_ITEMS = 1000

export class GitHubRateLimitError extends Error {
  constructor() {
    super('GitHub API rate limit exceeded. Please try again later. (60 requests/hour for unauthenticated requests)')
    this.name = 'GitHubRateLimitError'
  }
}

interface GitHubRepositoryResponse {
  name: string
  owner: { login: string }
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  topics?: string[]
  homepage: string | null
  language: string | null
}

interface GitHubTreeEntry {
  path: string
  type: 'blob' | 'tree' | 'commit'
  sha: string
  url: string
  size?: number
}

interface GitHubTreeResponse {
  tree: GitHubTreeEntry[]
  truncated: boolean
}

interface GitHubContributorResponse {
  login: string
  avatar_url: string
  contributions: number
  html_url: string
}

interface GitHubCommitResponse {
  sha: string
  html_url: string
  commit: {
    message: string
    author: { name: string; date: string } | null
    committer: { name: string; date: string } | null
  }
  author: { login: string } | null
}

function parseGitHubUrl(url: string): { owner: string; repo: string } {
  const trimmed = url.trim().replace(/\/$/, '')

  // Handle https://github.com/owner/repo
  const httpsMatch = trimmed.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/)
  if (httpsMatch) {
    return { owner: httpsMatch[1], repo: httpsMatch[2] }
  }

  // Handle git@github.com:owner/repo.git
  const sshMatch = trimmed.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/)
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2] }
  }

  // Handle owner/repo shorthand
  const shortMatch = trimmed.match(/^([^/]+)\/([^/]+?)(?:\.git)?$/)
  if (shortMatch && !trimmed.includes('://') && !trimmed.includes('@')) {
    return { owner: shortMatch[1], repo: shortMatch[2] }
  }

  throw new Error('Invalid GitHub repository URL format. Use: https://github.com/owner/repo or owner/repo')
}

async function fetchGitHubAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`)

  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get('x-ratelimit-remaining')
    let errorMessage = ''
    try {
      const errorBody: { message?: unknown } = await response.clone().json()
      if (typeof errorBody.message === 'string') errorMessage = errorBody.message
    } catch {
      // Preserve the status-based error when GitHub omits a JSON error body.
    }

    if (response.status === 429 || remaining === '0' || /rate limit/i.test(errorMessage)) {
      throw new GitHubRateLimitError()
    }
  }

  if (response.status === 403) {
    throw new Error('Access forbidden. The repository might be private.')
  }

  if (response.status === 404) {
    throw new Error('Repository not found. Please check the URL and try again.')
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`)
  }

  try {
    return await response.json()
  } catch {
    throw new Error('Failed to parse GitHub API response')
  }
}

async function fetchRepositoryMetadata(owner: string, repo: string): Promise<RepositoryMetadata> {
  const data = await fetchGitHubAPI<GitHubRepositoryResponse>(`/repos/${owner}/${repo}`)

  return {
    name: data.name,
    owner: data.owner.login,
    url: data.html_url,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.watchers_count,
    topics: data.topics || [],
    homepage: data.homepage,
    language: data.language,
  }
}

async function fetchFileTree(
  owner: string,
  repo: string,
  treeSha: string,
  path: string,
  depth: number,
  itemCount: { current: number }
): Promise<FileTreeNode> {
  if (depth > MAX_TREE_DEPTH || itemCount.current >= MAX_TREE_ITEMS) {
    return {
      name: path.split('/').pop() || repo,
      path,
      type: 'dir',
      children: [],
    }
  }

  const treeData = await fetchGitHubAPI<GitHubTreeResponse>(
    `/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=0`
  )

  const children: FileTreeNode[] = []

  // Sort: directories first, then files, both alphabetically
  const sortedTree = treeData.tree.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'tree' ? -1 : 1
    return a.path.localeCompare(b.path)
  })

  for (const item of sortedTree) {
    if (itemCount.current >= MAX_TREE_ITEMS) break

    itemCount.current++

    const nodePath = path ? `${path}/${item.path}` : item.path
    const node: FileTreeNode = {
      name: item.path.split('/').pop() || item.path,
      path: nodePath,
      type: item.type === 'tree' ? 'dir' : 'file',
      size: item.size,
    }

    if (item.type === 'tree' && depth < MAX_TREE_DEPTH) {
      node.children = (await fetchFileTree(owner, repo, item.sha, nodePath, depth + 1, itemCount)).children
    }

    children.push(node)
  }

  return {
    name: path.split('/').pop() || repo,
    path,
    type: 'dir',
    children,
  }
}

async function fetchLanguages(owner: string, repo: string): Promise<LanguageStats> {
  return fetchGitHubAPI<LanguageStats>(`/repos/${owner}/${repo}/languages`)
}

async function fetchContributors(owner: string, repo: string): Promise<Contributor[]> {
  const data = await fetchGitHubAPI<GitHubContributorResponse[]>(
    `/repos/${owner}/${repo}/contributors?per_page=10`
  )

  if (!Array.isArray(data)) {
    return []
  }

  return data.map((contributor) => ({
    login: contributor.login,
    avatarUrl: contributor.avatar_url,
    contributions: contributor.contributions,
    profileUrl: contributor.html_url,
  }))
}

async function fetchRecentCommits(owner: string, repo: string): Promise<CommitInfo[]> {
  const data = await fetchGitHubAPI<GitHubCommitResponse[]>(`/repos/${owner}/${repo}/commits?per_page=10`)

  if (!Array.isArray(data)) {
    return []
  }

  return data.map((commit) => ({
    sha: commit.sha.substring(0, 7),
    message: commit.commit.message.split('\n')[0],
    author: commit.commit.author?.name ?? commit.author?.login ?? 'Unknown author',
    date: commit.commit.author?.date
      ? new Date(commit.commit.author.date).toLocaleDateString()
      : commit.commit.committer?.date
        ? new Date(commit.commit.committer.date).toLocaleDateString()
        : 'Unknown date',
    url: commit.html_url,
  }))
}

export async function fetchRepositoryData(url: string): Promise<RepositoryData> {
  if (!url || typeof url !== 'string') {
    throw new Error('Please provide a valid repository URL')
  }

  let owner: string
  let repo: string

  try {
    ;({ owner, repo } = parseGitHubUrl(url))
  } catch (err) {
    throw err instanceof Error ? err : new Error('Invalid URL format')
  }

  try {
    const [metadata, languages, contributors, recentCommits] = await Promise.all([
      fetchRepositoryMetadata(owner, repo),
      fetchLanguages(owner, repo),
      fetchContributors(owner, repo),
      fetchRecentCommits(owner, repo),
    ])

    const itemCount = { current: 0 }
    const fileTree = await fetchFileTree(owner, repo, 'HEAD', '', 0, itemCount)

    return {
      metadata,
      fileTree,
      languages,
      contributors,
      recentCommits,
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to fetch repository data')
  }
}
