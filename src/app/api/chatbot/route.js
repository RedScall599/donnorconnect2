import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(request) {
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { message } = await request.json()
    
    // Helper responses for common questions
    const responses = {
      'donor': 'To add a new donor, go to the Donors page and click the "Add Donor" button. You can enter their contact information, status, and retention risk level. Use the AI helpers (question mark icons) for guidance on each field!',
      'donation': 'To record a donation, navigate to the Donations page and click "Add Donation". Select the donor, enter the amount, date, and payment type. You can optionally link it to a campaign.',
      'campaign': 'Campaigns help you organize your fundraising efforts. Create a new campaign from the Campaigns page (admin only). You can then link donations to specific campaigns to track their performance.',
      'segment': 'Donor segments allow you to group donors based on criteria like giving patterns, demographics, or risk levels. Create segments from the Segments page to target your communications effectively.',
      'task': 'Tasks help you stay organized with follow-ups and donor outreach. Add a task from the Tasks page and set a reminder date. Great for tracking thank you calls, follow-up emails, and more!',
      'ai': 'AI helpers are available on all forms - just click the question mark icon next to any field to get helpful guidance on what to enter. You can also check out the AI Policy page to learn more about how we use AI responsibly.',
      'admin': 'Admin accounts have special permissions to create campaigns and segments, and can access the Evidence and Reflection pages. Contact your organization administrator if you need admin access.',
      'retention': 'Donor retention risk helps you identify donors who might stop giving. Use the risk levels (Low, Medium, High, Critical) to prioritize your engagement efforts and prevent donor churn.',
      'dashboard': 'The Dashboard gives you an overview of your key metrics: total donors, total donations, recent activity, and upcoming tasks. It\'s your command center for donor management!',
      'help': 'I can help you with: adding donors and donations, creating campaigns and segments, managing tasks, understanding retention risk, using AI helpers, admin features, and navigating the dashboard. What would you like to know more about?'
    }

    // Find matching response based on keywords
    const lowerMessage = message.toLowerCase()
    let response = null

    for (const [keyword, answer] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        response = answer
        break
      }
    }

    // Default response if no keyword match
    if (!response) {
      response = 'I\'m here to help! I can answer questions about donors, donations, campaigns, segments, tasks, AI helpers, admin features, retention risk, and the dashboard. What would you like to know?'
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
