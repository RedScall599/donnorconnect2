// Authentication utilities
import { prisma } from './db'
import { hashPassword, verifyPassword } from './password'

/**
 * TODO: Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user object
 */
export async function register(userData) {
  // Validate input data
  if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.organizationId) {
    throw new Error('Missing required fields')
  }
  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email: userData.email } })
  if (existing) {
    throw new Error('User already exists')
  }
  // Hash password
  const hashed = await hashPassword(userData.password)
  // Create user in database
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashed,
      firstName: userData.firstName,
      lastName: userData.lastName,
      organizationId: userData.organizationId,
      role: userData.role || 'STAFF'
    },
    include: { organization: true }
  })
  // Return user object (without password)
  const { password, ...userSafe } = user
  return userSafe
}

/**
 * TODO: Authenticate user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object|null>} User object or null if invalid
 */
export async function login(email, password) {
  // Find user by email
  const user = await prisma.user.findUnique({ where: { email }, include: { organization: true } })
  if (!user) return null
  // Verify password
  const valid = await verifyPassword(password, user.password)
  if (!valid) return null
  // Return user object (without password)
  const { password: _pw, ...userSafe } = user
  return userSafe
}

/**
 * TODO: Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} User object or null
 */
export async function getUserById(userId) {
  // Query user from database with organization
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { organization: true } })
  if (!user) return null
  // Return user object (without password)
  const { password, ...userSafe } = user
  return userSafe
}