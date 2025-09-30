import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, User, Phone, DollarSign, Edit, Trash2, X } from "lucide-react"

const OrderDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || 'client'
  
  // Demo order data
  const order = {
    id: id || "001",
    from: "Toshkent",
    to: "Samarqand",
    date: "2025-01-30",
    time: "14:00",
    passengers: 2,
    price: 100000,
    distance: "270 km",
    status: "completed",
    client: {
      name: "Akmal Karimov",
      phone: "+998901234567",
      email: "akmal@example.com",
      rating: 4.8
    },
    driver: {
      name: "Bobur Umarov",
      phone: "+998901234568",
      car: "Chevrolet Lacetti",
      carNumber: "01A123BC",
      rating: 4.9
    },
    createdAt: "2025-01-29 10:30",
    updatedAt: "2025-01-30 15:45",
    paymentMethod: "Balans",
    commission: 5000,
    netAmount: 95000
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-success">Yakunlandi</Badge>
      case "in_progress":
        return <Badge variant="secondary">Jarayonda</Badge>
      case "pending":
        return <Badge variant="outline">Kutilmoqda</Badge>
      case "cancelled":
        return <Badge variant="destructive">Bekor qilingan</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleEdit = () => {
    console.log("Edit order:", id)
  }

  const handleCancel = () => {
    console.log("Cancel order:", id)
  }

  const handleDelete = () => {
    console.log("Delete order:", id)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Orqaga
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Buyurtma #{order.id}</h1>
          <p className="text-muted-foreground">To'liq ma'lumotlar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Information */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {order.from} → {order.to}
                  </CardTitle>
                  <CardDescription>{order.distance} • {order.date} {order.time}</CardDescription>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-medium">{order.time}</p>
                  <p className="text-xs text-muted-foreground">Vaqt</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <User className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-medium">{order.passengers}</p>
                  <p className="text-xs text-muted-foreground">Yo'lovchi</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-medium">{order.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Narx (so'm)</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-medium">{order.distance}</p>
                  <p className="text-xs text-muted-foreground">Masofa</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle>Mijoz ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ism:</span>
                <span className="font-medium">{order.client.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Telefon:</span>
                <span className="font-medium">{order.client.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{order.client.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Reyting:</span>
                <span className="font-medium">⭐ {order.client.rating}</span>
              </div>
            </CardContent>
          </Card>

          {/* Driver Information */}
          {order.driver && (
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Haydovchi ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ism:</span>
                  <span className="font-medium">{order.driver.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Telefon:</span>
                  <span className="font-medium">{order.driver.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mashina:</span>
                  <span className="font-medium">{order.driver.car}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Raqam:</span>
                  <span className="font-medium">{order.driver.carNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reyting:</span>
                  <span className="font-medium">⭐ {order.driver.rating}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Actions & Payment */}
        <div className="space-y-6">
          {/* Actions */}
          {userRole === 'admin' && (
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Amallar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleEdit} variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Tahrirlash
                </Button>
                <Button onClick={handleCancel} variant="outline" className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Bekor qilish
                </Button>
                <Button onClick={handleDelete} variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  O'chirish
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Payment Details */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle>To'lov ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Buyurtma narxi:</span>
                <span className="font-medium">{order.price.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Komissiya:</span>
                <span className="font-medium">-{order.commission.toLocaleString()} so'm</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Sof summa:</span>
                  <span className="text-primary">{order.netAmount.toLocaleString()} so'm</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">To'lov usuli:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle>Buyurtma tarixi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Yaratilgan:</span>
                <span className="font-medium text-sm">{order.createdAt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Yangilangan:</span>
                <span className="font-medium text-sm">{order.updatedAt}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage