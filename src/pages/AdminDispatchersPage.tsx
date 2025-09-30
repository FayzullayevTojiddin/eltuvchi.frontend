
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, UserCheck, Phone, Mail } from "lucide-react"

const AdminDispatchersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const dispatchers = [
    {
      id: "1",
      name: "Aziza Karimova",
      phone: "+998 90 234 56 78",
      email: "aziza@example.com",
      status: "online",
      shift: "Kunduzi",
      region: "Chilonzor",
      activeOrders: 5,
      totalOrders: 120,
      avatar: "/placeholder.svg"
    },
    // Add more mock dispatchers...
  ]

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dispatcherlar</h1>
          <p className="text-muted-foreground">Dispatcher xodimlarini boshqarish</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Yangi dispatcher
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Dispatcher qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dispatchers List */}
      <div className="grid gap-4">
        {dispatchers.map((dispatcher) => (
          <Card key={dispatcher.id} className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={dispatcher.avatar} />
                      <AvatarFallback>
                        {dispatcher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                      dispatcher.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{dispatcher.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {dispatcher.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {dispatcher.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-4 w-4" />
                        {dispatcher.shift} | {dispatcher.region}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Faol buyurtmalar</p>
                    <p className="font-semibold text-lg">{dispatcher.activeOrders}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
                    <p className="font-semibold">{dispatcher.totalOrders}</p>
                  </div>
                  <Badge variant={dispatcher.status === 'online' ? 'default' : 'secondary'}>
                    {dispatcher.status === 'online' ? 'Onlayn' : 'Offline'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Batafsil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminDispatchersPage
