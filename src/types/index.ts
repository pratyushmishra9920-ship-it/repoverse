export interface RepositoryMetadata {
  name: string
  owner: string
  url: string
  description: string | null
  stars: number
  forks: number
  watchers: number
  topics: string[]
  homepage: string | null
  language: string | null
}

export interface FileTreeNode {
  name: string
  path: string
  type: 'file' | 'dir'
  children?: FileTreeNode[]
  size?: number
}

export interface LanguageStats {
  [language: string]: number
}

export interface Contributor {
  login: string
  avatarUrl: string
  contributions: number
  profileUrl: string
}

export interface CommitInfo {
  sha: string
  message: string
  author: string
  date: string
  url: string
}

export interface RepositoryData {
  metadata: RepositoryMetadata
  fileTree: FileTreeNode
  languages: LanguageStats
  contributors: Contributor[]
  recentCommits: CommitInfo[]
}

export type APIError = 'INVALID_URL' | 'INVALID_REPO' | 'RATE_LIMIT' | 'API_ERROR' | 'NETWORK_ERROR'
