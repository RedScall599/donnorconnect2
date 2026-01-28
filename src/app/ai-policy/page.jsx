import React from 'react'

export default function AIPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold">AI Policy</h1>
      <p className="mt-4 text-gray-700">This page describes how DonorConnect uses AI responsibly.</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">AI-powered Features</h2>
        <p className="mt-2 text-gray-600 text-base">DonorConnect uses AI to enhance nonprofit operations through:</p>
        <ul className="list-disc list-inside mt-2 text-gray-600 text-base space-y-1">
          <li><strong>Intelligent Chatbot Assistant:</strong> Powered by GPT-4o Mini to answer questions about donors, donations, campaigns, and platform features in natural language.</li>
          <li><strong>Form Field Guidance:</strong> Context-aware AI helpers (question mark icons) that provide real-time suggestions for filling out donor and donation forms.</li>
          <li><strong>Donor Risk Insights:</strong> AI-assisted analysis to help identify donors at risk of lapsing and prioritize retention efforts.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">AI APIs and Model</h2>
        <p className="mt-2 text-gray-600 text-base">We use OpenAI's GPT-4o Mini model via their hosted API to power our chatbot assistant and provide donor engagement insights. The model is accessed using securely managed API keys (stored in environment variables, never exposed to clients). This model choice balances performance, cost-effectiveness, and responsible AI practices while maintaining transparency and auditability.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">How We Use AI Responsibly</h2>
        <p className="mt-2 text-gray-600 text-base">At DonorConnect, we consider bias, ethics, security, and data privacy when using and building AI systems. Our responsible AI practices include:</p>
        <ul className="list-disc list-inside mt-3 text-gray-600 text-base space-y-2">
          <li><strong>Bias Mitigation:</strong> We regularly audit AI outputs to identify and correct potential biases in donor risk scoring and recommendations. Our AI suggestions are reviewed by diverse teams to ensure fair treatment across all donor demographics.</li>
          <li><strong>Ethical Design:</strong> Human-in-the-loop approach ensures AI suggestions are presented as recommendations only; nonprofit staff make all final decisions about donor engagement and outreach strategies.</li>
          <li><strong>Security:</strong> API keys are securely stored using environment variables, never exposed in client-side code. All AI API calls are authenticated and encrypted in transit. We maintain audit logs of all AI interactions for security review.</li>
          <li><strong>Data Privacy:</strong> We practice data minimization by only sending necessary donor attributes (donation history summary, anonymized engagement signals) to the AI API — not full personally identifiable information (PII) unless explicitly allowed by the organization.</li>
          <li><strong>Explainability & Transparency:</strong> We record the prompt and model response for each AI suggestion to allow review, auditing, and understanding of how recommendations are generated.</li>
          <li><strong>Safety Filters:</strong> We sanitize and post-process AI outputs to remove disallowed content, ensure appropriate language, and validate recommendations before display to users.</li>
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
