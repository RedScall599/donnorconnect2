// Next.js Middleware - Route protection and authentication
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/donors', '/campaigns', '/donations', '/segments', '/workflows', '/tasks']

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/register']

export async function proxy(request) {
  // Get session token from cookies
  const sessionToken = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Check if current path requires authentication
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Validate session by calling session API
  let isAuthenticated = false
  if (sessionToken) {
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
        headers: { Cookie: `session=${sessionToken}` },
        cache: 'no-store'
      })
      if (res.ok) {
        const data = await res.json()
        isAuthenticated = !!data?.user
      }
    } catch (e) {
      isAuthenticated = false
    }
  }

  // Redirect unauthenticated users to login
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.nextUrl.origin)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin))
  }

  // Allow request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (except auth check)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}