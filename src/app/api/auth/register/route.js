// Authentication API - User Registration
import { NextResponse } from 'next/server'
import { register } from '@/lib/auth'

export async function POST(request) {
  try {
    // TODO: Parse request body (firstName, lastName, email, password, organizationId)
    const { firstName, lastName, email, password, organizationId } = await request.json()

    // TODO: Validate input data
    if (!firstName || !lastName || !email || !password || !organizationId) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // TODO: Register user with register function
    try {
      const user = await register({ firstName, lastName, email, password, organizationId })
      // TODO: Return success response with user data
      return NextResponse.json({ success: true, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, organizationId: user.organizationId } })
    } catch (err) {
      // TODO: Handle errors (duplicate email, validation errors)
      if (err && err.code === 'P2002') {
        // Prisma unique constraint violation (duplicate email)
        return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
      }
      return NextResponse.json({ error: err?.message || 'Registration failed.' }, { status: 400 })
    }
  } catch (error) {
    // TODO: Handle errors and return appropriate responses
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
