"use client"
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  // TODO: Implement state for email, password, error, loading
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // TODO: Implement handleSubmit function
  // - Prevent default form submission
  // - Make API call to /api/auth/login
  // - Handle success: redirect to dashboard or intended destination
  // - Handle errors: display error message
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!email || !password) {
      setError('Email and password are required.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed.')
      } else {
        // Show success confirmation then redirect
        setSuccess('Successful login')
        const next = searchParams.get('next') || '/home'
        setTimeout(() => router.push(next), 800)
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to access your dashboard.</CardDescription>
        <p className="text-sm text-muted-foreground">
          Once you seed the database, you can log in with the demo credentials below.
        </p>
      </CardHeader>
      <CardContent>
        {/* TODO: Add error display */}
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-sm" aria-live="polite">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TODO: Add email input field */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          {/* TODO: Add password input field */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {/* TODO: Add submit button with loading state */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Demo credentials: admin@hopefoundation.org / password123
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
