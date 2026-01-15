import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import Chatbot from '@/components/Chatbot'
import { getSessionUser } from '@/lib/session'

export const metadata = {
  title: 'DonorConnect - Donor Retention Platform',
  description: 'Improve donor retention through data-driven insights and automated workflows',
}

export default async function RootLayout({ children }) {
  const user = await getSessionUser()

  return (
    <html lang="en">
      <body>
        <SiteHeader userEmail={user?.email} />
        {children}
        {user && <Chatbot />}
      </body>
    </html>
  )
}
