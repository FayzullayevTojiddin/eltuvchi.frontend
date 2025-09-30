
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Clock, DollarSign } from "lucide-react"

const AdminOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const orders = [
    {
      id: "ORD-001",
      customerName: "Sardor Abdullayev",
      driverName: "Bobur Karimov",
      from: "Chilonzor tumani",
      to: "Yashnobod tumani",
      status: "completed",
      amount: 15000,
      distance: "12 km",
      duration: "25 min",
      createdAt: "2024-01-20 14:30"
    },
    // Add more mock orders...
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in_progress': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Yakunlangan'
      case 'in_progress': return 'Jarayonda'
      case 'cancelled': return 'Bekor qilingan'
      default: return 'Noma\'lum'
    }
  }

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Buyurtmalar</h1>
          <p className="text-muted-foreground">Barcha buyurtmalarni ko'rish va boshqarish</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buyurtma qidirish..."
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

      {/* Orders List */}
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Dan:</strong> {order.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Ga:</strong> {order.to}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mijoz</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Haydovchi</p>
                      <p className="font-medium">{order.driverName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Masofa</p>
                      <p className="font-medium">{order.distance}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vaqt</p>
                      <p className="font-medium">{order.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end gap-2">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold">
                      <DollarSign className="h-5 w-5" />
                      {order.amount.toLocaleString()} so'm
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(order.createdAt).toLocaleString('uz-UZ')}
                    </div>
                  </div>
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

export default AdminOrdersPage
