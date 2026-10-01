import React, { useState } from 'react'
import type { FileTreeNode } from '../types'
import styles from './FileTree.module.css'

interface FileTreeProps {
  node: FileTreeNode
}

export const FileTree: React.FC<FileTreeProps> = ({ node }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['']))

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpanded(newExpanded)
  }

  const renderNode = (n: FileTreeNode, depth: number = 0): React.ReactNode => {
    const isDir = n.type === 'dir'
    const hasChildren = isDir && n.children && n.children.length > 0
    const isExpanded = expanded.has(n.path)

    if (depth === 0 && n.children) {
      return (
        <div className={styles.tree}>
          {n.children.map((child) => (
            <div key={child.path}>{renderNode(child, depth + 1)}</div>
          ))}
        </div>
      )
    }

    return (
      <div className={styles.node} style={{ paddingLeft: `${depth * 1.5}rem` }}>
        {isDir ? (
          <>
            <div
              className={styles.dirNode}
              onClick={() => toggleExpand(n.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleExpand(n.path)
                }
              }}
            >
              <span className={`${styles.icon} ${isExpanded ? styles.expanded : ''}`}>▶</span>
              <span className={styles.name}>📁 {n.name}</span>
            </div>
            {isExpanded && hasChildren && (
              <div className={styles.children}>
                {n.children!.map((child) => (
                  <div key={child.path}>{renderNode(child, depth + 1)}</div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.fileNode}>
            <span className={styles.icon}>📄</span>
            <span className={styles.name}>{n.name}</span>
            {n.size && <span className={styles.size}>({formatBytes(n.size)})</span>}
          </div>
        )}
      </div>
    )
  }

  return renderNode(node)
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
