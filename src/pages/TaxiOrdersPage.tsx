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
        return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30 text-xs whitespace-nowrap">Yaratilgan</Badge>
      case "accepted":
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 text-xs whitespace-nowrap">
            <Check className="w-3 h-3 mr-1"/>
            Qabul qilingan
          </Badge>
        )
      case "started":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30 text-xs whitespace-nowrap">
            <Play className="w-3 h-3 mr-1"/>
            Boshlangan
          </Badge>
        )
      case "stopped":
        return <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 hover:bg-orange-500/30 text-xs whitespace-nowrap">To'xtatilgan</Badge>
      case "waiting_confirmation":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30 text-xs whitespace-nowrap">Tasdiq kutilmoqda</Badge>
      case "completed":
        return <Badge className="bg-slate-500/20 text-slate-400 border border-slate-500/50 hover:bg-slate-500/30 text-xs whitespace-nowrap">Yakunlandi</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 text-xs whitespace-nowrap">Bekor qilingan</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/50 text-xs whitespace-nowrap">Noma'lum</Badge>
    }
  }

  const getActionButton = (order) => {
    switch (order.status) {
      case "accepted":
        return (
          <Button onClick={() => openConfirmDialog("start", order.id)} className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm min-h-[36px]" disabled={loading}>
            <Play className="w-3 h-3 sm:w-4 sm:h-4"/>
            Boshlash
          </Button>
        )
      case "started":
        return (
          <Button onClick={() => openConfirmDialog("complete", order.id)} className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm min-h-[36px]" disabled={loading}>
            <Square className="w-3 h-3 sm:w-4 sm:h-4"/>
            Tugatish
          </Button>
        )
      case "stopped":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 flex-1 justify-center py-2 text-xs sm:text-sm min-h-[36px] items-center">
            Mijoz tasdiqini kutmoqda...
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border border-slate-500/50 flex-1 justify-center py-2 text-xs sm:text-sm min-h-[36px] items-center">
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

  const toggleHistory = (orderId, histories) => {
    setHistoryDialog({
      open: true,
      histories: histories || [],
      orderId: orderId
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm border-0 rounded-none sm:rounded-lg">
          <CardHeader className="border-b border-slate-800 p-3 sm:p-4 md:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-white">Buyurtmalar</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-400">Mavjud va bajarilgan buyurtmalarni boshqaring</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 md:p-4">
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid grid-cols-1 gap-2 bg-slate-800/50 p-1 h-auto mb-3 sm:mb-4">
                <TabsTrigger 
                  value="available" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 text-xs sm:text-sm py-2 sm:py-2.5"
                >
                  Mavjud ({orderData.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="my-orders" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 text-xs sm:text-sm py-2 sm:py-2.5"
                >
                  Mening ({completedOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-2 sm:space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  {orderData.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 md:py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <p className="text-slate-400 text-xs sm:text-sm">Mavjud buyurtmalar yo'q</p>
                    </div>
                  ) : (
                    orderData.map((order) => (
                      <Card key={order.id} className="border-slate-700 bg-slate-800/50">
                        <CardHeader className="pb-2 sm:pb-3 border-b border-slate-700 p-2 sm:p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-2 text-white">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0"/>
                                <span className="truncate text-xs sm:text-sm md:text-base">
                                  <span className="inline sm:hidden">{(order?.route?.from?.name || "Topilmadi").slice(0, 10)}{(order?.route?.from?.name?.length > 10) ? '...' : ''} → {(order?.route?.to?.name || "Topilmadi").slice(0, 10)}{(order?.route?.to?.name?.length > 10) ? '...' : ''}</span>
                                  <span className="hidden sm:inline md:hidden">{(order?.route?.from?.name || "Topilmadi").slice(0, 15)}{(order?.route?.from?.name?.length > 15) ? '...' : ''} → {(order?.route?.to?.name || "Topilmadi").slice(0, 15)}{(order?.route?.to?.name?.length > 15) ? '...' : ''}</span>
                                  <span className="hidden md:inline">{order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}</span>
                                </span>
                              </CardTitle>
                              <CardDescription className="text-slate-400 text-xs mt-0.5">Buyurtma #{order.id}</CardDescription>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 flex-shrink-0 text-xs whitespace-nowrap">Yangi</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 p-2 sm:p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0"/>
                              <span className="truncate">{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0"/>
                              <span>{order.passengers} kishi</span>
                            </div>
                          </div>

                          <div className="bg-slate-800/80 border border-slate-600 p-2.5 sm:p-3 md:p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <span className="text-xs sm:text-sm font-medium text-slate-200">Buyurtma narxi:</span>
                              <span className="text-base sm:text-xl md:text-2xl font-bold text-green-400">
                                {formatCurrency(order.price_order)} so'm
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-600">
                              <span className="text-xs sm:text-sm text-slate-300">Komissiya (10%):</span>
                              <span className="text-sm sm:text-base md:text-lg font-semibold text-orange-400">
                                {formatCurrency(calculateCommission(order.price_order))} so'm
                              </span>
                            </div>
                          </div>

                          {order.note && (
                            <div className="bg-blue-500/10 p-2 sm:p-3 rounded-lg border border-blue-500/30">
                              <p className="text-xs sm:text-sm font-medium text-blue-400">Qo'shimcha ma'lumot:</p>
                              <p className="text-xs sm:text-sm text-blue-300 mt-0.5 break-words">{order.note}</p>
                            </div>
                          )}

                          <div className="bg-amber-900/40 border border-amber-700/50 p-2 sm:p-3 rounded-lg flex items-start gap-1.5 sm:gap-2">
                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-amber-100">
                              Mijoz ma'lumotlari buyurtmani qabul qilganingizdan keyin ko'rinadi
                            </p>
                          </div>

                          <Button 
                            onClick={() => showPriceDetails(order)} 
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                            disabled={loading}
                          >
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                            Narxni ko'rish va qabul qilish
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-orders" className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 px-0.5 sm:px-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Mening buyurtmalarim</h3>
                  <Select value={myOrderStatusFilter} onValueChange={setMyOrderStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] bg-slate-800 border-slate-700 text-white text-xs sm:text-sm h-9">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700 text-xs sm:text-sm">Hammasi</SelectItem>
                      <SelectItem value="created" className="text-white hover:bg-slate-700 text-xs sm:text-sm">Yaratilgan</SelectItem>
                      <SelectItem value="accepted" className="text-white hover:bg-slate-700 text-xs sm:text-sm">Qabul qilingan</SelectItem>
                      <SelectItem value="started" className="text-white hover:bg-slate-700 text-xs sm:text-sm">Boshlangan</SelectItem>
                      <SelectItem value="stopped" className="text-white hover:bg-slate-700 text-xs sm:text-sm">To'xtatilgan</SelectItem>
                      <SelectItem value="completed" className="text-white hover:bg-slate-700 text-xs sm:text-sm">Yakunlangan</SelectItem>
                      <SelectItem value="cancelled" className="text-white hover:bg-slate-700 text-xs sm:text-sm">Bekor qilingan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {completedOrders.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <p className="text-slate-400 text-xs sm:text-sm">Mavjud buyurtmalar yo'q</p>
                    </div>
                  ) : (
                    completedOrders.map((order) => (
                      <Card key={order.id} className="border-slate-700 bg-slate-800/50">
                        <CardHeader className="pb-2 sm:pb-3 border-b border-slate-700 p-2 sm:p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-2 text-white">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0"/>
                                <span className="truncate text-xs sm:text-sm md:text-base">
                                  <span className="inline sm:hidden">{(order?.route?.from?.name || "Topilmadi").slice(0, 10)}{(order?.route?.from?.name?.length > 10) ? '...' : ''} → {(order?.route?.to?.name || "Topilmadi").slice(0, 10)}{(order?.route?.to?.name?.length > 10) ? '...' : ''}</span>
                                  <span className="hidden sm:inline md:hidden">{(order?.route?.from?.name || "Topilmadi").slice(0, 15)}{(order?.route?.from?.name?.length > 15) ? '...' : ''} → {(order?.route?.to?.name || "Topilmadi").slice(0, 15)}{(order?.route?.to?.name?.length > 15) ? '...' : ''}</span>
                                  <span className="hidden md:inline">{order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}</span>
                                </span>
                              </CardTitle>
                              <CardDescription className="text-slate-400 text-xs mt-0.5">Buyurtma #{order.id || "0"}</CardDescription>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 md:pt-4 p-2 sm:p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0"/>
                              <span className="truncate">{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0"/>
                              <span>{order.passengers} kishi</span>
                            </div>
                          </div>

                          <div className="bg-green-500/10 p-2 sm:p-3 rounded-lg border border-green-500/30">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm text-green-400 font-medium">Buyurtma narxi:</span>
                              <span className="text-base sm:text-lg font-bold text-green-400">
                                {formatCurrency(order?.price_order)} so'm
                              </span>
                            </div>
                          </div>

                          {order.phone && (
                            <div className="bg-blue-500/10 p-2 sm:p-3 rounded-lg border border-blue-500/30">
                              <p className="text-xs sm:text-sm font-medium text-blue-400 mb-1.5 sm:mb-2">Mijoz ma'lumotlari:</p>
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0"/>
                                <a href={`tel:${order.phone}`} className="text-xs sm:text-sm text-blue-400 hover:underline font-medium">
                                  {order.phone}
                                </a>
                              </div>
                            </div>
                          )}

                          {order.histories && order.histories.length > 0 && (
                            <Button 
                              onClick={() => toggleHistory(order.id, order.histories)}
                              variant="outline" 
                              className="w-full justify-between bg-slate-800 hover:bg-slate-700 border-slate-700 text-white text-xs sm:text-sm min-h-[36px]"
                            >
                              <span className="flex items-center gap-1.5 sm:gap-2">
                                <History className="w-3.5 h-3.5 sm:w-4 sm:h-4"/>
                                Buyurtma tarixi ({order.histories.length})
                              </span>
                            </Button>
                          )}

                          {order.status !== "completed" && order.status !== "cancelled" && (
                            <div className="flex flex-col sm:flex-row gap-2">
                              {getActionButton(order)}
                              <Button
                                onClick={() => openConfirmDialog("cancel", order.id)}
                                variant="destructive"
                                className="flex-1 bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 text-xs sm:text-sm min-h-[36px]"
                                disabled={loading}
                              >
                                <Ban className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
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
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 max-w-[calc(100%-2rem)] mx-4">
            <DialogHeader>
              <DialogTitle className="text-white text-base sm:text-lg">Buyurtma tafsilotlari</DialogTitle>
              <DialogDescription className="text-slate-400 text-xs sm:text-sm">
                Buyurtmani qabul qilish uchun to'lov ma'lumotlarini ko'rib chiqing
              </DialogDescription>
            </DialogHeader>
            
            {priceDialog.order && (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-800/80 border border-slate-600 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0"/>
                    <p className="font-medium text-white text-xs sm:text-sm md:text-base break-words">
                      <span className="inline sm:hidden">{(priceDialog.order?.route?.from?.name || "Topilmadi").slice(0, 12)}{(priceDialog.order?.route?.from?.name?.length > 12) ? '...' : ''} → {(priceDialog.order?.route?.to?.name || "Topilmadi").slice(0, 12)}{(priceDialog.order?.route?.to?.name?.length > 12) ? '...' : ''}</span>
                      <span className="hidden sm:inline">{priceDialog.order?.route?.from?.name || "Topilmadi"} → {priceDialog.order?.route?.to?.name || "Topilmadi"}</span>
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 space-y-0.5 sm:space-y-1">
                    <p>📅 {formatDateTime(priceDialog.order.date, "date")} • {formatDateTime(priceDialog.order.time, "time")}</p>
                    <p>👥 {priceDialog.order.passengers} yo'lovchi</p>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-600 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-slate-600">
                    <span className="text-xs sm:text-sm font-medium text-slate-200">Buyurtma narxi:</span>
                    <span className="text-base sm:text-xl md:text-2xl font-bold text-green-400">
                      {formatCurrency(priceDialog.order.price_order)} so'm
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-300">To'lov summasi (10%):</span>
                    <span className="text-sm sm:text-lg md:text-xl font-bold text-orange-400">
                      {formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm
                    </span>
                  </div>
                </div>

                <div className="bg-amber-900/40 border border-amber-700/50 p-2.5 sm:p-3 rounded-lg">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 mt-0.5 flex-shrink-0"/>
                    <div className="text-xs sm:text-sm text-amber-100">
                      <p className="font-medium mb-0.5 sm:mb-1">Muhim:</p>
                      <p className="break-words">Buyurtmani qabul qilish uchun hisobingizdan <strong>{formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm</strong> yechib olinadi. Buyurtmani bekor qilsangiz, pul qaytarilmaydi.</p>
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
                className="w-full sm:w-auto bg-slate-800 border-slate-700 text-white hover:bg-slate-700 text-xs sm:text-sm min-h-[36px]"
              >
                Yopish
              </Button>
              <Button 
                onClick={() => handleAcceptOrder(priceDialog.order?.id)}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs sm:text-sm min-h-[36px]"
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                {loading ? "Kutilmoqda..." : "Qabul qilish"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={historyDialog.open} onOpenChange={(open) => setHistoryDialog({...historyDialog, open})}>
          <DialogContent className="sm:max-w-2xl bg-slate-900 border-slate-700 max-h-[80vh] overflow-y-auto max-w-[calc(100%-2rem)] mx-4">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                <History className="w-4 h-4 sm:w-5 sm:h-5"/>
                Buyurtma tarixi
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs sm:text-sm">
                Buyurtma #{historyDialog.orderId} ning barcha o'zgarishlari
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-2 sm:space-y-3 py-3 sm:py-4">
              {historyDialog.histories.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-slate-400 text-xs sm:text-sm">
                  Tarix mavjud emas
                </div>
              ) : (
                historyDialog.histories.map((history) => (
                  <div key={history.id} className="flex gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-slate-700 last:border-0">
                    <div className="flex-shrink-0 pt-0.5 sm:pt-1">
                      {getStatusBadge(history.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-slate-200 font-medium break-words">{history.description}</p>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">
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
                className="w-full sm:w-auto bg-slate-800 border-slate-700 text-white hover:bg-slate-700 text-xs sm:text-sm min-h-[36px]"
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