// app/Providers.jsx
"use client";
import { SessionProvider } from "next-auth/react";
import { useSession } from 'next-auth/react';
export default function Providers({ children }) {
const { data: session } = useSession();
  

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}