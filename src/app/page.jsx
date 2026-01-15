// Home / Marketing landing page
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function RootPage() {
  // Redirect site root to the marketing home page
  redirect('/home')
}
