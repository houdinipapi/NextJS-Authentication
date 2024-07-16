import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <header className="bg-gray-500 text-white">
            <nav className="flex justify-between items-center w-full px-10 py-4">
                <div>
                    <Link href="/">My Site</Link>
                </div>
                <div className="flex gap-10">
                    <Link href="/">Home</Link>
                    <Link href="/CreateUser">Create User</Link>
                    <Link href="/ClientMember">Client Member</Link>
                    <Link href="/Member">Member</Link>
                    <Link href="/Public">Public</Link>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar;