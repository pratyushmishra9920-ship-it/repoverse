import React from 'react'
import type { CommitInfo } from '../types'
import styles from './CommitsList.module.css'

interface CommitsListProps {
  commits: CommitInfo[]
}

export const CommitsList: React.FC<CommitsListProps> = ({ commits }) => {
  if (commits.length === 0) {
    return <div className={styles.empty}>No recent commits available</div>
  }

  return (
    <div className={styles.container}>
      {commits.map((commit) => (
        <a
          key={commit.sha}
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.commit}
          aria-label={`${commit.sha} - ${commit.message} by ${commit.author}`}
        >
          <div className={styles.header}>
            <code className={styles.sha}>{commit.sha}</code>
            <span className={styles.date}>{commit.date}</span>
          </div>
          <p className={styles.message}>{commit.message}</p>
          <p className={styles.author}>by {commit.author}</p>
        </a>
      ))}
    </div>
  )
}
