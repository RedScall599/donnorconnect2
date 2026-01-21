// Donors section layout - accessible to all authenticated users
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DonorsSectionLayout({ children }) {
  const user = await getSessionUser()
  if (!user) redirect('/login')
  // Allow all authenticated users to access donors
  return children
}
