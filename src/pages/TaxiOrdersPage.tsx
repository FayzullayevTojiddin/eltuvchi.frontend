import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/hooks/use-toast"
import {MapPin, Clock, User, Phone, Check, X, Eye, Filter, Play, Square, Ban} from "lucide-react"
import React, {useEffect, useState} from "react"
import {ConfirmActionDialog} from "@/components/ConfirmActionDialog"
import toast from "react-hot-toast"
import api from "@/lib/api.ts"
import {formatCurrency} from "@/utils/numberFormat.ts"
import {useNavigate} from "react-router-dom"

const TaxiOrdersPage = () => {
  const [myOrderStatusFilter, setMyOrderStatusFilter] = useState("all")
  const [orderData, setOrderData] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])
  const navigate = useNavigate()

  const fetchOrders = () => {
    let queryParam = ''
    if (myOrderStatusFilter !== 'all' && myOrderStatusFilter === 'created') {
      queryParam = '?status=created'
    } else if (myOrderStatusFilter !== 'all' && myOrderStatusFilter === 'accepted') {
      queryParam = '?status=accepted'
    } else if (myOrderStatusFilter !== 'all' && myOrderStatusFilter === 'started') {
      queryParam = '?status=started'
    } else if (myOrderStatusFilter !== 'all' && myOrderStatusFilter === 'stopped') {
      queryParam = '?status=stopped'
    } else if (myOrderStatusFilter !== 'all' && myOrderStatusFilter === 'completed') {
      queryParam = '?status=completed'
    } else if (myOrderStatusFilter !== 'all' && myOrderStatusFilter === 'cancelled') {
      queryParam = '?status=cancelled'
    }

    api.get(`/driver/my_orders${queryParam}`)
      .then((res) => {
        setCompletedOrders(res.data)
        console.log("my orders:", res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      })

    api.get('/driver/orders')
      .then((res) => {
        setOrderData(res.data)
        console.log("📦 Orders:", res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      })
  }

  useEffect(() => {
    fetchOrders()

    const interval = setInterval(() => {
      fetchOrders()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [myOrderStatusFilter])

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    orderId: "",
    title: "",
    description: "",
    actionText: ""
  })

  const [orders, setOrders] = useState({
    available: [
      {
        id: "001",
        from: "Toshkent",
        to: "Samarqand",
        date: "2025-01-30",
        time: "14:00",
        passengers: 2,
        price: 100000,
        distance: "270 km",
        client: {
          name: "Akmal Karimov",
          phone: "+998901234567",
          rating: 4.8
        }
      },
      {
        id: "002",
        from: "Andijon",
        to: "Toshkent",
        date: "2025-01-30",
        time: "16:30",
        passengers: 1,
        price: 120000,
        distance: "320 km",
        client: {
          name: "Dilshod Rahimov",
          phone: "+998901234568",
          rating: 4.9
        }
      }
    ],
    myOrders: [
      {
        id: "003",
        from: "Buxoro",
        to: "Toshkent",
        date: "2025-01-25",
        time: "09:00",
        passengers: 1,
        price: 80000,
        status: "completed",
        client: {
          name: "Sarvar Nazarov",
          phone: "+998901234569",
          rating: 4.7
        }
      },
      {
        id: "004",
        from: "Toshkent",
        to: "Farg'ona",
        date: "2025-01-28",
        time: "10:30",
        passengers: 3,
        price: 150000,
        status: "accepted",
        client: {
          name: "Oybek Toshmatov",
          phone: "+998901234570",
          rating: 4.6
        }
      },
      {
        id: "006",
        from: "Toshkent",
        to: "Namangan",
        date: "2025-01-30",
        time: "08:00",
        passengers: 2,
        price: 110000,
        status: "in_progress",
        client: {
          name: "Madina Karimova",
          phone: "+998901234571",
          rating: 4.9
        }
      }
    ]
  })

  const openConfirmDialog = (type: string, orderId: string) => {
    let title = ""
    let description = ""
    let actionText = ""

    switch (type) {
      case "accept":
        title = "Buyurtmani qabul qilish"
        description = "Bu buyurtmani qabul qilishni tasdiqlaysizmi? 5000 so'm to'lov olinadi."
        actionText = "Qabul qilish"
        break
      case "start":
        title = "Safarni boshlash"
        description = "Safarni boshlaganingizni tasdiqlaysizmi?"
        actionText = "Boshlash"
        break
      case "complete":
        title = "Safarni tugatish"
        description = "Safarni tugaganingizni tasdiqlaysizmi? Mijoz tasdiqini kutishingiz kerak."
        actionText = "Tugatish"
        break
      case "cancel":
        title = "Buyurtmani bekor qilish"
        description = "Ushbu buyurtmani bekor qilishni tasdiqlaysizmi?"
        actionText = "Buyurtmani bekor qilish"
        break
    }

    setConfirmDialog({
      open: true,
      type,
      orderId,
      title,
      description,
      actionText
    })
  }

  const handleConfirmAction = () => {
    const {type, orderId} = confirmDialog

    switch (type) {
      case "accept":
        handleAcceptOrder(orderId)
        break
      case "start":
        handleStartOrder(orderId)
        break
      case "complete":
        handleCompleteOrder(orderId)
        break
      case "cancel":
        handleCancelOrder(orderId)
        break
    }

    setConfirmDialog({...confirmDialog, open: false})
  }

  const handleAcceptOrder = (orderId: string) => {
    try {
      api.post(`/driver/orders/${orderId}`, {orderId}).then((res) => {
        console.log(res.data)
        fetchOrders()
      }).catch(err => {
        console.log(err?.response)
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        } else {
          toast.error("Xatolik yuz berdi!")
        }
      })
    } catch (e) {
      console.log(e)
      toast.error("Xatolik yuz berdi!")
    }
  }

  const handleCancelOrder = (orderId: string) => {
    try {
      api.delete(`/driver/orders/${orderId}`).then((res) => {
        console.log(res.data)
        toast.success("Buyurtma bekor qilindi!")
        fetchOrders()
      }).catch(err => {
        console.log(err?.response?.data?.error)
        if (err?.response?.data?.error) {
          toast.error(err?.response?.data?.error)
        }
      })
    } catch (e) {
      console.log(e)
      toast.error("Xatolik yuz berdi!")
    }
  }

  const handleStartOrder = (orderId: string) => {
    try {
      console.log(orderId)
      api.post(`/driver/orders/${orderId}/start`, {orderId}).then((res) => {
        console.log(res.data)
        toast.success("Buyurtma boshlandi!")
        fetchOrders()
      }).catch(err => {
        console.log(err?.response?.data?.data)
        if (err?.response?.data?.data) {
          toast.error(err?.response?.data?.data)
        } else {
          toast.error("Xatolik yuz berdi!")
        }
      })
    } catch (e) {
      console.log(e)
      toast.error("Xatolik yuz berdi!")
    }
  }

  const handleCompleteOrder = (orderId: string) => {
    try {
      api.post(`/driver/orders/${orderId}/stop`, { orderId }).then((res) => {
        console.log(res.data)
        toast.success("Buyurtma tugadi!")
        fetchOrders()
      }).catch(err => {
        console.log(err)
        toast.error("Xatolik yuz berdi!")
      })
    } catch (e) {
      console.log(e)
      toast.error("Xatolik yuz berdi!")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-blue-500">
            <Check className="w-3 h-3 mr-1"/>
            Qabul qilingan
          </Badge>
        )
      case "started":
        return (
          <Badge className="bg-green-500">
            <Play className="w-3 h-3 mr-1"/>
            Boshlangan
          </Badge>
        )
      case "in_progress":
        return <Badge className="bg-green-500">Jarayonda</Badge>
      case "waiting_confirmation":
        return <Badge className="bg-yellow-500">Tasdiq kutilmoqda</Badge>
      case "completed":
        return <Badge className="bg-gray-500">Yakunlandi</Badge>
      default:
        return <Badge className="bg-gray-400">Noma'lum</Badge>
    }
  }

  const getActionButton = (order) => {
    switch (order.status) {
      case "accepted":
        return (
          <Button onClick={() => openConfirmDialog("start", order.id)} className="flex-1 gap-2">
            <Play className="w-4 h-4"/>
            Boshlash
          </Button>
        )
      case "started":
        return (
          <Button onClick={() => openConfirmDialog("complete", order.id)} className="flex-1 gap-2"
                  variant="default">
            <Square className="w-4 h-4"/>
            Tugatish
          </Button>
        )
      case "waiting_confirmation":
        return (
          <Badge className="bg-yellow-500 flex-1 justify-center py-2">
            Mijoz tasdiqini kutmoqda...
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-gray-500 flex-1 justify-center py-2">
            Yakunlangan
          </Badge>
        )
      default:
        return null
    }
  }

  const getOrderStatus = (status) => {
    switch (status) {
      case "created":
        return (
          'Yangi'
        )
      case "in_progress":
        return (
          "Bajarilmoqda"
        )
      case "waiting_confirmation":
        return (
          <Badge className="bg-yellow-500 flex-1 justify-center py-2">
            Mijoz tasdiqini kutmoqda...
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDateTime = (dateString: string, type: "date" | "time") => {
    if (!dateString) return "-"
    const date = new Date(dateString)

    if (type === "date") {
      return date.toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    }

    if (type === "time") {
      return date.toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar</CardTitle>
          <CardDescription>Mavjud va bajarilgan buyurtmalarni boshqaring</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Mavjud buyurtmalar</TabsTrigger>
              <TabsTrigger value="my-orders">Mening buyurtmalarim</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Mavjud buyurtmalar</h3>
                <p className="text-sm text-muted-foreground">Qabul qilish uchun mavjud buyurtmalar</p>
              </div>

              <div className="space-y-4">
                {orderData.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground">Mavjud buyurtmalar yo'q</p>
                  </div>
                ) : (
                  orderData.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <MapPin className="w-5 h-5"/>
                              {order?.route?.from?.name} → {order?.route?.to?.name}
                            </CardTitle>
                            <CardDescription>Buyurtma #{order.id}</CardDescription>
                          </div>
                          {getOrderStatus(order?.status) || "Yangi"}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground"/>
                            <span>{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground"/>
                            <span>{order.passengers} kishi</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-lg font-bold text-green-600">
                            {new Intl.NumberFormat("uz-UZ").format(parseFloat(order.client_deposit))} so'm
                          </span>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                          <p className="text-sm font-medium text-blue-900">Buyurtma ma'lumotlari:</p>
                          <p className="text-sm text-blue-700">
                            To'lov miqdori: {new Intl.NumberFormat("uz-UZ").format(parseFloat(order.price_order))} so'm
                          </p>
                          {!order.note || (
                            <p className="text-sm text-blue-700">
                              Qo'shimcha: {order.note || ""}
                            </p>
                          )}
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            Mijoz ma'lumotlari qabul qilganingizdan keyin ko'rinadi
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button onClick={() => openConfirmDialog("accept", order.id)} className="flex-1">
                            <Check className="w-4 h-4 mr-2"/>
                            Qabul qilish
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="my-orders" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Mening buyurtmalarim</h3>
                <p className="text-sm text-muted-foreground">Bajarilgan va jarayondagi buyurtmalar</p>
              </div>

              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all" onClick={() => setMyOrderStatusFilter("all")}>Hammasi</TabsTrigger>
                <TabsTrigger value="created" onClick={() => setMyOrderStatusFilter("created")}>Yaratilgan</TabsTrigger>
                <TabsTrigger value="completed" onClick={() => setMyOrderStatusFilter("completed")}>Yakunlangan</TabsTrigger>
                <TabsTrigger value="accepted" onClick={() => setMyOrderStatusFilter("accepted")}>Qabul qilingan</TabsTrigger>
                <TabsTrigger value="cancelled" onClick={() => setMyOrderStatusFilter("cancelled")}>Bekor qilingan</TabsTrigger>
                <TabsTrigger value="stopped" onClick={() => setMyOrderStatusFilter("stopped")}>Tugallangan</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {completedOrders.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground">Mavjud buyurtmalar yo'q</p>
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <MapPin className="w-5 h-5"/>
                              {order.route.from.name || "Topilmadi"} → {order.route.to.name || "Topilmadi"}
                            </CardTitle>
                            <CardDescription>Buyurtma #{order.id || "0"}</CardDescription>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground"/>
                            <span>{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground"/>
                            <span>{order.passengers} kishi</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(order?.client_deposit)} so'm
                          </span>
                        </div>

                        {order.client && (
                          <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                            <p className="text-sm font-medium text-blue-900">Mijoz ma'lumotlari:</p>
                            {order.client.rating && (
                              <p className="text-sm text-blue-700">
                                Mijoz reytingi: ⭐ {order.client.rating}
                              </p>
                            )}
                            {order.client.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-600"/>
                                <a href={`tel:${order.client.phone}`} className="text-sm text-blue-600 hover:underline">
                                  {order.client.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        )}

                        {order.status !== "completed" && (
                          <div className="flex gap-2 pt-2">
                            {getActionButton(order)}
                            {order?.client ? (
                              <Button
                                onClick={() => openConfirmDialog("cancel", order.id)}
                                variant="destructive"
                                className="flex-1"
                              >
                                <Ban className="w-4 h-4 mr-2"/>
                                Bekor qilish
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => navigate(`/orders/${order.id}`)}
                              >
                                <Eye className="w-4 h-4 mr-2"/>
                                Ko'rish
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ConfirmActionDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({...confirmDialog, open})}
        title={confirmDialog.title}
        description={confirmDialog.description}
        actionText={confirmDialog.actionText}
        onConfirm={handleConfirmAction}
      />
    </div>
  )
}

export default TaxiOrdersPage