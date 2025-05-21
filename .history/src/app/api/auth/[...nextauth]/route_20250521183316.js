import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter both email and password");
          }

          console.log('Attempting to query user with email:', credentials.email);
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("Invalid email or password");
          }
          

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Password is incorrect");
          }
if (!user.isActive) {
            throw new Error("account-not-activated"); // Special flag for UI
          }
          const userData = {
            id: user.id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName:user.lastName, // Ensure name is set
            role: user.role,
            address:user.address,
            phoneNumber:user.phoneNumber
          };
          

          return userData;
        } catch (error) {
          // Pass the error message directly to the client
          throw new Error(error.message);
        }
      
      },
    }),
  ],
  callbacks: {
     
    async jwt({ token, user, trigger, session }) {
      // When `update()` is called, merge updated session values into token
      if (trigger === "update" && session) {
        token.firstName = session.firstName;
        token.lastName = session.lastName;
        token.email = session.email;
        token.address = session.address;
        token.phoneNumber = session.phoneNumber;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName=user.lastName
        token.role = user.role;
        token.address = user.address;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      // Always return a session object, even if token is invalid
      if (token) {
        session.user = {
          id: token.id || '',
          email: token.email || '',
          firstName: token.firstName || 'Guest',
          lastName:token.lastName || 'Guest',

          role: token.role || 'user',
          address:token.address || '',
          phoneNumber:token.phoneNumber || '',
        };
      } else {
        // Return empty session for unauthenticated users
        session.user = null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login?error=', // Important for error propagation
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  events: {
    async signIn(message) {
      if (message.isError) {
        console.error('SignIn error:', message.error);
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };