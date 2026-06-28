import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { z } from 'zod'
import { saveSurpriseRequest } from '@/lib/firestore'
import { sendAdminEmail, sendUserConfirmationEmail } from '@/lib/resend'

const schema = z.object({
  recipient: z.string().min(1),
  occasion: z.string().min(1),
  age: z.number().int().min(1).max(120),
  budget: z.number().min(50),
  deliveryDate: z.string().min(1),
  description: z.string().min(20),
  name: z.string().min(1),
  email: z.string().email(),
  contactPermission: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const requestId = await saveSurpriseRequest(data)

    await Promise.allSettled([
      sendAdminEmail({ ...data, requestId }),
      sendUserConfirmationEmail({ name: data.name, email: data.email }),
    ])

    return NextResponse.json({ success: true, id: requestId }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Submit error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
