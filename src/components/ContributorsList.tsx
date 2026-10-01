import React from 'react'
import type { Contributor } from '../types'
import styles from './ContributorsList.module.css'

interface ContributorsListProps {
  contributors: Contributor[]
}

export const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }) => {
  if (contributors.length === 0) {
    return <div className={styles.empty}>No contributors data available</div>
  }

  const maxContributions = Math.max(...contributors.map((c) => c.contributions))

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {contributors.map((contributor) => {
          const percentage = (contributor.contributions / maxContributions) * 100
          return (
            <a
              key={contributor.login}
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={`${contributor.login} - ${contributor.contributions} contributions`}
            >
              <img
                src={contributor.avatarUrl}
                alt={contributor.login}
                className={styles.avatar}
              />
              <h3 className={styles.login}>{contributor.login}</h3>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className={styles.contributions}>{contributor.contributions} contributions</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}
