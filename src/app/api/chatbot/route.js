import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { message } = await request.json()
    
    // System prompt to guide the AI assistant
    const systemPrompt = `You are a helpful assistant for DonorConnect, a nonprofit donor management platform. 
    
Your role is to help users understand and use the platform effectively. Here's what you can help with:

- **Donors**: Adding, editing, and managing donor information including contact details, status, and retention risk
- **Donations**: Recording donations, linking them to donors and campaigns, tracking amounts and payment types
- **Campaigns**: Organizing fundraising efforts and tracking campaign performance (admin feature)
- **Segments**: Grouping donors based on criteria like giving patterns and retention risk (admin feature)
- **Tasks**: Managing follow-ups and donor outreach activities
- **AI Helpers**: Form field guidance available via question mark icons
- **Retention Risk**: Understanding donor retention levels (Low, Moderate, High, Critical) and prioritizing engagement
- **Dashboard**: Overview of key metrics including total donors, donations, and at-risk donors
- **Admin Features**: Special permissions for creating campaigns and segments

Keep responses concise, friendly, and actionable. If asked about features not mentioned above, politely explain that you specialize in DonorConnect platform assistance.`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 300
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chatbot error:', error)
    
    // Fallback to keyword-based responses if OpenAI fails
    const message = error.message
    const fallbackResponse = 'I\'m having trouble connecting to my AI service right now. Please try asking about donors, donations, campaigns, segments, or tasks, and I\'ll do my best to help!'
    
    return NextResponse.json({ response: fallbackResponse })
  }
}
