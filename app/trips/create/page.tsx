'use client'

import { useState } from 'react'
import { ChevronDown, Truck, Box, Navigation2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ActionType = 'shipper' | 'receiver' | 'highway' | null;

export default function CreateTrip() {
  const [step, setStep] = useState(1)
  const [currency, setCurrency] = useState('C$')
  const [activeAction, setActiveAction] = useState<ActionType>(null)

  const toggleAction = (action: ActionType) => {
    setActiveAction(activeAction === action ? null : action)
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          <span>Trips</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-primary">Create a trip</span>
        </div>
        <h1 className="text-2xl font-semibold">Create a trip</h1>
      </div>

      <div className="space-y-6">
        {/* Trip Details Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-primary">Trip Details</h2>
            <Button variant="ghost" className="text-primary">
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input type="date" placeholder="MM / DD / YYYY" />
            </div>
            <div>
              <Input placeholder="Order Number" />
            </div>
            <div className="flex gap-2">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="C$" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C$">C$</SelectItem>
                  <SelectItem value="US$">US$</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Rate" className="flex-1" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Checkbox id="delivered" />
            <label htmlFor="delivered" className="text-sm">
              Is this load already delivered?
            </label>
          </div>

          <Button variant="link" className="mt-2 h-auto p-0">
            Show advance settings
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </Card>

        {/* Customer Details Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-primary">Customer Details</h2>
            <Button variant="ghost" className="text-primary">
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-4 gap-2">
              <Select defaultValue="+1">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="+1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1</SelectItem>
                </SelectContent>
              </Select>
              <Input className="col-span-3" placeholder="_ _ _ - _ _ _ - _ _ _ _" />
            </div>
            <Input placeholder="Name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input placeholder="Unit / Street 1 / Etc..." />
            <Input placeholder="Address 2" />
            <Input placeholder="State" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input placeholder="City" />
            <Input placeholder="Country" />
            <Input placeholder="Postal Code" />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center mt-4">
          <Button 
            variant={activeAction === 'shipper' ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => toggleAction('shipper')}
          >
            <Box className="h-4 w-4" />
            Shipper Details
          </Button>
          <Button 
            variant={activeAction === 'receiver' ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => toggleAction('receiver')}
          >
            <Navigation2 className="h-4 w-4" />
            Receiver Details
          </Button>
          <Button 
            variant={activeAction === 'highway' ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => toggleAction('highway')}
          >
            <Truck className="h-4 w-4" />
            Highway Dispatch
          </Button>
        </div>

        {/* Shipper Details Section */}
        {activeAction === 'shipper' && (
          <Card className="p-6">
            <h2 className="text-lg font-medium text-primary mb-4">Shipper Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Shipper Name" />
              <Input placeholder="Contact Person" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Phone Number" />
              <Input placeholder="Email" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Address Line 1" />
              <Input placeholder="Address Line 2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input placeholder="City" />
              <Input placeholder="State/Province" />
              <Input placeholder="Postal Code" />
            </div>
            <div className="mt-4">
              <Input placeholder="Country" />
            </div>
            <div className="mt-4">
              <Textarea placeholder="Special Instructions" />
            </div>
          </Card>
        )}

        {/* Receiver Details Section */}
        {activeAction === 'receiver' && (
          <Card className="p-6">
            <h2 className="text-lg font-medium text-primary mb-4">Receiver Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Receiver Name" />
              <Input placeholder="Contact Person" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Phone Number" />
              <Input placeholder="Email" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Address Line 1" />
              <Input placeholder="Address Line 2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input placeholder="City" />
              <Input placeholder="State/Province" />
              <Input placeholder="Postal Code" />
            </div>
            <div className="mt-4">
              <Input placeholder="Country" />
            </div>
            <div className="mt-4">
              <Textarea placeholder="Special Instructions" />
            </div>
          </Card>
        )}

        {/* Highway Dispatch Section */}
        {activeAction === 'highway' && (
          <>
          <Card className="p-6">
            <h2 className="text-lg font-medium text-primary mb-4">Highway Dispatch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Driver Name" />
              <Input placeholder="Co-Driver Name" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Truck Number" />
              <Input placeholder="Trailer Number" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Start Location" />
              <Input placeholder="End Location" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input type="datetime-local" placeholder="Estimated Start Time" />
              <Input type="datetime-local" placeholder="Estimated End Time" />
            </div>
            <div className="mt-4">
              <Textarea placeholder="Route Details" />
            </div>
            <div className="mt-4">
              <Textarea placeholder="Special Instructions" />
            </div>
          </Card>

          
          <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-between">
            {['Load Confirmed', 'Dispatched', 'In Transit', 'Delivered', 'Payment Received'].map((stage, index) => (
              <div key={stage} className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-200'}`} />
                <span className="mt-2 text-xs text-muted-foreground">{stage}</span>
              </div>
            ))}
          </div>
        </div>
        </>
        )}

        
        {/* Dispatch Details */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-primary mb-4">Dispatch Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Truck" />
            <Input placeholder="Trailer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex gap-2">
              <Input placeholder="Driver Name" />
              <Button>Dispatch</Button>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Co-Driver Name" />
              <Button>Dispatch</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input placeholder="Carrier" />
            <div className="flex gap-2">
              <Select defaultValue="C$">
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="C$" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C$">C$</SelectItem>
                  <SelectItem value="US$">US$</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Cost to Carrier" className="flex-1" />
            </div>
          </div>
        </Card>

        {/* Form Navigation */}
        <div className="flex justify-center mt-8">
          <Button className='flex justify-center align-middle'>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

