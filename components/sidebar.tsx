'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LayoutDashboard, Truck, FileText, Users, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Update the menuItems array
const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Trips', icon: Truck, href: '/trips/create' },  // Changed this line
  
]

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1e4d5c] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
        <div className="flex items-center justify-center h-16 bg-[#173c47]">
          <h1 className="text-white text-xl font-bold">Dispatcher.ca</h1>
        </div>
        <ScrollArea className="flex-1">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md hover:bg-[#173c47] hover:text-white transition ease-in-out duration-150 ${
                  pathname === item.href ? 'text-white bg-[#173c47]' : 'text-gray-300'
                }`}>
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </>
  )
}

