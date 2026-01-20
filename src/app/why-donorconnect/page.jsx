// Why DonorConnect - Marketing page explaining the value proposition
import Link from 'next/link'

export default function WhyDonorConnectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Why DonorConnect?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your donor retention with intelligent, data-driven insights
            that help nonprofits build lasting relationships.
          </p>
        </div>

        {/* Problem Section */}
        <div className="mb-20">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Challenge
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Most nonprofits struggle with a critical problem: <strong>first-to-second gift conversion</strong>.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Only 20% of first-time donors give a second gift</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Manual tracking makes it impossible to identify at-risk donors</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Limited staff capacity prevents personalized outreach</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Generic communication leads to donor disengagement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Solution
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Risk Scoring
              </h3>
              <p className="text-gray-600">
                AI-powered algorithms analyze donor behavior patterns to identify
                retention risks before donors lapse.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Actionable Insights
              </h3>
              <p className="text-gray-600">
                Real-time dashboards show which donors need attention, with
                recommended next steps for your team.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI-Assisted Outreach
              </h3>
              <p className="text-gray-600">
                Generate personalized messaging suggestions based on donor history
                and engagement patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-2xl mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Expected Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">40%</div>
              <div className="text-blue-100">Increase in second gifts</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3x</div>
              <div className="text-blue-100">More efficient outreach</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">60%</div>
              <div className="text-blue-100">Time saved on tracking</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Connect Your Data
                </h3>
                <p className="text-gray-600">
                  Import your existing donor and donation data or sync with your CRM.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Analyzes Patterns
                </h3>
                <p className="text-gray-600">
                  Our system identifies retention risks, engagement trends, and optimal outreach timing.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Take Action
                </h3>
                <p className="text-gray-600">
                  Get prioritized task lists, personalized message templates, and track your retention improvements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Donor Retention?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join nonprofits who are building stronger, lasting donor relationships.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              href="/about"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
