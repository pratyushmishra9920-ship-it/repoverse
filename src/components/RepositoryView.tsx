import React, { useState } from 'react'
import type { RepositoryData, FileTreeNode } from '../types'
import { FileTree } from './FileTree'
import { LanguageStats } from './LanguageStats'
import { ContributorsList } from './ContributorsList'
import { CommitsList } from './CommitsList'
import styles from './RepositoryView.module.css'

interface RepositoryViewProps {
  data: RepositoryData
  onBack: () => void
  isDemo: boolean
  demoNotice: string
  retryError: string | null
  retrying: boolean
  onRetryGitHub: () => void
}

type TabType = 'overview' | 'files' | 'languages' | 'contributors' | 'commits'

export const RepositoryView: React.FC<RepositoryViewProps> = ({
  data,
  onBack,
  isDemo,
  demoNotice,
  retryError,
  retrying,
  onRetryGitHub,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const totalLines = Object.values(data.languages).reduce((a, b) => a + b, 0)
  const topLanguage = Object.entries(data.languages).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className={styles.container}>
      {isDemo && (
        <div className={styles.demoNotice}>
          <div>
            <strong className={styles.demoLabel}>Demo Data</strong>
            <p>{demoNotice}</p>
            {retryError && <p className={styles.retryError} role="alert">{retryError}</p>}
          </div>
          <button className={styles.retryButton} onClick={onRetryGitHub} disabled={retrying}>
            {retrying ? 'Retrying GitHub API…' : 'Retry GitHub API'}
          </button>
        </div>
      )}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Go back">
          ← Back
        </button>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{data.metadata.name}</h1>
          <p className={styles.owner}>by {data.metadata.owner}</p>
          {data.metadata.description && <p className={styles.description}>{data.metadata.description}</p>}
        </div>
        <a
          href={data.metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
          aria-label="Open on GitHub"
        >
          View on GitHub →
        </a>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>⭐ {data.metadata.stars.toLocaleString()}</div>
          <div className={styles.statLabel}>Stars</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>🍴 {data.metadata.forks.toLocaleString()}</div>
          <div className={styles.statLabel}>Forks</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>👁️ {data.metadata.watchers.toLocaleString()}</div>
          <div className={styles.statLabel}>Watchers</div>
        </div>
        {topLanguage && (
          <div className={styles.statItem}>
            <div className={styles.statValue}>💻 {topLanguage[0]}</div>
            <div className={styles.statLabel}>Primary Lang</div>
          </div>
        )}
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'files' ? styles.active : ''}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'languages' ? styles.active : ''}`}
          onClick={() => setActiveTab('languages')}
        >
          Languages
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'contributors' ? styles.active : ''}`}
          onClick={() => setActiveTab('contributors')}
        >
          Contributors
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'commits' ? styles.active : ''}`}
          onClick={() => setActiveTab('commits')}
        >
          Recent Commits
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <div className={styles.overview}>
            <div className={styles.overviewGrid}>
              <div className={styles.card}>
                <h3>Topics</h3>
                <div className={styles.topics}>
                  {data.metadata.topics.length > 0 ? (
                    data.metadata.topics.map((topic) => (
                      <span key={topic} className={styles.topic}>
                        #{topic}
                      </span>
                    ))
                  ) : (
                    <p className={styles.empty}>No topics</p>
                  )}
                </div>
              </div>
              <div className={styles.card}>
                <h3>Language Distribution</h3>
                <div className={styles.languagePreview}>
                  {Object.entries(data.languages)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([lang, bytes]) => (
                      <div key={lang} className={styles.languageBar}>
                        <span className={styles.languageName}>{lang}</span>
                        <div
                          className={styles.bar}
                          style={{ width: `${(bytes / totalLines) * 100}%` }}
                          role="progressbar"
                          aria-valuenow={(bytes / totalLines) * 100}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <h3>Quick Stats</h3>
              <ul className={styles.statsList}>
                <li>
                  <strong>Total Files:</strong> {countFiles(data.fileTree)}
                </li>
                <li>
                  <strong>Total Directories:</strong> {countDirs(data.fileTree)}
                </li>
                <li>
                  <strong>Top Language:</strong> {topLanguage ? topLanguage[0] : 'N/A'}
                </li>
                <li>
                  <strong>Contributors:</strong> {data.contributors.length}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'files' && <FileTree node={data.fileTree} />}

        {activeTab === 'languages' && <LanguageStats languages={data.languages} />}

        {activeTab === 'contributors' && <ContributorsList contributors={data.contributors} />}

        {activeTab === 'commits' && <CommitsList commits={data.recentCommits} />}
      </div>
    </div>
  )
}

function countFiles(node: FileTreeNode): number {
  if (node.type === 'file') return 1
  if (!node.children) return 0
  return node.children.reduce((sum, child) => sum + countFiles(child), 0)
}

function countDirs(node: FileTreeNode): number {
  if (node.type === 'file') return 0
  if (!node.children) return 1
  return 1 + node.children.reduce((sum, child) => sum + countDirs(child), 0)
}
