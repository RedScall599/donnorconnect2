// Authentication API - User Logout
import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function POST(request) {
  try {
    // TODO: Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value

    if (sessionToken) {
      // TODO: Delete session using deleteSession function
      await deleteSession(sessionToken)
    }

    // TODO: Redirect to login after clearing cookie
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.set('session', '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    })
    return response
  } catch (error) {
    // TODO: Handle errors and return 500 response
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
