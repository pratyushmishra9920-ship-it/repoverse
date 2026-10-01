import React, { useState, useCallback } from 'react'
import { URLInput } from './components/URLInput'
import { RepositoryView } from './components/RepositoryView'
import { ErrorDisplay } from './components/ErrorDisplay'
import { fetchRepositoryData } from './api/github'
import type { RepositoryData } from './types'
import styles from './App.module.css'

export const App: React.FC = () => {
  const [repoData, setRepoData] = useState<RepositoryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRepoSubmit = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    setRepoData(null)

    try {
      const data = await fetchRepositoryData(url)
      setRepoData(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load repository'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

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
          <RepositoryView data={repoData} onBack={() => setRepoData(null)} />
        )}
      </div>
    </div>
  )
}
