import { sendActivationEmail } from "@/lib/mailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import crypto from 'crypto';


const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, address, phoneNumber } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password ) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already in use" }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const activationToken = crypto.randomBytes(32).toString('hex');


    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        password: hashedPassword,
        role: "CUSTOMER",
        isActive: false,
        activationToken,
        
      },
    });
       await sendActivationEmail(email, activationToken);

    

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Activation email sent.",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Server error", message: error.message }),
      { status: 500 }
    );
  }
}


