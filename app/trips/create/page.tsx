'use client'

import { useState } from 'react'
import { ChevronDown, Truck, Box, Navigation2, Check } from 'lucide-react'
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
const FORM_SEQUENCE = ['shipper', 'receiver', 'highway'] as const;

type FormData = {
  [key: string]: {
    [field: string]: string | undefined; 
  };
};


export default function CreateTrip() {
  const [currency, setCurrency] = useState('C$')
  const [activeAction, setActiveAction] = useState<ActionType>("shipper")
  const [completedSections, setCompletedSections] = useState<ActionType[]>([])

  const [formData, setFormData] = useState<FormData>({
    shipper: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
      specialInstructions: ''
    },
    receiver: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
      specialInstructions: ''
    },
    highway: {
      truck: '',
      trailer: '',
      driverName: '',
      coDriverName: '',
      carrier: '',
      costToCarrier: ''
    }
  });

  const currentFormIndex = FORM_SEQUENCE.indexOf(activeAction as typeof FORM_SEQUENCE[number]);

  const handleNext = () => {
    if (currentFormIndex < FORM_SEQUENCE.length - 1) {
      if (!completedSections.includes(activeAction)) {
        setCompletedSections([...completedSections, activeAction]);
      }
      setActiveAction(FORM_SEQUENCE[currentFormIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentFormIndex > 0) {
      setActiveAction(FORM_SEQUENCE[currentFormIndex - 1]);
    }
  };

  // Function to check if current form is filled (basic validation)
  const isCurrentFormValid = () => {
    if (!activeAction) return false;
    
    const requiredFields = {
      shipper: ['name', 'phone', 'addressLine1', 'city', 'country'],
      receiver: ['name', 'phone', 'addressLine1', 'city', 'country'],
      highway: ['truck', 'trailer', 'driverName', 'carrier']
    };
  
    const currentFormData = formData[activeAction];

return requiredFields[activeAction].every((field) => {
  const fieldValue = currentFormData[field as keyof typeof currentFormData];

  // Type guard to check if the field is a string before calling trim
  if (typeof fieldValue === 'string') {
    return fieldValue.trim() !== '';
  }

  return false; // If the field is not a string, it's considered invalid
});

  };

  const toggleAction = (action: ActionType) => {
    setActiveAction(action)
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const FormNavigation = () => (
    <div className="flex justify-center gap-4 mt-8">
      <Button 
        variant="outline"
        onClick={handlePrev}
        disabled={currentFormIndex === 0}
      >
        Previous
      </Button>
      <Button 
        onClick={handleNext}
        disabled={currentFormIndex === FORM_SEQUENCE.length - 1 || !isCurrentFormValid()}
      >
        {currentFormIndex === FORM_SEQUENCE.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </div>
  );

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
          {FORM_SEQUENCE.map((action) => (
            <Button 
              key={action}
              variant={activeAction === action ? 'default' : 'outline'}
              className="gap-2 relative"
              onClick={() => toggleAction(action)}
            >
              {action === 'shipper' && <Box className="h-4 w-4" />}
              {action === 'receiver' && <Navigation2 className="h-4 w-4" />}
              {action === 'highway' && <Truck className="h-4 w-4" />}
              {action.charAt(0).toUpperCase() + action.slice(1)} Details
              {completedSections.includes(action) && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </Button>
          ))}
        </div>

        {/* Shipper Details Section */}
        {activeAction === 'shipper' && (
          <Card className="p-6">
          <h2 className="text-lg font-medium text-primary mb-4">Shipper Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              placeholder="Shipper Name"
              value={formData.shipper.name}
              onChange={(e) => handleInputChange('shipper', 'name', e.target.value)}
            />
            <Input 
              placeholder="Contact Person"
              value={formData.shipper.contactPerson}
              onChange={(e) => handleInputChange('shipper', 'contactPerson', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input 
              placeholder="Phone Number"
              value={formData.shipper.phone}
              onChange={(e) => handleInputChange('shipper', 'phone', e.target.value)}
            />
            <Input 
              placeholder="Email"
              value={formData.shipper.email}
              onChange={(e) => handleInputChange('shipper', 'email', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input 
              placeholder="Address Line 1"
              value={formData.shipper.addressLine1}
              onChange={(e) => handleInputChange('shipper', 'addressLine1', e.target.value)}
            />
            <Input 
              placeholder="Address Line 2"
              value={formData.shipper.addressLine2}
              onChange={(e) => handleInputChange('shipper', 'addressLine2', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input 
              placeholder="City"
              value={formData.shipper.city}
              onChange={(e) => handleInputChange('shipper', 'city', e.target.value)}
            />
            <Input 
              placeholder="State/Province"
              value={formData.shipper.stateProvince}
              onChange={(e) => handleInputChange('shipper', 'stateProvince', e.target.value)}
            />
            <Input 
              placeholder="Postal Code"
              value={formData.shipper.postalCode}
              onChange={(e) => handleInputChange('shipper', 'postalCode', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Input 
              placeholder="Country"
              value={formData.shipper.country}
              onChange={(e) => handleInputChange('shipper', 'country', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Textarea 
              placeholder="Special Instructions"
              value={formData.shipper.specialInstructions}
              onChange={(e) => handleInputChange('shipper', 'specialInstructions', e.target.value)}
            />
          </div>
          <FormNavigation />
        </Card>
        )}

        {/* Receiver Details Section */}
        {activeAction === 'receiver' && (
          <Card className="p-6">
          <h2 className="text-lg font-medium text-primary mb-4">Receiver Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              placeholder="Receiver Name"
              value={formData.receiver.name}
              onChange={(e) => handleInputChange('receiver', 'name', e.target.value)}
            />
            <Input 
              placeholder="Contact Person"
              value={formData.receiver.contactPerson}
              onChange={(e) => handleInputChange('receiver', 'contactPerson', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input 
              placeholder="Phone Number"
              value={formData.receiver.phone}
              onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)}
            />
            <Input 
              placeholder="Email"
              value={formData.receiver.email}
              onChange={(e) => handleInputChange('receiver', 'email', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input 
              placeholder="Address Line 1"
              value={formData.receiver.addressLine1}
              onChange={(e) => handleInputChange('receiver', 'addressLine1', e.target.value)}
            />
            <Input 
              placeholder="Address Line 2"
              value={formData.receiver.addressLine2}
              onChange={(e) => handleInputChange('receiver', 'addressLine2', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input 
              placeholder="City"
              value={formData.receiver.city}
              onChange={(e) => handleInputChange('receiver', 'city', e.target.value)}
            />
            <Input 
              placeholder="State/Province"
              value={formData.receiver.stateProvince}
              onChange={(e) => handleInputChange('receiver', 'stateProvince', e.target.value)}
            />
            <Input 
              placeholder="Postal Code"
              value={formData.receiver.postalCode}
              onChange={(e) => handleInputChange('receiver', 'postalCode', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Input 
              placeholder="Country"
              value={formData.receiver.country}
              onChange={(e) => handleInputChange('receiver', 'country', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Textarea 
              placeholder="Special Instructions"
              value={formData.receiver.specialInstructions}
              onChange={(e) => handleInputChange('receiver', 'specialInstructions', e.target.value)}
            />
          </div>
          <FormNavigation />
        </Card>
        )}

        {/* Highway Dispatch Section */}
        {activeAction === 'highway' && (
          <>
    
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

          <Card className="p-6">
            <h2 className="text-lg font-medium text-primary mb-4">Dispatch Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Truck"
                value={formData.highway.truck}
                onChange={(e) => handleInputChange('highway', 'truck', e.target.value)}
              />
              <Input 
                placeholder="Trailer"
                value={formData.highway.trailer}
                onChange={(e) => handleInputChange('highway', 'trailer', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Driver Name"
                  value={formData.highway.driverName}
                  onChange={(e) => handleInputChange('highway', 'driverName', e.target.value)}
                />
                <Button>Dispatch</Button>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Co-Driver Name"
                  value={formData.highway.coDriverName}
                  onChange={(e) => handleInputChange('highway', 'coDriverName', e.target.value)}
                />
                <Button>Dispatch</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input 
                placeholder="Carrier"
                value={formData.highway.carrier}
                onChange={(e) => handleInputChange('highway', 'carrier', e.target.value)}
              />
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
                <Input 
                  placeholder="Cost to Carrier" 
                  className="flex-1"
                  value={formData.highway.costToCarrier}
                  onChange={(e) => handleInputChange('highway', 'costToCarrier', e.target.value)}
                />
              </div>
            </div>
            <FormNavigation />
          </Card>

        </>
        )}

      </div>
    </div>
  )
}

