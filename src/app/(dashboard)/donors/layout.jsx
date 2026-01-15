// Donors section layout with ADMIN-only access
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DonorsSectionLayout({ children }) {
  const user = await getSessionUser()
  if (!user) redirect('/login')
  if (user.role !== 'ADMIN') redirect('/dashboard')
  return children
}
