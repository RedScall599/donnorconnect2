import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function ReflectionPage() {
  const user = await getSessionUser()
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <div className="mx-auto max-w-5xl py-16 px-6">
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: 'hsl(var(--primary))' }}>Project Reflection</h1>
        <p className="text-lg mb-8" style={{ color: 'hsl(var(--foreground))' }}>Insights and lessons learned from building DonorConnect</p>

        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--primary))' }}>Biggest Challenges</h2>
          <ul className="list-disc list-inside space-y-2" style={{ color: 'hsl(var(--foreground))' }}>
            <li>Implementing a complete donor management system with real database persistence and maintaining data integrity across related entities</li>
            <li>Building a secure authentication system that properly handles sessions and role-based access control</li>
            <li>Designing an intuitive UI that balances functionality with ease of use for nonprofit staff</li>
            <li>Integrating AI features responsibly while maintaining transparency and human oversight</li>
            <li>Managing the complexity of donor retention workflows and segmentation logic</li>
          </ul>
        </section>

        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--primary))' }}>What Would Change With More Time</h2>
          <ul className="list-disc list-inside space-y-2" style={{ color: 'hsl(var(--foreground))' }}>
            <li>Implement more comprehensive testing including end-to-end tests for critical user flows</li>
            <li>Add real-time notifications and email integration for donor engagement workflows</li>
            <li>Build more sophisticated AI-powered donor insights and predictive analytics</li>
            <li>Enhance the reporting dashboard with customizable charts and export capabilities</li>
            <li>Implement bulk import/export functionality for donors and donations</li>
            <li>Add more granular permission levels beyond just ADMIN and STAFF roles</li>
            <li>Improve mobile responsiveness and create a dedicated mobile app</li>
          </ul>
        </section>

        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--primary))' }}>Real-World Lessons Learned</h2>
          <ul className="list-disc list-inside space-y-2" style={{ color: 'hsl(var(--foreground))' }}>
            <li>Data integrity is crucial - donor relationships and donation tracking must be reliable for nonprofits to trust the system</li>
            <li>Simple, clear interfaces matter more than feature complexity for busy nonprofit staff</li>
            <li>Authentication and authorization need to be rock-solid from day one - retrofitting security is difficult</li>
            <li>Database schema design decisions early on have cascading effects throughout the application</li>
            <li>Documentation and code organization become critical as the project grows in complexity</li>
            <li>Real user feedback would be invaluable - assumptions about nonprofit needs may not match reality</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--primary))' }}>How AI Helped (and Didn't Help)</h2>
          <div className="space-y-4" style={{ color: 'hsl(var(--foreground))' }}>
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(var(--accent))' }}>Where AI Helped:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Accelerated development by generating boilerplate code and component structures</li>
                <li>Helped debug complex issues by analyzing error messages and suggesting solutions</li>
                <li>Provided quick references for Next.js patterns and Prisma queries without constant documentation lookups</li>
                <li>Assisted with CSS styling and responsive design implementations</li>
                <li>Generated test cases and edge case scenarios to consider</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(var(--accent))' }}>Where AI Didn't Help:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Understanding the specific business logic and domain requirements for nonprofit donor management</li>
                <li>Making architectural decisions about when to use server vs client components in Next.js 16</li>
                <li>Debugging subtle state management issues and React rendering behaviors</li>
                <li>Understanding the real needs of nonprofit users - that requires human empathy and research</li>
                <li>Making strategic product decisions about feature prioritization and user experience tradeoffs</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
