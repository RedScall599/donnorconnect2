import Link from 'next/link'
import React from 'react'
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function EvidencePage() {
  const user = await getSessionUser()
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Replace placeholder URLs with real project links
  const links = {
    github: 'https://github.com/LaunchPadPhilly/donorconnect-bc2-RedScall599.git',
    
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl py-16 px-6">
        <h1 className="text-4xl font-extrabold mb-4">Evidence & Project Links</h1>
        <p className="text-lg text-slate-700 mb-6">This page collects evidence and links instructors can use to assess the DonorConnect implementation.</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">**CCC.1.3 Evidence**</h2>
          <ul className="list-disc list-inside text-slate-700">
            <li>Donors list, create, edit, and delete flows implemented and backed by the database.</li>
            <li>Donations recording and donor metrics (total gifts, total amount) updated on create.</li>
            <li>Dashboard shows live metrics and recent activity pulled from the database.</li>
            <li>Location in repo: <a href={links.github} className="text-blue-600" target="_blank" rel="noreferrer">Source code (GitHub)</a> — see API routes under <code>src/app/api/donors</code> and <code>src/app/api/donations</code>.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">**TS.6.2 Evidence**</h2>
          <ul className="list-disc list-inside text-slate-700">
            <li>AI integration for donor risk scoring and messaging suggestions is documented and implemented as a feature (see <Link href="/ai-policy" className="text-blue-600">AI Policy</Link> and related AI usage code).</li>
            <li>Prompting strategy and safety considerations are described on the AI Policy page.</li>
            <li>Demonstration: dashboard and donor detail pages surface AI suggestions (recorded prompts/responses are stored for auditing where enabled).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">**TS.6.3 Evidence**</h2>
          <ul className="list-disc list-inside text-slate-700">
            <li>Responsible AI practices: human-in-the-loop, data minimization, access controls, explainability, and safety filters (detailed on AI Policy page).</li>
            <li>Admin controls to toggle AI features and audit logs (implementation notes in repo).</li>
            <li>Example prompts and expected JSON response format used to validate AI responses before display.</li>
          </ul>
        </section>

        

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Notes for Instructors</h2>
          <p className="text-slate-700">To verify the core working feature (CCC.1.3): login with seeded demo user, navigate to <Link href="/donors" className="text-blue-600">Donors</Link> and <Link href="/donations" className="text-blue-600">Donations</Link>, create a donor and a linked donation, and confirm the dashboard and donor metrics update accordingly.</p>
        </section>
      </div>
    </main>
  )
}
