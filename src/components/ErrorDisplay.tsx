import React from 'react'
import styles from './ErrorDisplay.module.css'

interface ErrorDisplayProps {
  message: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className={styles.error} role="alert">
      <div className={styles.icon}>⚠️</div>
      <div className={styles.content}>
        <h3 className={styles.title}>Unable to load repository</h3>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}
