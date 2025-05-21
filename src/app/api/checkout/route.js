// /app/api/checkout/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust the import path to your nextauth config

import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import { sendActivationEmail } from "@/lib/mailer";
import crypto from 'crypto';

const prisma = new PrismaClient()
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    const { cartItems, userInfo } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        { status: 400 }
      );
    }

    let userId;

    if (session?.user?.id) {
      // User is logged in, get userId from session (server-side)
      userId = session.user.id;
    } else {
      // User is NOT logged in: register user using userInfo from request body

      const { firstName, lastName, email, password, address, phoneNumber } = userInfo || {};

      if (!firstName || !lastName || !email || !password || !address | !phoneNumber) {
        return new Response(
          JSON.stringify({ error: "Missing user registration info" }),
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "User with this email already exists" }),
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
    const activationToken = crypto.randomBytes(32).toString('hex');

      // Create user in DB
      const newUser = await prisma.user.create({
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

      userId = newUser.id;
    }

    // Now create the order linked to userId
    const total = cartItems.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    // Create order
     const order = await prisma.$transaction(async (prisma) => {
      for (const item of cartItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.id },
      select: { stock: true },
    });

    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.id}`);
    }
  }
      // First create the order
      const newOrder = await prisma.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          items: {
            create: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Then update each product's totalOrders count
      await Promise.all(
        cartItems.map((item) =>
          prisma.product.update({
            where: { id: item.id },
            data: {
              stock: {
            decrement: item.quantity, // Decrease stock
          },
              totalOrders: {
                increment: item.quantity, // Increment by the quantity ordered
              },
            },
          })
        )
      );

      return newOrder;
    });
if(!session){
return new Response(
      JSON.stringify({ message: "Order and account has been created, Activation email sent.", order }),
      { status: 201 }
    );
}else{
  return new Response(
      JSON.stringify({ message: "Order created", order }),
      { status: 201 }
    );
}
  
    
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error.message }),
      { status: 500 }
    );
  }
}