import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {MapPin, Clock, User, Phone, Check, Play, Square, Ban, DollarSign, AlertCircle, History, Navigation, Package} from "lucide-react"
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

const TaxiOrdersPage = () => {
  const [myOrderStatusFilter, setMyOrderStatusFilter] = useState("all")
  const [orderData, setOrderData] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [historyDialog, setHistoryDialog] = useState({
    open: false,
    histories: [],
    orderId: null
  })

  const [priceDialog, setPriceDialog] = useState({
    open: false,
    order: null
  })

  const fetchOrders = () => {
    let queryParam = ''
    if (myOrderStatusFilter !== 'all') {
      queryParam = `?status=${myOrderStatusFilter}`
    }

    api.get(`/driver/my_orders${queryParam}`)
      .then((res) => {
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

    api.get('/driver/orders')
      .then((res) => {
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
        return <Badge className="bg-blue-500/20 text-blue-400 dark:text-blue-300 border border-blue-500/50 hover:bg-blue-500/30 text-sm px-3 py-1">Yaratilgan</Badge>
      case "accepted":
        return (
          <Badge className="bg-green-500/20 text-green-400 dark:text-green-300 border border-green-500/50 hover:bg-green-500/30 text-sm px-3 py-1 flex items-center gap-1">
            <Check className="w-4 h-4"/>
            Qabul qilingan
          </Badge>
        )
      case "started":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 dark:text-purple-300 border border-purple-500/50 hover:bg-purple-500/30 text-sm px-3 py-1 flex items-center gap-1">
            <Play className="w-4 h-4"/>
            Boshlangan
          </Badge>
        )
      case "stopped":
        return <Badge className="bg-orange-500/20 text-orange-400 dark:text-orange-300 border border-orange-500/50 hover:bg-orange-500/30 text-sm px-3 py-1">To'xtatilgan</Badge>
      case "waiting_confirmation":
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/50 hover:bg-yellow-500/30 text-sm px-3 py-1">Tasdiq kutilmoqda</Badge>
      case "completed":
        return <Badge className="bg-slate-500/20 text-slate-600 dark:text-slate-300 border border-slate-500/50 hover:bg-slate-500/30 text-sm px-3 py-1">Yakunlandi</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/50 hover:bg-red-500/30 text-sm px-3 py-1">Bekor qilingan</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-600 dark:text-gray-300 border border-gray-500/50 text-sm px-3 py-1">Noma'lum</Badge>
    }
  }

  const getActionButton = (order) => {
    switch (order.status) {
      case "accepted":
        return (
          <Button onClick={() => openConfirmDialog("start", order.id)} className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm py-4" disabled={loading}>
            <Play className="w-4 h-4"/>
            Boshlash
          </Button>
        )
      case "started":
        return (
          <Button onClick={() => openConfirmDialog("complete", order.id)} className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm py-4" disabled={loading}>
            <Square className="w-4 h-4"/>
            Tugatish
          </Button>
        )
      case "stopped":
        return (
          <Badge className="bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/50 flex-1 justify-center py-3 text-xs sm:text-sm">
            Mijoz tasdiqini kutmoqda...
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-slate-500/20 text-slate-600 dark:text-slate-300 border border-slate-500/50 flex-1 justify-center py-3 text-xs sm:text-sm">
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

  const calculateCommission = (order) => {
    return order.fee_per_client * order.passengers
  }

  const toggleHistory = (orderId, histories) => {
    setHistoryDialog({
      open: true,
      histories: histories || [],
      orderId: orderId
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-4 sm:py-6">
        <Card className="border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"/>
              Buyurtmalar
            </CardTitle>
            <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Mavjud va bajarilgan buyurtmalarni boshqaring
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid grid-cols-2 gap-2 bg-slate-200 dark:bg-slate-800/50 p-1.5 h-auto mb-4 rounded-xl">
                <TabsTrigger 
                  value="available" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-600 dark:text-slate-400 text-xs sm:text-sm py-2 rounded-lg transition-all"
                >
                  <Package className="w-4 h-4 mr-1.5"/>
                  Mavjud ({orderData.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="my-orders" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-600 dark:text-slate-400 text-xs sm:text-sm py-2 rounded-lg transition-all"
                >
                  <User className="w-4 h-4 mr-1.5"/>
                  Mening ({completedOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4">
                <div className="space-y-4">
                  {orderData.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-100 dark:bg-slate-800/30">
                      <Package className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4"/>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">Mavjud buyurtmalar yo'q</p>
                    </div>
                  ) : (
                    orderData.map((order) => (
                      <Card key={order.id} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700 p-5 bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-800">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-slate-900 dark:text-white mb-2">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"/>
                                <span className="break-words line-clamp-2">
                                  {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                                </span>
                              </CardTitle>
                              <CardDescription className="text-slate-600 dark:text-slate-400 text-xs">
                                Buyurtma #{order.id}
                              </CardDescription>
                            </div>
                            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/50 flex-shrink-0 text-xs px-2 py-0.5">
                              Yangi
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4 p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-lg">
                              <Clock className="w-4 h-4 text-blue-500 flex-shrink-0"/>
                              <span className="truncate">{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-lg">
                              <User className="w-4 h-4 text-purple-500 flex-shrink-0"/>
                              <span>{order.passengers} yo'lovchi</span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 p-3 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Buyurtma narxi:</span>
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(order.price_order)} so'm
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-green-200 dark:border-green-700">
                              <span className="text-xs text-slate-600 dark:text-slate-300">Komissiya:</span>
                              <span className="text-sm sm:text-base md:text-lg font-semibold text-orange-600 dark:text-orange-400">
                                {formatCurrency(calculateCommission(order))} so'm
                              </span>
                            </div>
                          </div>

                          {order.note && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">📝 Qo'shimcha:</p>
                              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-200 line-clamp-2">{order.note}</p>
                            </div>
                          )}

                          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 p-2.5 rounded-xl flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-300 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-800 dark:text-amber-200">
                              Mijoz ma'lumotlari buyurtmani qabul qilganingizdan keyin ko'rinadi
                            </p>
                          </div>

                          <Button 
                            onClick={() => showPriceDetails(order)} 
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base py-5 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            disabled={loading}
                          >
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2"/>
                            Narxni ko'rish va qabul qilish
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-orders" className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Mening buyurtmalarim</h3>
                  <Select value={myOrderStatusFilter} onValueChange={setMyOrderStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[220px] bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base h-11 rounded-lg">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                      <SelectItem value="all" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">Hammasi</SelectItem>
                      <SelectItem value="created" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">Yaratilgan</SelectItem>
                      <SelectItem value="accepted" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">Qabul qilingan</SelectItem>
                      <SelectItem value="started" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">Boshlangan</SelectItem>
                      <SelectItem value="stopped" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">To'xtatilgan</SelectItem>
                      <SelectItem value="completed" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">Yakunlangan</SelectItem>
                      <SelectItem value="cancelled" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base">Bekor qilingan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {completedOrders.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-100 dark:bg-slate-800/30">
                      <Package className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4"/>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">Mavjud buyurtmalar yo'q</p>
                    </div>
                  ) : (
                    completedOrders.map((order) => (
                      <Card key={order.id} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-lg">
                        <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700 p-4">
                          <div className="space-y-2">
                            <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0"/>
                              <span className="break-words line-clamp-2">
                                {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                              </span>
                            </CardTitle>
                            <div className="flex items-center justify-between">
                              <CardDescription className="text-slate-600 dark:text-slate-400 text-xs">
                                Buyurtma #{order.id || "0"}
                              </CardDescription>
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4 p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-lg">
                              <Clock className="w-4 h-4 text-blue-500 flex-shrink-0"/>
                              <span className="truncate">{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-lg">
                              <User className="w-4 h-4 text-purple-500 flex-shrink-0"/>
                              <span>{order.passengers} yo'lovchi</span>
                            </div>
                          </div>

                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border-2 border-green-200 dark:border-green-700">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">Buyurtma narxi:</span>
                              <span className="text-base sm:text-lg md:text-xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(order?.price_order)} so'm
                              </span>
                            </div>
                          </div>

                          {order.phone && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1.5">📞 Mijoz:</p>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
                                <a href={`tel:${order.phone}`} className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                  {order.phone}
                                </a>
                              </div>
                            </div>
                          )}

                          {order.histories && order.histories.length > 0 && (
                            <Button 
                              onClick={() => toggleHistory(order.id, order.histories)}
                              variant="outline" 
                              className="w-full justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm py-4 rounded-xl"
                            >
                              <History className="w-4 h-4 mr-2"/>
                              Buyurtma tarixi ({order.histories.length})
                            </Button>
                          )}

                          {order.status !== "completed" && order.status !== "cancelled" && (
                            <div className="flex flex-col sm:flex-row gap-2">
                              {getActionButton(order)}
                              <Button
                                onClick={() => openConfirmDialog("cancel", order.id)}
                                variant="destructive"
                                className="flex-1 bg-red-600/20 border-2 border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-600/30 text-xs sm:text-sm py-4 rounded-xl"
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
          <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 max-w-[calc(100%-2rem)] mx-4">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-white text-base sm:text-lg">Buyurtma tafsilotlari</DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Buyurtmani qabul qilish uchun to'lov ma'lumotlarini ko'rib chiqing
              </DialogDescription>
            </DialogHeader>
            
            {priceDialog.order && (
              <div className="space-y-3">
                <div className="bg-slate-100 dark:bg-slate-800/80 border-2 border-slate-300 dark:border-slate-600 p-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0"/>
                    <p className="font-medium text-slate-900 dark:text-white text-xs sm:text-sm break-words line-clamp-2">
                      {priceDialog.order?.route?.from?.name || "Topilmadi"} → {priceDialog.order?.route?.to?.name || "Topilmadi"}
                    </p>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                    <p>📅 {formatDateTime(priceDialog.order.date, "date")} • {formatDateTime(priceDialog.order.time, "time")}</p>
                    <p>👥 {priceDialog.order.passengers} yo'lovchi</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-600 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-green-200 dark:border-green-600">
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Buyurtma narxi:</span>
                    <span className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(priceDialog.order.price_order)} so'm
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-300">To'lov summasi:</span>
                    <span className="text-sm sm:text-base font-bold text-orange-600 dark:text-orange-400">
                      {formatCurrency(calculateCommission(priceDialog.order))} so'm
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 p-2.5 rounded-xl">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-300 mt-0.5 flex-shrink-0"/>
                    <div className="text-xs text-amber-800 dark:text-amber-200">
                      <p className="font-semibold mb-0.5">⚠️ Muhim:</p>
                      <p>Buyurtmani qabul qilish uchun hisobingizdan <strong>{formatCurrency(calculateCommission(priceDialog.order))} so'm</strong> yechib olinadi. Buyurtmani bekor qilsangiz, pul qaytarilmaydi.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setPriceDialog({...priceDialog, open: false})}
                disabled={loading}
                className="w-full sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm py-4"
              >
                Yopish
              </Button>
              <Button 
                onClick={() => handleAcceptOrder(priceDialog.order?.id)}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs sm:text-sm py-4"
              >
                <Check className="w-4 h-4 mr-1.5"/>
                {loading ? "Kutilmoqda..." : "Qabul qilish"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={historyDialog.open} onOpenChange={(open) => setHistoryDialog({...historyDialog, open})}>
          <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 max-h-[80vh] overflow-y-auto max-w-[calc(100%-2rem)] mx-4">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-white flex items-center gap-2 text-xl">
                <History className="w-6 h-6"/>
                Buyurtma tarixi
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 text-base">
                Buyurtma #{historyDialog.orderId} ning barcha o'zgarishlari
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {historyDialog.histories.length === 0 ? (
                <div className="text-center py-12 text-slate-600 dark:text-slate-400 text-base">
                  Tarix mavjud emas
                </div>
              ) : (
                historyDialog.histories.map((history) => (
                  <div key={history.id} className="flex gap-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0">
                    <div className="flex-shrink-0 pt-1">
                      {getStatusBadge(history.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base text-slate-800 dark:text-slate-200 font-medium">{history.description}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {new Date(history.created_at).toLocaleString("uz-UZ", {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setHistoryDialog({...historyDialog, open: false})}
                className="w-full sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-base py-5"
              >
                Yopish
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