import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useToast} from "@/hooks/use-toast"
import {MapPin, Clock, User, Phone, Check, X, Eye, Filter, Play, Square, Ban, DollarSign, AlertCircle} from "lucide-react"
import React, {useEffect, useState} from "react"
import {ConfirmActionDialog} from "@/components/ConfirmActionDialog"
import toast from "react-hot-toast"
import api from "@/lib/api.ts"
import {formatCurrency} from "@/utils/numberFormat.ts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"

const TaxiOrdersPage = () => {
  const [myOrderStatusFilter, setMyOrderStatusFilter] = useState("all")
  const [orderData, setOrderData] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])
  const [loading, setLoading] = useState(false)

  // Buyurtma narxini ko'rsatish uchun dialog
  const [priceDialog, setPriceDialog] = useState({
    open: false,
    order: null
  })

  const fetchOrders = () => {
    let queryParam = ''
    if (myOrderStatusFilter !== 'all') {
      queryParam = `?status=${myOrderStatusFilter}`
    }

    // Mening buyurtmalarimni olish
    api.get(`/driver/my_orders${queryParam}`)
      .then((res) => {
        setCompletedOrders(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      })

    // Mavjud buyurtmalarni olish
    api.get('/driver/orders')
      .then((res) => {
        setOrderData(res.data)
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

  const openConfirmDialog = (type: string, orderId: string) => {
    let title = ""
    let description = ""
    let actionText = ""

    switch (type) {
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

  // Buyurtma narxini ko'rish
  const showPriceDetails = (order) => {
    setPriceDialog({
      open: true,
      order: order
    })
  }

  // Buyurtmani qabul qilish (10% to'lov bilan)
  const handleAcceptOrder = (orderId: string) => {
    setLoading(true)
    setPriceDialog({...priceDialog, open: false})
    
    api.post(`/driver/orders/${orderId}`, {orderId})
      .then((res) => {
        toast.success("Buyurtma muvaffaqiyatli qabul qilindi!")
        fetchOrders()
      })
      .catch(err => {
        console.log(err?.response)
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        } else {
          toast.error("Xatolik yuz berdi!")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancelOrder = (orderId: string) => {
    setLoading(true)
    
    api.delete(`/driver/orders/${orderId}`)
      .then((res) => {
        toast.success("Buyurtma bekor qilindi!")
        fetchOrders()
      })
      .catch(err => {
        console.log(err?.response?.data?.error)
        if (err?.response?.data?.error) {
          toast.error(err?.response?.data?.error)
        } else {
          toast.error("Xatolik yuz berdi!")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleStartOrder = (orderId: string) => {
    setLoading(true)
    
    api.post(`/driver/orders/${orderId}/start`, {orderId})
      .then((res) => {
        toast.success("Buyurtma boshlandi!")
        fetchOrders()
      })
      .catch(err => {
        console.log(err?.response?.data?.data)
        if (err?.response?.data?.data) {
          toast.error(err?.response?.data?.data)
        } else {
          toast.error("Xatolik yuz berdi!")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCompleteOrder = (orderId: string) => {
    setLoading(true)
    
    api.post(`/driver/orders/${orderId}/stop`, { orderId })
      .then((res) => {
        toast.success("Buyurtma tugadi!")
        fetchOrders()
      })
      .catch(err => {
        console.log(err)
        toast.error("Xatolik yuz berdi!")
      })
      .finally(() => {
        setLoading(false)
      })
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
      case "cancelled":
        return <Badge className="bg-red-500">Bekor qilingan</Badge>
      default:
        return <Badge className="bg-gray-400">Noma'lum</Badge>
    }
  }

  const getActionButton = (order) => {
    switch (order.status) {
      case "accepted":
        return (
          <Button onClick={() => openConfirmDialog("start", order.id)} className="flex-1 gap-2" disabled={loading}>
            <Play className="w-4 h-4"/>
            Boshlash
          </Button>
        )
      case "started":
        return (
          <Button onClick={() => openConfirmDialog("complete", order.id)} className="flex-1 gap-2"
                  variant="default" disabled={loading}>
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

  // 10% hisobini chiqarish
  const calculateCommission = (price) => {
    return parseFloat(price) * 0.1
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
                              {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                            </CardTitle>
                            <CardDescription>Buyurtma #{order.id}</CardDescription>
                          </div>
                          <Badge className="bg-green-500">Yangi</Badge>
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

                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-300">Buyurtma narxi:</span>
                            <span className="text-2xl font-bold text-emerald-400">
                              {formatCurrency(order.price_order)} so'm
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                            <span className="text-sm text-slate-400">Sizning komissiyangiz (10%):</span>
                            <span className="text-lg font-semibold text-orange-400">
                              {formatCurrency(calculateCommission(order.price_order))} so'm
                            </span>
                          </div>
                        </div>

                        {order.note && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Qo'shimcha ma'lumot:</p>
                            <p className="text-sm text-blue-700">{order.note}</p>
                          </div>
                        )}

                        <div className="bg-amber-900/30 border border-amber-800/50 p-3 rounded-lg flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-amber-200">
                            Mijoz ma'lumotlari buyurtmani qabul qilganingizdan keyin ko'rinadi
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={() => showPriceDetails(order)} 
                            className="flex-1"
                            disabled={loading}
                          >
                            <DollarSign className="w-4 h-4 mr-2"/>
                            Narxni ko'rish va qabul qilish
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
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={myOrderStatusFilter} onValueChange={setMyOrderStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Status tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hammasi</SelectItem>
                      <SelectItem value="created">Yaratilgan</SelectItem>
                      <SelectItem value="accepted">Qabul qilingan</SelectItem>
                      <SelectItem value="started">Boshlangan</SelectItem>
                      <SelectItem value="stopped">Tugallangan</SelectItem>
                      <SelectItem value="completed">Yakunlangan</SelectItem>
                      <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
                              {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
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
                          <span className="text-sm text-muted-foreground">Buyurtma narxi:</span>
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(order?.price_order)} so'm
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

                        {order.status !== "completed" && order.status !== "cancelled" && (
                          <div className="flex gap-2 pt-2">
                            {getActionButton(order)}
                            <Button
                              onClick={() => openConfirmDialog("cancel", order.id)}
                              variant="destructive"
                              className="flex-1"
                              disabled={loading}
                            >
                              <Ban className="w-4 h-4 mr-2"/>
                              Bekor qilish
                            </Button>
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

      {/* Narx ko'rsatish va qabul qilish Dialog */}
      <Dialog open={priceDialog.open} onOpenChange={(open) => setPriceDialog({...priceDialog, open})}>
        <DialogContent className="sm:max-w-md bg-[#0f172a] border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Buyurtma tafsilotlari</DialogTitle>
            <DialogDescription className="text-slate-400">
              Buyurtmani qabul qilish uchun to'lov ma'lumotlarini ko'rib chiqing
            </DialogDescription>
          </DialogHeader>
          
          {priceDialog.order && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-slate-400"/>
                  <p className="font-medium text-white">
                    {priceDialog.order?.route?.from?.name || "Topilmadi"} → {priceDialog.order?.route?.to?.name || "Topilmadi"}
                  </p>
                </div>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>📅 {formatDateTime(priceDialog.order.date, "date")} • {formatDateTime(priceDialog.order.time, "time")}</p>
                  <p>👥 {priceDialog.order.passengers} yo'lovchi</p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="text-sm font-medium text-slate-400">Buyurtma narxi:</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(priceDialog.order.price_order)} so'm
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">To'lov summasi (10%):</span>
                  <span className="text-xl font-bold text-orange-400">
                    {formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm
                  </span>
                </div>
              </div>

              <div className="bg-amber-900/30 border border-amber-800/50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"/>
                  <div className="text-sm text-amber-200">
                    <p className="font-medium mb-1">Muhim:</p>
                    <p>Buyurtmani qabul qilish uchun hisobingizdan <strong>{formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm</strong> yechib olinadi. Buyurtmani bekor qilsangiz, pul qaytarilmaydi.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setPriceDialog({...priceDialog, open: false})}
              disabled={loading}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Yopish
            </Button>
            <Button 
              onClick={() => handleAcceptOrder(priceDialog.order?.id)}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
            >
              <Check className="w-4 h-4 mr-2"/>
              {loading ? "Kutilmoqda..." : "Qabul qilish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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