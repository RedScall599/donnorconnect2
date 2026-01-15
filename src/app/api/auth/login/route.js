// Authentication API - User Login
import { NextResponse } from 'next/server'
import { login } from '@/lib/auth'
import { createSession } from '@/lib/session'

export async function POST(request) {
  try {
    // Parse request body (email, password)
    let { email, password } = await request.json()

    // Normalize email (trim + lowercase)
    if (typeof email === 'string') email = email.trim().toLowerCase()

    // Unified error message for missing fields
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    // Authenticate user with login function
    let user
    try {
      user = await login(email, password)
    } catch (err) {
      console.error('Login error:', err)
      return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
    }
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    // If valid, create session
    let token
    try {
      token = await createSession(user.id)
    } catch (err) {
      return NextResponse.json({ error: 'Session creation failed.' }, { status: 500 })
    }
    const response = NextResponse.json({ user: { id: user.id, email: user.email, organizationId: user.organizationId } })
    response.cookies.set('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    return response
  } catch (error) {
    // Handle errors and return 500 response
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
