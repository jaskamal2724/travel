'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-black p-4">
      <div className="md:ml-64"> {/* Offset for sidebar */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to Dispatcher.ca</h1>
          <p className="text-xl mb-8 text-gray-900">Your Complete Dispatch Management Solution</p>
          <Link href="/dashboard">
            <Button className="bg-[#173c47] hover:bg-[#122b34]">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}