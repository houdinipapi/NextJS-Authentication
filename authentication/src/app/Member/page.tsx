import { getServerSession } from 'next-auth/next';
import React from 'react'
import options from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const MemberPage = async () => {

  const session: { user?: { email?: string, role?: string } } | null = await getServerSession(options)

  console.log("Session:", session);


  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }


  return (
    <div>
        <h1>Member Page</h1>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.role || "Role not found"}</p>

    </div>
  )
}

export default MemberPage;