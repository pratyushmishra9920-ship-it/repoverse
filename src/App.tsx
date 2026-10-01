import React, { useState, useCallback } from 'react'
import { URLInput } from './components/URLInput'
import { RepositoryView } from './components/RepositoryView'
import { ErrorDisplay } from './components/ErrorDisplay'
import { DEMO_REPOSITORY } from './api/demoRepository'
import { fetchRepositoryData, GitHubRateLimitError } from './api/github'
import type { RepositoryData } from './types'
import styles from './App.module.css'

export const App: React.FC = () => {
  const [repoData, setRepoData] = useState<RepositoryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState('')
  const [isDemo, setIsDemo] = useState(false)
  const [demoNotice, setDemoNotice] = useState('')
  const [retryError, setRetryError] = useState<string | null>(null)

  const loadRepository = useCallback(async (url: string, isRetry = false) => {
    setLoading(true)
    setRetryError(null)
    if (!isRetry) {
      setRepoUrl(url)
      setError(null)
      setRepoData(null)
      setIsDemo(false)
      setDemoNotice('')
    }

    try {
      const data = await fetchRepositoryData(url)
      setRepoData(data)
      setIsDemo(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load repository'
      if (err instanceof GitHubRateLimitError) {
        setRepoData(DEMO_REPOSITORY)
        setIsDemo(true)
        setDemoNotice(
          isRetry
            ? 'GitHub is still rate-limited, so the demo remains available.'
            : 'GitHub API rate limit reached. This built-in sample keeps the full visualization available.'
        )
      } else if (isRetry) {
        setRetryError(message)
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRepoSubmit = useCallback((url: string) => loadRepository(url), [loadRepository])
  const handleRetry = useCallback(() => loadRepository(repoUrl, true), [loadRepository, repoUrl])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {!repoData ? (
          <div className={styles.inputSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>RepoVerse</h1>
              <p className={styles.subtitle}>Turn any GitHub repository into a living interactive universe</p>
            </div>
            <URLInput onSubmit={handleRepoSubmit} loading={loading} />
            {error && <ErrorDisplay message={error} />}
          </div>
        ) : (
          <RepositoryView
            data={repoData}
            onBack={() => setRepoData(null)}
            isDemo={isDemo}
            demoNotice={demoNotice}
            retryError={retryError}
            retrying={loading}
            onRetryGitHub={handleRetry}
          />
        )}
      </div>
    </div>
  )
}
