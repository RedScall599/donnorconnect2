/**
 * Toast Utility Component
 * TODO: Implement toast notification system
 */

import { useState, useEffect } from 'react'

export function useToast() {
  // Toast state management
  const [toasts, setToasts] = useState([])

  // Helper to generate unique IDs
  const genId = () => Math.random().toString(36).slice(2) + Date.now()

  // Add toast to state
  const addToast = (type, message) => {
    const id = genId()
    setToasts((prev) => [...prev, { id, type, message }])
    // Auto-dismiss after 4s
    setTimeout(() => dismissToast(id), 4000)
  }

  // Toast functions
  const toast = {
    success: (message) => addToast('success', message),
    error: (message) => addToast('error', message),
    info: (message) => addToast('info', message),
    warning: (message) => addToast('warning', message)
  }

  // Remove toast from state
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toast, toasts, dismissToast }
}

export function Toaster() {
  // Toast container component
  const { toasts, dismissToast } = useToast()
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            marginBottom: 12,
            padding: '12px 20px',
            borderRadius: 6,
            color: '#fff',
            background: toast.type === 'success' ? '#22c55e'
              : toast.type === 'error' ? '#ef4444'
              : toast.type === 'info' ? '#3b82f6'
              : toast.type === 'warning' ? '#f59e42'
              : '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            minWidth: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0.97,
            transition: 'all 0.3s'
          }}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            style={{
              marginLeft: 16,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              cursor: 'pointer',
              lineHeight: 1
            }}
            aria-label="Close"
          >×</button>
        </div>
      ))}
    </div>
  )
}

// TODO: Example usage:
// const { toast } = useToast()
// toast.success('Donor created successfully!')
// toast.error('Failed to save donor')
// toast.info('Processing donation...')
// toast.warning('Duplicate email detected')