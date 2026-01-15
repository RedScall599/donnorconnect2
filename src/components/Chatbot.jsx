"use client"
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your DonorConnect assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chatbot button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ background: 'linear-gradient(135deg, hsl(var(--wood-brown)), hsl(var(--burnt-orange)))', color: 'hsl(var(--warm-ivory))' }}
        title="Chat with assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-96 h-[500px] rounded-xl border-2 shadow-2xl flex flex-col"
          style={{ background: 'hsl(var(--warm-ivory))', borderColor: 'hsl(var(--soft-terracotta))' }}
        >
          {/* Header */}
          <div className="p-4 border-b-2 rounded-t-xl" style={{ background: 'linear-gradient(135deg, hsl(var(--wood-brown)), hsl(var(--burnt-orange)))', borderColor: 'hsl(var(--soft-terracotta))' }}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: 'hsl(var(--warm-ivory))' }}>DonorConnect Assistant</h3>
              <button 
                onClick={() => setOpen(false)}
                className="transition-opacity hover:opacity-70"
                style={{ color: 'hsl(var(--warm-ivory))' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}
                  style={{ 
                    background: msg.role === 'user' ? 'hsl(var(--primary))' : 'hsl(var(--cream-beige))',
                    color: msg.role === 'user' ? 'hsl(var(--warm-ivory))' : 'hsl(var(--foreground))'
                  }}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg rounded-bl-none" style={{ background: 'hsl(var(--cream-beige))' }}>
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: 'hsl(var(--primary))' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t-2" style={{ borderColor: 'hsl(var(--soft-terracotta))' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'hsl(var(--soft-terracotta))', background: 'hsl(var(--background))' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-lg transition-all disabled:opacity-50"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--warm-ivory))' }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
