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

    api.get(`/driver/my_orders${queryParam}`)
      .then((res) => {
        setCompletedOrders(res.data.data || [])
      })
      .catch((err) => {
        console.log(err)
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      })

    api.get('/driver/orders')
      .then((res) => {
        setOrderData(res.data.data || [])
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

  const showPriceDetails = (order) => {
    setPriceDialog({
      open: true,
      order: order
    })
  }

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
      case "created":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Yaratilgan</Badge>
      case "accepted":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <Check className="w-3 h-3 mr-1"/>
            Qabul qilingan
          </Badge>
        )
      case "started":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            <Play className="w-3 h-3 mr-1"/>
            Boshlangan
          </Badge>
        )
      case "stopped":
        return <Badge className="bg-orange-500 hover:bg-orange-600">To'xtatilgan</Badge>
      case "waiting_confirmation":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Tasdiq kutilmoqda</Badge>
      case "completed":
        return <Badge className="bg-slate-500 hover:bg-slate-600">Yakunlandi</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Bekor qilingan</Badge>
      default:
        return <Badge className="bg-gray-400 hover:bg-gray-500">Noma'lum</Badge>
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
          <Badge className="bg-orange-500 flex-1 justify-center py-2">
            Mijoz tasdiqini kutmoqda...
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-slate-500 flex-1 justify-center py-2">
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
    <div className="container mx-auto p-6 space-y-6">
      <Card className="border-slate-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-2xl text-slate-800">Buyurtmalar</CardTitle>
          <CardDescription className="text-slate-600">Mavjud va bajarilgan buyurtmalarni boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100">
              <TabsTrigger value="available" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                Mavjud buyurtmalar
              </TabsTrigger>
              <TabsTrigger value="my-orders" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                Mening buyurtmalarim
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Mavjud buyurtmalar</h3>
                <p className="text-sm text-slate-500">Qabul qilish uchun mavjud buyurtmalar</p>
              </div>

              <div className="space-y-4">
                {orderData.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                    <p className="text-slate-400 text-lg">Mavjud buyurtmalar yo'q</p>
                  </div>
                ) : (
                  orderData.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-all border-slate-200 bg-white">
                      <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                              <MapPin className="w-5 h-5 text-green-600"/>
                              {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                            </CardTitle>
                            <CardDescription className="text-slate-600">Buyurtma #{order.id}</CardDescription>
                          </div>
                          <Badge className="bg-green-500 hover:bg-green-600 text-white">Yangi</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-slate-500"/>
                            <span>{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <User className="w-4 h-4 text-slate-500"/>
                            <span>{order.passengers} kishi</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-emerald-800">Buyurtma narxi:</span>
                            <span className="text-2xl font-bold text-emerald-600">
                              {formatCurrency(order.price_order)} so'm
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-emerald-200">
                            <span className="text-sm text-emerald-700">Sizning komissiyangiz (10%):</span>
                            <span className="text-lg font-semibold text-orange-600">
                              {formatCurrency(calculateCommission(order.price_order))} so'm
                            </span>
                          </div>
                        </div>

                        {order.note && (
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-900">Qo'shimcha ma'lumot:</p>
                            <p className="text-sm text-blue-700">{order.note}</p>
                          </div>
                        )}

                        <div className="bg-yellow-100 p-3 rounded-lg flex items-start gap-2 border-2 border-yellow-400">
                          <AlertCircle className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-yellow-900 font-medium">
                            Mijoz ma'lumotlari buyurtmani qabul qilganingizdan keyin ko'rinadi
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={() => showPriceDetails(order)} 
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
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
                <h3 className="text-lg font-semibold text-slate-800">Mening buyurtmalarim</h3>
                <Select value={myOrderStatusFilter} onValueChange={setMyOrderStatusFilter}>
                  <SelectTrigger className="w-[200px] bg-white border-slate-300">
                    <SelectValue placeholder="Status tanlang" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">Hammasi</SelectItem>
                    <SelectItem value="created">Yaratilgan</SelectItem>
                    <SelectItem value="accepted">Qabul qilingan</SelectItem>
                    <SelectItem value="started">Boshlangan</SelectItem>
                    <SelectItem value="stopped">To'xtatilgan</SelectItem>
                    <SelectItem value="completed">Yakunlangan</SelectItem>
                    <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {completedOrders.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                    <p className="text-slate-400 text-lg">Mavjud buyurtmalar yo'q</p>
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-all border-slate-200 bg-white">
                      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                              <MapPin className="w-5 h-5 text-blue-600"/>
                              {order?.route?.from?.name || "Topilmadi"} → {order?.route?.to?.name || "Topilmadi"}
                            </CardTitle>
                            <CardDescription className="text-slate-600">Buyurtma #{order.id || "0"}</CardDescription>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-slate-500"/>
                            <span>{formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <User className="w-4 h-4 text-slate-500"/>
                            <span>{order.passengers} kishi</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 bg-emerald-50 p-3 rounded-lg">
                          <span className="text-sm text-emerald-800 font-medium">Buyurtma narxi:</span>
                          <span className="text-lg font-bold text-emerald-600">
                            {formatCurrency(order?.price_order)} so'm
                          </span>
                        </div>

                        {order.phone && (
                          <div className="bg-blue-50 p-3 rounded-lg space-y-2 border border-blue-200">
                            <p className="text-sm font-medium text-blue-900">Mijoz ma'lumotlari:</p>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-blue-600"/>
                              <a href={`tel:${order.phone}`} className="text-sm text-blue-600 hover:underline font-medium">
                                {order.phone}
                              </a>
                            </div>
                          </div>
                        )}

                        {order.histories && order.histories.length > 0 && (
                          <Collapsible open={expandedHistories[order.id]} onOpenChange={() => toggleHistory(order.id)}>
                            <CollapsibleTrigger asChild>
                              <Button variant="outline" className="w-full justify-between bg-slate-50 hover:bg-slate-100 border-slate-300">
                                <span className="flex items-center gap-2">
                                  <History className="w-4 h-4"/>
                                  Buyurtma tarixi ({order.histories.length})
                                </span>
                                <span className="text-xs text-slate-500">
                                  {expandedHistories[order.id] ? "Yopish" : "Ko'rish"}
                                </span>
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2">
                              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 max-h-64 overflow-y-auto">
                                <div className="space-y-3">
                                  {order.histories.map((history) => (
                                    <div key={history.id} className="flex gap-3 pb-3 border-b border-slate-200 last:border-0">
                                      <div className="flex-shrink-0">
                                        {getStatusBadge(history.status)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-800 font-medium">{history.description}</p>
                                        <p className="text-xs text-slate-500 mt-1">
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
                              className="flex-1 bg-red-600 hover:bg-red-700"
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
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Buyurtma tafsilotlari</DialogTitle>
            <DialogDescription className="text-slate-600">
              Buyurtmani qabul qilish uchun to'lov ma'lumotlarini ko'rib chiqing
            </DialogDescription>
          </DialogHeader>
          
          {priceDialog.order && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600"/>
                  <p className="font-medium text-blue-900">
                    {priceDialog.order?.route?.from?.name || "Topilmadi"} → {priceDialog.order?.route?.to?.name || "Topilmadi"}
                  </p>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>📅 {formatDateTime(priceDialog.order.date, "date")} • {formatDateTime(priceDialog.order.time, "time")}</p>
                  <p>👥 {priceDialog.order.passengers} yo'lovchi</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                  <span className="text-sm font-medium text-emerald-800">Buyurtma narxi:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(priceDialog.order.price_order)} so'm
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-700">To'lov summasi (10%):</span>
                  <span className="text-xl font-bold text-orange-600">
                    {formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm
                  </span>
                </div>
              </div>

              <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-700 mt-0.5 flex-shrink-0"/>
                  <div className="text-sm text-yellow-900">
                    <p className="font-bold mb-1 text-base">⚠️ Muhim:</p>
                    <p className="font-medium">Buyurtmani qabul qilish uchun hisobingizdan <strong className="text-orange-700">{formatCurrency(calculateCommission(priceDialog.order.price_order))} so'm</strong> yechib olinadi. Buyurtmani bekor qilsangiz, pul qaytarilmaydi.</p>
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
              className="border-slate-300 hover:bg-slate-50"
            >
              Yopish
            </Button>
            <Button 
              onClick={() => handleAcceptOrder(priceDialog.order?.id)}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
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