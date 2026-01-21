import React from 'react'

export default function AIPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold">AI Policy</h1>
      <p className="mt-4 text-gray-700">This page describes how DonorConnect uses AI responsibly.</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">AI-powered Features</h2>
        <p className="mt-2 text-gray-600 text-base">DonorConnect uses AI to provide donation risk scoring and donor-summary suggestions to help nonprofit staff prioritize outreach and improve donor retention.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">AI APIs and Model</h2>
        <p className="mt-2 text-gray-600 text-base">We use a hosted AI API to generate risk scores and donor messaging suggestions. The model used is GPT-5 mini via provider API (developer-managed keys). The model choice is documented here for transparency and auditability.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">How We Use AI Responsibly</h2>
        <ul className="list-disc list-inside mt-2 text-gray-600 text-base">
          <li>Human-in-the-loop: AI suggestions are presented as recommendations; staff make final decisions.</li>
          <li>Data minimization: We only send necessary donor attributes (e.g., donation history summary, anonymized engagement signals) to the AI API — not full PII unless explicitly allowed by the organization.</li>
          <li>Consent & access control: AI features are available only to authenticated users within the organization. Admins can toggle AI features.</li>
          <li>Explainability: We record the prompt and model response for each AI suggestion to allow review and auditing.</li>
          <li>Safety filters: We sanitize and post-process AI outputs to remove disallowed content before display.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Prompting Strategy</h2>
        <p className="mt-2 text-gray-600">Prompts are crafted to be specific, constrained, and contextual. Example approach:</p>
        <ol className="list-decimal list-inside mt-2 text-gray-600">
          <li>Provide a short donor profile summary (last 3 gifts, total amount, engagement signals).</li>
          <li>Ask the model for a concise risk score and one recommended action, with a short rationale.</li>
          <li>Limit response length and require a structured JSON output to simplify parsing and validation.</li>
        </ol>

        <p className="mt-2 text-gray-600">Example prompt (simplified):</p>
        <pre className="bg-gray-100 p-3 rounded mt-2 whitespace-pre-wrap break-words overflow-x-auto text-gray-600">{`Given donor summary: { totalGifts: 3, totalAmount: 230, lastGiftDate: '2025-11-02', engagement: 'low' }, provide a risk: LOW|MEDIUM|HIGH and one short recommended action in JSON: {"risk": "LOW", "recommendation": "Send personalized thank-you email this week."}`}</pre>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">How AI Improves DonorConnect</h2>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Speeds up identification of at-risk donors, enabling timely outreach.</li>
          <li>Generates suggested messaging to reduce staff time spent composing donor outreach.</li>
          <li>Provides structured insights that complement existing donor metrics and reports.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Privacy & Data Handling</h2>
        <p className="mt-2 text-gray-600">DonorConnect treats donor PII carefully. When AI features are enabled, we only transmit the minimum derived data necessary for the task. We never share full raw database records with third-party APIs without organization consent. API keys and usage are managed by the application administrator.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Contact & Audit</h2>
        <p className="mt-2 text-gray-600">For questions about AI use, data access, or to request an audit of AI prompt/response logs, contact your organization admin or the DonorConnect support team.</p>
      </section>
    </div>
  )
}
