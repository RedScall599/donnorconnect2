// Session management for authentication
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'
import { prisma } from './db'

/**
 * TODO: Create a new session for a user
 * @param {string} userId - User ID to create session for
 * @returns {Promise<string>} Session token
 */
export async function createSession(userId) {
  // Generate secure session token
  const token = `${randomUUID()}${randomUUID()}`
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
  // Store session in database with expiration
  try {
    await prisma.session.create({
      data: {
        token,
        userId,
        expiresAt
      }
    })
  } catch (err) {
    console.error('Failed to create session:', err)
    throw err
  }
  // Set HTTP-only cookie (for API routes, must be set in route handler)
  // (No-op here, as cookies().set() is not allowed in API routes)
  return token
}

/**
 * TODO: Get session and user data from session token
 * @param {string} sessionToken - Session token to validate
 * @returns {Promise<Object|null>} Session with user data or null
 */
export async function getSession(sessionToken) {
  // Validate session token format
  if (!sessionToken || typeof sessionToken !== 'string') return null
  // Query database for session and user
  let session
  try {
    // Use findFirst to avoid strict findUnique invocation validation
    session = await prisma.session.findFirst({
      where: { token: sessionToken },
      include: { user: { include: { organization: true } } }
    })
  } catch (err) {
    console.error('Failed to load session:', err)
    return null
  }
  if (!session) return null
  // Check if session is expired
  if (session.expiresAt < new Date()) {
    try {
      // Use deleteMany to tolerate different where shapes and avoid errors
      await prisma.session.deleteMany({ where: { token: sessionToken } })
    } catch (err) {
      console.error('Failed to delete expired session:', err)
    }
    return null
  }
  // Return session with user data
  return {
    ...session,
    user: session.user ? { ...session.user, password: undefined } : null
  }
}

/**
 * TODO: Get current user from session (for server components)
 * @returns {Promise<Object|null>} User object or null
 */
export async function getSessionUser() {
  // Get session token from cookies
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value
  if (!sessionToken) return null
  // Call getSession to validate and get user
  const session = await getSession(sessionToken)
  // Return user or null
  return session?.user || null
}

/**
 * TODO: Delete a session (logout)
 * @param {string} sessionToken - Session token to delete
 */
export async function deleteSession(sessionToken) {
  // Delete session from database
  if (!sessionToken) return
  await prisma.session.deleteMany({ where: { token: sessionToken } })
  // Clear session cookie (must be done in API route handler)
  // (No-op here, as cookies().set() is not allowed in API routes)
}
