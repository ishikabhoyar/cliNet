import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, email, name, googleId, profilePicture } = body

    // Validate required fields
    if (!walletAddress || !email) {
      return NextResponse.json(
        { error: true, message: 'Wallet address and email are required' },
        { status: 400 }
      )
    }

    // Forward the request to the backend
    const response = await fetch(`${API_BASE_URL}/patient/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress,
        email,
        name,
        googleId,
        profilePicture
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    )
  }
}