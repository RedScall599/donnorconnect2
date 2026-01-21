// Dashboard layout - Protected area
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Home, Users, Gift, TrendingUp, CheckSquare, FolderTree, Workflow } from 'lucide-react'

// Base navigation items
const baseNavigation = [
  { name: 'Donors', href: '/donors', icon: Users },
  { name: 'Donations', href: '/donations', icon: Gift },
  { name: 'Campaigns', href: '/campaigns', icon: TrendingUp },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
]

export default async function DashboardLayout({ children }) {
  // TODO: Get session user and redirect if not authenticated
  const user = await getSessionUser();
  if (!user) redirect('/login');

  // Build nav with Dashboard first; show Segments only to ADMINs
  const adminExtras = user?.role === 'ADMIN'
    ? [{ name: 'Segments', href: '/segments', icon: FolderTree }]
    : []

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    ...baseNavigation,
    ...adminExtras,
  ]

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      {/* Main Content */}
      <main>
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}