"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  // TODO: Implement state for form fields and validation
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Fetch organizations for selection
  useEffect(() => {
    fetch('/api/organizations')
      .then(res => res.json())
      .then(data => setOrganizations(data.organizations || []))
      .catch(() => setOrganizations([]))
  }, [])

  // TODO: Implement handleSubmit function  
  // - Make API call to /api/auth/register
  // - Handle success and errors
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!firstName || !lastName || !email || !password || !organizationId) {
      setError('All fields are required.')
      setLoading(false)
      return
    }
    try {
      // Try to find organization by name (case-insensitive)
      let org = organizations.find(o => o.name.toLowerCase() === organizationId.trim().toLowerCase());
      let orgId = org ? org.id : null;
      // If not found, create new organization
      if (!orgId) {
        const orgRes = await fetch('/api/organizations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: organizationId.trim() })
        });
        if (!orgRes.ok) {
          const orgErr = await orgRes.json();
          setError(orgErr.error || 'Failed to create organization.');
          setLoading(false);
          return;
        }
        const orgData = await orgRes.json();
        orgId = orgData.organization?.id;
        if (!orgId) {
          setError('Failed to create organization.');
          setLoading(false);
          return;
        }
      }
      // Now register user with orgId
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, organizationId: orgId })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed.')
      } else {
        router.push('/login')
      }
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Register for a new account. 
          You must create this page as well! 
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Add error display */}
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TODO: Add form fields - firstName, lastName, email, password */}
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {/* TODO: Add organization selection */}
          <Input
            placeholder="Organization Name"
            value={organizationId}
            onChange={e => setOrganizationId(e.target.value)}
            required
            disabled={loading}
          />
          {/* TODO: Add submit button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card> 
    )
    
  }
