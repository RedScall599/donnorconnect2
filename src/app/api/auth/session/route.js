// Authentication API - Session Check
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    // TODO: Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value

    // TODO: Validate session using getSession function
    const session = await getSession(sessionToken)
    if (!session) {
      // TODO: Return 401 if invalid session
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Return user data if valid session
    return NextResponse.json({ user: session.user })
  } catch (error) {
    // TODO: Handle errors and return 500 response
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
