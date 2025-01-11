import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Phone, Mail, Truck, FileText, BarChart, Users } from 'lucide-react'

export default function DashboardPage() {
  const user = {
    name: "John Doe",
    role: "Dispatcher",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    avatar: "https://imgs.search.brave.com/p9vSMC5bBzo7PK9QrYV37MgK8pvcHFpf46vjXvbr9HU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdmF0/b29uLm1lL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzA5L0Nh/cnRvb24tUGljLUlk/ZWFzLWZvci1EUC1Q/cm9maWxlMTEucG5n",
    joinDate: "January 2023",
    dispatchedTrips: 152,
    completedReports: 48
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20 border-2 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h2>
                <p className="text-muted-foreground">{user.role}</p>
                <Badge variant="secondary" className="mt-2">{user.location}</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-gray-600 dark:text-gray-300">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-gray-600 dark:text-gray-300">{user.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
                <span className="text-gray-600 dark:text-gray-300">Joined {user.joinDate}</span>
              </div>
            </div>
            <Button className="w-full mt-6">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Activity Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Activity Overview</CardTitle>
            <CardDescription>Your dispatch activity summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">Dispatched Trips</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{user.dispatchedTrips}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">Completed Reports</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{user.completedReports}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Truck className="w-4 h-4 mr-2" />
              Create New Trip
            </Button>
            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
              <BarChart className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-1 md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: Truck, color: 'blue', text: 'New trip dispatched to Los Angeles', time: '2 hours ago' },
                { icon: FileText, color: 'green', text: 'Monthly report generated', time: '1 day ago' },
                { icon: Users, color: 'purple', text: 'New customer account created', time: '3 days ago' },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 bg-${item.color}-100 rounded-full`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

