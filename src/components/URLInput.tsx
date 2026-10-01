import React, { useState, useRef } from 'react'
import styles from './URLInput.module.css'

interface URLInputProps {
  onSubmit: (url: string) => void
  loading: boolean
}

export const URLInput: React.FC<URLInputProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e as any)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://github.com/owner/repo or owner/repo"
          className={styles.input}
          disabled={loading}
          autoFocus
          autoComplete="off"
          aria-label="GitHub repository URL"
        />
        <button type="submit" className={styles.button} disabled={loading} aria-label="Explore repository">
          {loading ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Exploring...
            </>
          ) : (
            'Explore'
          )}
        </button>
      </div>
      <p className={styles.hint}>Enter any public GitHub repository URL to explore its universe</p>
    </form>
  )
}
