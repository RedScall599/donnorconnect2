"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SiteHeader({ userEmail }) {
  const [open, setOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)

  // Fetch user role
  useEffect(() => {
    async function fetchUserRole() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.user?.role);
        }
      } catch (err) {
        console.error('Failed to fetch user role:', err);
      }
    }
    if (userEmail) {
      fetchUserRole();
    }
  }, [userEmail]);

  const allLinks = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Why DonorConnect', href: '/why-donorconnect' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Donors', href: '/donors', adminOnly: true },
    { name: 'Donations', href: '/donations' },
    { name: 'Campaigns', href: '/campaigns' },
    { name: 'Segments', href: '/segments', adminOnly: true },
    { name: 'Tasks', href: '/tasks', adminOnly: true },
    { name: 'AI Policy', href: '/ai-policy' },
    { name: 'Evidence', href: '/evidence', adminOnly: true },
    { name: 'Reflection', href: '/reflection', adminOnly: true },
  ]

  // Filter links based on user role
  const links = allLinks.filter(link => !link.adminOnly || userRole === 'ADMIN')

  return (
    <header className="sticky top-0 z-50 border-b-4 border-accent/30" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--soft-terracotta)) 100%)', boxShadow: '0 4px 20px rgba(139, 69, 19, 0.2)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/home" className="text-2xl font-bold tracking-tight" style={{ background: 'linear-gradient(135deg, hsl(var(--warm-ivory)), hsl(var(--muted-gold)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>DonorConnect</Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Right-side menu button */}
            <div className="relative">
              <button
                aria-expanded={open}
                aria-controls="site-links-panel"
                onClick={() => setOpen(!open)}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, hsl(var(--wood-brown)), hsl(var(--burnt-orange)))', color: 'hsl(var(--warm-ivory))', boxShadow: '0 2px 8px rgba(139, 69, 19, 0.3)' }}
              >
                Menu
              </button>

              {open && (
                <div id="site-links-panel" className="dropdown-slide-in fixed top-16 right-6 w-72 max-h-[calc(100vh-5rem)] border-2 rounded-xl p-5 z-50 overflow-y-auto" style={{ background: 'hsl(var(--warm-ivory))', borderColor: 'hsl(var(--soft-terracotta))', boxShadow: '0 12px 40px rgba(139, 69, 19, 0.25)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <strong className="text-lg font-bold" style={{ color: 'hsl(var(--primary))' }}>Navigate</strong>
                    <button onClick={() => setOpen(false)} className="text-sm px-3 py-1.5 rounded-lg font-medium transition-all hover:bg-accent/10" style={{ color: 'hsl(var(--accent))' }}>✕</button>
                  </div>
                  <nav className="flex flex-col gap-1.5">
                    {links.map(link => (
                      <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg font-medium text-base transition-all hover:translate-x-1" style={{ color: 'hsl(var(--foreground))' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'hsl(var(--cream-beige))'; e.currentTarget.style.color = 'hsl(var(--accent))' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'hsl(var(--foreground))' }}>{link.name}</Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>

            {userEmail ? (
              <form action="/api/auth/logout" method="POST" className="flex items-center gap-4">
                <span className="text-sm font-semibold px-4 py-2 rounded-lg" style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--warm-ivory))' }}>{userEmail}</span>
                <button type="submit" className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--warm-ivory))', boxShadow: '0 2px 8px rgba(210, 105, 30, 0.3)' }}>Logout</button>
              </form>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-semibold transition-colors" style={{ color: 'hsl(var(--warm-ivory))' }}>Log in</Link>
                <Link href="/register" className="btn-primary text-sm">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
