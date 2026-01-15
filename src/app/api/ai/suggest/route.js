import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(request) {
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { field, context } = await request.json()
    
    // Field labels for better context
    const fieldLabels = {
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'email': 'Email Address',
      'phone': 'Phone Number',
      'address': 'Street Address',
      'city': 'City',
      'state': 'State/Province',
      'zipCode': 'Zip/Postal Code',
      'donorStatus': 'Donor Status',
      'retentionRisk': 'Retention Risk Level',
      'amount': 'Donation Amount',
      'donor': 'Donor Selection',
      'date': 'Donation Date',
      'type': 'Donation Type',
      'method': 'Payment Method',
      'campaign': 'Campaign Association',
      'notes': 'Notes',
      'segmentName': 'Segment Name',
      'segmentType': 'Segment Type',
      'description': 'Description',
      'taskText': 'Task Description',
      'reminder': 'Reminder Date',
      'campaignName': 'Campaign Name',
      'campaignDescription': 'Campaign Description'
    }

    const fieldLabel = fieldLabels[field] || field
    
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set')
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })
    }
    
    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for a nonprofit donor management system called DonorConnect. Provide clear, concise guidance (2-3 sentences) on what users should enter in form fields. Be friendly and professional.'
          },
          {
            role: 'user',
            content: `Explain what should be entered in the "${fieldLabel}" field for a donor management system. Keep it brief and helpful.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error('OpenAI API error:', openaiResponse.status, errorData)
      throw new Error(`OpenAI API request failed: ${openaiResponse.status}`)
    }

    const data = await openaiResponse.json()
    const suggestion = data.choices[0]?.message?.content || 'No guidance available for this field.'
    
    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json({ error: 'Failed to generate suggestion', details: error.message }, { status: 500 })
  }
}
