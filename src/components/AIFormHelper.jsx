"use client"
import { useState } from 'react'
import { HelpCircle, Loader2, X } from 'lucide-react'

export default function AIFormHelper({ field, onSuggest, context = {} }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestion, setSuggestion] = useState(null)
  const [showSuggestion, setShowSuggestion] = useState(false)

  async function getSuggestion() {
    setLoading(true)
    setError(null)
    setShowSuggestion(false)
    
    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, context })
      })
      
      if (!response.ok) throw new Error('Failed to get AI suggestion')
      
      const data = await response.json()
      if (data.suggestion) {
        setSuggestion(data.suggestion)
        setShowSuggestion(true)
      }
    } catch (err) {
      setError(err.message)
      console.error('AI suggestion error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative inline-flex items-center ml-2">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          getSuggestion()
        }}
        disabled={loading}
        className="transition-all hover:opacity-70 disabled:opacity-50"
        style={{ color: 'hsl(var(--primary))' }}
        title="Get AI suggestion"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <HelpCircle className="h-4 w-4" />
        )}
      </button>
      
      {showSuggestion && suggestion && (
        <div 
          className="absolute left-0 top-6 z-50 min-w-[250px] max-w-[400px] p-3 rounded-lg shadow-xl border-2" 
          style={{ background: 'hsl(var(--warm-ivory))', borderColor: 'hsl(var(--soft-terracotta))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <strong className="text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>AI Suggestion:</strong>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowSuggestion(false)
              }}
              className="transition-colors hover:opacity-70"
              style={{ color: 'hsl(var(--accent))' }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <p className="text-sm" style={{ color: 'hsl(var(--foreground))' }}>{suggestion}</p>
        </div>
      )}
      
      {error && (
        <span className="text-xs ml-2" style={{ color: 'hsl(var(--destructive))' }}>
          AI unavailable
        </span>
      )}
    </div>
  )
}
