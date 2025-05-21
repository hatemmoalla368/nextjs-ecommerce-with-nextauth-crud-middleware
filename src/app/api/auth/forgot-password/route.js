import { sendResetEmail } from '@/lib/resetpwmailer'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'


const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email } = await req.json()

    // 1. Validate email exists
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      )
    }

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user doesn't exist (security best practice)
      return new Response(
        JSON.stringify({ message: "If an account exists, you'll receive an email" }),
        { status: 400 }
      )
    }

    // 3. Generate secure token (32 bytes hex)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // 4. Update user with token (explicit typing)
    await prisma.user.update({
      where: { id: user.id }, // More reliable than email
      data: {
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry
      }
    })

    // 5. Send email
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    await sendResetEmail(email, resetLink)

    return new Response(
      JSON.stringify({ message: "Password reset email sent" }),
      { status: 200 }
    )

  } catch (error) {
    console.error("Forgot password error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
}