import Link from 'next/link'
import { getSessionUser } from '@/lib/session'

export default async function HomeMarketingPage() {
  const user = await getSessionUser()
  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'hsl(var(--background))' }}>
      <section className="flex-1 flex flex-col justify-center px-6 py-6">
        <div className="mx-auto max-w-5xl text-center w-full">
          <h1 className="text-4xl font-extrabold mb-3" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1' }}>DonorConnect</h1>
          <p className="text-lg font-medium mb-4" style={{ color: 'hsl(var(--foreground))' }}>We help nonprofits turn first-time donors into loyal supporters.</p>

          <div className="max-w-4xl mx-auto space-y-3 mb-4">
            <div className="card text-left py-2.5 px-5">
              <p className="text-sm leading-relaxed"><span className="font-bold text-base" style={{ color: 'hsl(var(--primary))' }}>Purpose:</span> <span style={{ color: 'hsl(var(--foreground))' }}>DonorConnect exists to reduce donor attrition by providing small nonprofits with easy-to-use retention tools, automated workflows, and actionable donor intelligence so they can focus on mission work instead of chasing repeat donations.</span></p>
            </div>
            <div className="card text-left py-2.5 px-5">
              <p className="text-sm leading-relaxed"><span className="font-bold text-base" style={{ color: 'hsl(var(--primary))' }}>Problem:</span> <span style={{ color: 'hsl(var(--foreground))' }}>Many nonprofits lose valuable donors after the first gift because they lack automation and insight to follow up effectively.</span></p>
            </div>
            <div className="card text-left py-2.5 px-5">
              <p className="text-sm leading-relaxed"><span className="font-bold text-base" style={{ color: 'hsl(var(--primary))' }}>Solution:</span> <span style={{ color: 'hsl(var(--foreground))' }}>DonorConnect offers segmentation, automated retention workflows, and smart recommendations to increase first-to-second gift conversion.</span></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!user ? (
              <>
                <Link href="/register" className="btn-primary text-base px-8 py-3 shadow-xl">Get started — Create account</Link>
                <Link href="/login" className="btn-secondary text-base px-8 py-3">Or sign in</Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn-primary text-base px-8 py-3 shadow-xl">Open dashboard</Link>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t-4 flex-shrink-0" style={{ background: 'hsl(var(--primary))', borderColor: 'hsl(var(--accent))' }}>
        <div className="mx-auto max-w-6xl p-4 flex flex-col sm:flex-row justify-between text-sm">
          <span className="font-semibold" style={{ color: 'hsl(var(--warm-ivory))' }}>© {new Date().getFullYear()} DonorConnect</span>
          <nav className="mt-2 sm:mt-0 flex flex-wrap gap-5 font-medium">
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/why-donorconnect" className="footer-link">Why DonorConnect</Link>
            <Link href="/ai-policy" className="footer-link">AI Policy</Link>
            <Link href="/evidence" className="footer-link">Evidence</Link>
            <Link href="/reflection" className="footer-link">Reflection</Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
