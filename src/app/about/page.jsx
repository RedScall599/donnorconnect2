import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl py-16 px-6">
        <h1 className="text-4xl font-extrabold mb-4">About DonorConnect</h1>
        <p className="text-lg text-slate-700 mb-6">DonorConnect is a lightweight donor retention platform built to help small nonprofits increase first-to-second gift conversion.</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Purpose</h2>
          <p className="text-slate-700">We provide automated retention workflows, donor segmentation, and actionable insights so nonprofits can retain more donors without extra staff time.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Problem</h2>
          <p className="text-slate-700">Many nonprofits lose donors after the first gift because they lack tools for timely follow-up and segmentation.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Solution</h2>
          <p className="text-slate-700">DonorConnect automates common retention tasks and surfaces recommendations to turn one-time donors into repeat supporters.</p>
        </section>

        <div className="flex gap-4">
          <Link href="/home" className="rounded-md border px-4 py-2">Back to Home</Link>
          <Link href="/dashboard" className="rounded-md bg-blue-600 text-white px-4 py-2">Open Dashboard</Link>
        </div>
      </div>
    </main>
  )
}
