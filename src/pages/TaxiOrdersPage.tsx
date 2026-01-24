import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {MapPin, Clock, User, Phone, Check, Play, Square, Ban, DollarSign, AlertCircle, History} from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const TaxiOrdersPage = () => {
  const [myOrderStatusFilter, setMyOrderStatusFilter] = useState("all")
  const [orderData, setOrderData] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedHistories, setExpandedHistories] = useState({})

  const [priceDialog, setPriceDialog] = useState({
    open: false,
    order: null
  })

  const fetchOrders = () => {
    let queryParam = ''
    if (myOrderStatusFilter !== 'all') {
      queryParam = `?status=${myOrderStatusFilter}`
    }

    // Mening buyurtmalarim
    api.get(`/driver/my_orders${queryParam}`)
      .then((res) => {
        // API javobini tekshirish
        let orders = []
        
        if (Array.isArray(res.data)) {
          orders = res.data
        } else if (res.data && Array.isArray(res.data.data)) {
          orders = res.data.data
        } else if (res.data && res.data.data && Array.isArray(res.data.data.data)) {
          orders = res.data.data.data
        }
        
        setCompletedOrders(orders)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      })

    // Mavjud buyurtmalar
    api.get('/driver/orders')
      .then((res) => {
        // API javobini tekshirish
        let orders = []
        
        if (Array.isArray(res.data)) {
          orders = res.data
        } else if (res.data && Array.isArray(res.data.data)) {
          orders = res.data.data
        } else if (res.data && res.data.data && Array.isArray(res.data.data.data)) {
          orders = res.data.data.data
        }
        
        setOrderData(orders)
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

  const openConfirmDialog = (type, orderId) => {
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

  const showPriceDetails = (order) => {
    setPriceDialog({
      open: true,
      order: order
    })
  }

  const handleAcceptOrder = (orderId) => {
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

  const handleCancelOrder = (orderId) => {
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

  const handleStartOrder = (orderId) => {
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

  const handleCompleteOrder = (orderId) => {
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "created":
        return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30">Yaratilgan</Badge>
      case "accepted":
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30">
            <Check className="w-3 h-3 mr-1"/>
            Qabul qilingan
          </Badge>
        )
      case "started":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30">
            <Play className="w-3 h-3 mr-1"/>
            Boshlangan
          </Badge>
        )
      case "stopped":
        return <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 hover:bg-orange-500/30">To'xtatilgan</Badge>
      case "waiting_confirmation":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30">Tasdiq kutilmoqda</Badge>
      case "completed":
        return <Badge className="bg-slate-500/20 text-slate-400 border border-slate-500/50 hover:bg-slate-500/30">Yakunlandi</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30">Bekor qilingan</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/50">Noma'lum</Badge>
    }
  }

  const getActionButton = (order) => {
    switch (order.status) {
      case "accepted":
        return (
          <Button onClick={() => openConfirmDialog("start", order.id)} className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700" disabled={loading}>
            <Play className="w-4 h-4"/>
            Boshlash
          </Button>
        )
      case "started":
        return (
          <Button onClick={() => openConfirmDialog("complete", order.id)} className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700" disabled={loading}>
            <Square className="w-4 h-4"/>
            Tugatish
          </Button>
        )
      case "stopped":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 flex-1 justify-center py-2">
            Mijoz tasdiqini kutmoqda...
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border border-slate-500/50 flex-1 justify-center py-2">
            Yakunlangan
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDateTime = (dateString, type) => {
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

  const calculateCommission = (price) => {
    return parseFloat(price) * 0.1
  }

  const toggleHistory = (orderId) => {
    setExpandedHistories(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="container mx-auto space-y-6">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-2xl text-white">Buyurtmalar</CardTitle>
            <CardDescription className="text-slate-400">Mavjud va bajarilgan buyurtmalarni boshqaring</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid w-full grid-cols-1 gap-2 bg-transparent border-0 h-auto">
                <TabsTrigger 
                  value="available" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 bg-slate-800/50 border border-slate-700 py-3"
                >
                  Mavjud buyurtmalar ({orderData.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="my-orders" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 bg-slate-800/50 border border-slate-700 py-3"
                >
                  Mening buyurtmalarim ({completedOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Mavjud buyurtmalar</h3>
                  <p className="text-sm text-slate-400">Qabul qilish uchun mavjud buyurtmalar</p>
                </div>

                <div className="space-y-4">
                  {orderData.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <p className="text-slate-400 text-lg">Mavjud buyurtmalar yo'q</p>
                    </div>
                  ) : (
                    orderData.map((order) => (
                      <Card key={order.id} className="hover:shadow-xl transition-all border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                        <CardHeader className="pb-3 border-b border-slate-700">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2 text-white">
                                <MapPin className="w-5 h-5 text-green-400"/>
                                {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                              </CardTitle>
                              <CardDescription className="text-slate-400">Buyurtma #{order.id}</CardDescription>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">Yangi</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Clock className="w-4 h-4 text-slate-400"/>
                              <span>{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <User className="w-4 h-4 text-slate-400"/>
                              <span>{order.passengers} kishi</span>
                            </div>
                          </div>

                          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-200">Buyurtma narxi:</span>
                              <span className="text-2xl font-bold text-green-400">
                                {formatCurrency(order.price_order)} so'm
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-600">
                              <span className="text-sm text-slate-300">Sizning komissiyangiz (10%):</span>
                              <span className="text-lg font-semibold text-orange-400">
                                {formatCurrency(calculateCommission(order.price_order))} so'm
                              </span>
                            </div>
                          </div>

                          {order.note && (
                            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                              <p className="text-sm font-medium text-blue-400">Qo'shimcha ma'lumot:</p>
                              <p className="text-sm text-blue-300">{order.note}</p>
                            </div>
                          )}

                          <div className="bg-amber-900/40 border border-amber-700/50 p-3 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-amber-100">
                              Mijoz ma'lumotlari buyurtmani qabul qilganingizdan keyin ko'rinadi
                            </p>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => showPriceDetails(order)} 
                              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
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

              <TabsContent value="my-orders" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Mening buyurtmalarim</h3>
                  <Select value={myOrderStatusFilter} onValueChange={setMyOrderStatusFilter}>
                    <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Status tanlang" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">Hammasi</SelectItem>
                      <SelectItem value="created" className="text-white hover:bg-slate-700">Yaratilgan</SelectItem>
                      <SelectItem value="accepted" className="text-white hover:bg-slate-700">Qabul qilingan</SelectItem>
                      <SelectItem value="started" className="text-white hover:bg-slate-700">Boshlangan</SelectItem>
                      <SelectItem value="stopped" className="text-white hover:bg-slate-700">To'xtatilgan</SelectItem>
                      <SelectItem value="completed" className="text-white hover:bg-slate-700">Yakunlangan</SelectItem>
                      <SelectItem value="cancelled" className="text-white hover:bg-slate-700">Bekor qilingan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {completedOrders.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <p className="text-slate-400 text-lg">Mavjud buyurtmalar yo'q</p>
                    </div>
                  ) : (
                    completedOrders.map((order) => (
                      <Card key={order.id} className="hover:shadow-xl transition-all border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                        <CardHeader className="pb-3 border-b border-slate-700">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2 text-white">
                                <MapPin className="w-5 h-5 text-blue-400"/>
                                {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                              </CardTitle>
                              <CardDescription className="text-slate-400">Buyurtma #{order.id || "0"}</CardDescription>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Clock className="w-4 h-4 text-slate-400"/>
                              <span>{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <User className="w-4 h-4 text-slate-400"/>
                              <span>{order.passengers} kishi</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-700 bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                            <span className="text-sm text-green-400 font-medium">Buyurtma narxi:</span>
                            <span className="text-lg font-bold text-green-400">
                              {formatCurrency(order?.price_order)} so'm
                            </span>
                          </div>

                          {order.phone && (
                            <div className="bg-blue-500/10 p-3 rounded-lg space-y-2 border border-blue-500/30">
                              <p className="text-sm font-medium text-blue-400">Mijoz ma'lumotlari:</p>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400"/>
                                <a href={`tel:${order.phone}`} className="text-sm text-blue-400 hover:underline font-medium">
                                  {order.phone}
                                </a>
                              </div>
                            </div>
                          )}

                          {order.histories && order.histories.length > 0 && (
                            <Collapsible open={expandedHistories[order.id]} onOpenChange={() => toggleHistory(order.id)}>
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" className="w-full justify-between bg-slate-800 hover:bg-slate-700 border-slate-700 text-white">
                                  <span className="flex items-center gap-2">
                                    <History className="w-4 h-4"/>
                                    Buyurtma tarixi ({order.histories.length})
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    {expandedHistories[order.id] ? "Yopish" : "Ko'rish"}
                                  </span>
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-2">
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 max-h-64 overflow-y-auto">
                                  <div className="space-y-3">
                                    {order.histories.map((history) => (
                                      <div key={history.id} className="flex gap-3 pb-3 border-b border-slate-700 last:border-0">
                                        <div className="flex-shrink-0">
                                          {getStatusBadge(history.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm text-slate-200 font-medium">{history.description}</p>
                                          <p className="text-xs text-slate-400 mt-1">
                                            {new Date(history.created_at).toLocaleString("uz-UZ")}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          )}

                          {order.status !== "completed" && order.status !== "cancelled" && (
                            <div className="flex gap-2 pt-2">
                              {getActionButton(order)}
                              <Button
                                onClick={() => openConfirmDialog("cancel", order.id)}
                                variant="destructive"
                                className="flex-1 bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30"
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

        <Dialog open={priceDialog.open} onOpenChange={(open) => setPriceDialog({...priceDialog, open})}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Buyurtma tafsilotlari</DialogTitle>
              <DialogDescription className="text-slate-400">
                Buyurtmani qabul qilish uchun to'lov ma'lumotlarini ko'rib chiqing
              </DialogDescription>
            </DialogHeader>
            
            {priceDialog.order && (
              <div className="space-y-4">
                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-400"/>
                    <p className="font-medium text-white">
                      {priceDialog.order?.route?.from?.name || "Topilmadi"} → {priceDialog.order?.route?.to?.name || "Topilmadi"}
                    </p>
                  </div>
                  <div className="text-sm text-slate-300 space-y-1">
                    <p>📅 {formatDateTime(priceDialog.order.date, "date")} • {formatDateTime(priceDialog.order.time, "time")}</p>
                    <p>👥 {priceDialog.order.passengers} yo'lovchi</p>
                  </div>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600">
                    <span className="text-sm font-medium text-slate-200">Buyurtma narxi:</span>
                    <span className="text-2xl font-bold text-green-400">
                      {formatCurrency(priceDialog.order.price_order)} so'm
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">To'lov summasi (10%):</span>
                    <span className="text-xl font-bold text-orange-400">
                      {formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm
                    </span>
                  </div>
                </div>

                <div className="bg-amber-900/40 border border-amber-700/50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0"/>
                    <div className="text-sm text-amber-100">
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
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
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
    </div>
  )
}

export default TaxiOrdersPage