import React from 'react'
import type { LanguageStats } from '../types'
import styles from './LanguageStats.module.css'

interface LanguageStatsProps {
  languages: LanguageStats
}

export const LanguageStats: React.FC<LanguageStatsProps> = ({ languages }) => {
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  if (sorted.length === 0) {
    return <div className={styles.empty}>No language data available</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        {sorted.map(([lang, bytes], idx) => {
          const percentage = (bytes / total) * 100
          const hue = (idx * 360) / sorted.length
          return (
            <div key={lang} className={styles.languageItem}>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${percentage}%`,
                    background: `hsl(${hue}, 70%, 55%)`,
                  }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.language}>{lang}</span>
                <span className={styles.percentage}>{percentage.toFixed(1)}%</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.legend}>
        <h3>Language Statistics</h3>
        <div className={styles.grid}>
          {sorted.map(([lang, bytes]) => (
            <div key={lang} className={styles.legendItem}>
              <div className={styles.dot} style={{ backgroundColor: `hsl(${sorted.indexOf([lang, bytes]) * 360 / sorted.length}, 70%, 55%)` }} />
              <span>{lang}: {formatBytes(bytes)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
