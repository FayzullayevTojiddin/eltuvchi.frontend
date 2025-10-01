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
import api from "@/lib/api.ts";
import {formatCurrency} from "@/utils/numberFormat.ts";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {useNavigate} from "react-router-dom";

const TaxiOrdersPage = () => {
    const [myOrderStatusFilter, setMyOrderStatusFilter] = useState("all")

    const [orderData, setOrderData] = useState([])
    const [completedOrders, setCompletedOrders] = useState([])

    const navigate = useNavigate()


    // get order data from server
    useEffect(() => {
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
                setCompletedOrders(res.data);
                console.log("my orders:", res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
            });


        api.get('/driver/orders')
            .then((res) => {
                setOrderData(res.data);
                console.log("📦 Initial orders:", res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
            });


        (window as any).Pusher = Pusher;

        const echo = new Echo({
            broadcaster: "reverb",
            key: "eltuvchi-key",
            wsHost: "89.39.94.112",
            wsPort: 8080,
            wssPort: 8080,
            forceTLS: false,
            disableStats: true,
            enabledTransports: ["ws", "wss"],
            authEndpoint: "http://89.39.94.112:8000/broadcasting/auth",
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            },
        });

        echo.channel("driver/orders")
            .listen("OrderCreated", (event: any) => {
                console.log("✅ Yangi buyurtma:", event);
                setOrderData((prev) => [...prev, event.order]);
            })
            .listen("OrderUpdated", (event: any) => {
                console.log("♻️ Buyurtma yangilandi:", event);
                setOrderData((prev) =>
                    prev.map((o) => (o.id === event.order.id ? event.order : o))
                );
            })
            .listen("OrderCompleted", (event: any) => {
                console.log("🏁 Buyurtma tugadi:", event);
                setCompletedOrders((prev) => [...prev, event.order]);
            });

        return () => {
            echo.disconnect();
        };
    }, [myOrderStatusFilter]);


    // Confirmation dialog states
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
        // const orderToAccept = orders.available.find(order => order.id === orderId)
        // if (!orderToAccept) return
        // console.log('nima gape')
        // Move order from available to myOrders with "accepted" status
        // const newOrder = {...orderToAccept, status: "accepted"}
        //
        // setOrders(prev => ({
        //     available: prev.available.filter(order => order.id !== orderId),
        //     myOrders: [newOrder, ...prev.myOrders]
        // }))
        //
        // toast({
        //     title: "Buyurtma qabul qilindi!",
        //     description: "Mijoz bilan bog'lanishingiz mumkin"
        // })
        try {
            api.post(`/driver/orders/${orderId}`, {orderId}).then((res) => {
                console.log(res.data)

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

    // ✅ Bekor qilish funksiyasi
    const handleCancelOrder = (orderId: string) => {
        try {
            api.delete(`/driver/orders/${orderId}`).then((res) => {
                console.log(res.data)
                toast.success("Buyurtma bekor qilindi!")
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
                window.location.reload()
            }).catch(err => {
                console.log(err?.response?.data?.error)
                if (err?.response?.data?.error) {
                    toast.error(err?.response?.data?.error)
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
        setOrders(prev => ({
            ...prev,
            myOrders: prev.myOrders.map(order =>
                order.id === orderId ? {...order, status: "waiting_confirmation"} : order
            )
        }))

        toast.success("Mijoz tasdiqlashi kutulmoqda...")
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "accepted":
                return (
                    <Badge className="bg-green-100 text-green-700 border border-green-300">
                        Qabul qilingan
                    </Badge>
                );
            case "started":
                return (
                    <Badge className="bg-green-100 text-green-700 border border-green-300">
                        Boshlangan
                    </Badge>
                );
            case "in_progress":
                return <Badge variant="secondary"
                              className="bg-primary/20 text-primary border-primary/30">Jarayonda</Badge>
            case "waiting_confirmation":
                return <Badge variant="secondary" className="bg-orange-500/20 text-orange-600 border-orange-500/30">Tasdiq
                    kutilmoqda</Badge>
            case "completed":
                return <Badge variant="default" className="bg-success">Yakunlandi</Badge>
            default:
                return <Badge variant="secondary">Noma'lum</Badge>
        }
    }

    const getActionButton = (order) => {
        switch (order.status) {
            case "accepted":
                return (
                    <Button onClick={() => openConfirmDialog("start", order.id)} className="flex-1 gap-2">
                        <Play className="h-4 w-4"/>
                        Boshlash
                    </Button>
                )
            case "started":
                return (
                    <Button onClick={() => openConfirmDialog("complete", order.id)} className="flex-1 gap-2"
                            variant="default">
                        <Square className="h-4 w-4"/>
                        Tugatish
                    </Button>
                )
            case "waiting_confirmation":
                return (
                    <Button variant="outline" disabled className="flex-1">
                        Mijoz tasdiqini kutmoqda...
                    </Button>
                )
            case "completed":
                return (
                    <Button variant="outline" disabled className="flex-1">
                        Yakunlangan
                    </Button>
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
                    <Button variant="outline" disabled className="flex-1">
                        Mijoz tasdiqini kutmoqda...
                    </Button>
                )
            default:
                return null
        }
    }


    const formatDateTime = (dateString: string, type: "date" | "time") => {
        if (!dateString) return "-";
        const date = new Date(dateString);

        if (type === "date") {
            return date.toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }); // 👉 25.09.2025
        }

        if (type === "time") {
            return date.toLocaleTimeString("uz-UZ", {
                hour: "2-digit",
                minute: "2-digit",
            }); // 👉 18:00
        }
    };


    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Buyurtmalar</h1>
                <p className="text-muted-foreground">Mavjud va bajarilgan buyurtmalarni boshqaring</p>
            </div>

            <Tabs defaultValue="available" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="available">Mavjud buyurtmalar</TabsTrigger>
                    <TabsTrigger value="my-orders">Mening buyurtmalarim</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-4">
                    <Card className="bg-gradient-card border-0 shadow-card-custom">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>Mavjud buyurtmalar</CardTitle>
                                    <CardDescription>Qabul qilish uchun mavjud buyurtmalar</CardDescription>
                                </div>
                                {/*<div className="flex items-center gap-2">*/}
                                {/*    <Filter className="h-4 w-4"/>*/}
                                {/*    <Input*/}
                                {/*        placeholder="Qidirish..."*/}
                                {/*        value={availableOrderFilter}*/}
                                {/*        onChange={(e) => setAvailableOrderFilter(e.target.value)}*/}
                                {/*        className="w-40"*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                        </CardHeader>
                    </Card>

                    {orderData.length === 0 ? (
                        <Card className="bg-gradient-card border-0">
                            <CardContent className="p-8 text-center">
                                <p className="text-muted-foreground">Mavjud buyurtmalar yo'q</p>
                            </CardContent>
                        </Card>
                    ) : (
                        orderData.map((order) => (
                            <Card key={order.id} className="bg-gradient-card border-0 shadow-card-custom">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5"/>
                                                {order?.route?.from?.name} → {order?.route?.to?.name}
                                            </CardTitle>
                                            <CardDescription>Buyurtma #{order.id}</CardDescription>
                                        </div>
                                        <Badge variant="secondary">{getOrderStatus(order?.status) || "Yangi"}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <Clock className="h-4 w-4 inline mr-1"/>
                                            {formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}
                                        </div>
                                        <div>
                                            <User className="h-4 w-4 inline mr-1"/>
                                            {order.passengers} kishi
                                        </div>
                                        <div className="font-medium text-primary">
                                            {new Intl.NumberFormat("uz-UZ").format(parseFloat(order.client_deposit))} so'm
                                        </div>
                                    </div>

                                    {/* Client Info - Hidden until order is accepted */}
                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-2">Buyurtma ma'lumotlari:</h4>
                                        <div className="space-y-1 text-sm">
                                            <p className="flex items-center justify-between">
                                                <span>To'lov miqdori:</span>
                                                <span className="font-semibold">
                                                  {new Intl.NumberFormat("uz-UZ").format(parseFloat(order.price_order))} so'm
                                                </span>

                                            </p>
                                            {!order.note || (
                                                <p className="flex items-center justify-between">
                                                    <span>Qo'shimcha:</span>
                                                    <span
                                                        className="font-semibold">{order.note || ""}</span>
                                                </p>
                                            )}
                                            <p className="text-muted-foreground text-xs">
                                                Mijoz ma'lumotlari qabul qilganingizdan keyin ko'rinadi
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => openConfirmDialog("accept", order.id)}
                                            className="flex-1"
                                        >
                                            <Check className="h-4 w-4 mr-2"/>
                                            Qabul qilish
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => openConfirmDialog("cancel", order.id)}
                                        >
                                            <Ban className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="my-orders" className="space-y-4">
                    <Card className="bg-gradient-card border-0 shadow-card-custom">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>Mening buyurtmalarim</CardTitle>
                                    <CardDescription>Bajarilgan va jarayondagi buyurtmalar</CardDescription>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2">
                                    {/*<div className="flex items-center gap-2">*/}
                                    {/*    <Filter className="h-4 w-4"/>*/}
                                    {/*    <Input*/}
                                    {/*        placeholder="Qidirish..."*/}
                                    {/*        value={myOrderFilter}*/}
                                    {/*        onChange={(e) => setMyOrderFilter(e.target.value)}*/}
                                    {/*        className="w-40"*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <Select value={myOrderStatusFilter} onValueChange={setMyOrderStatusFilter}>
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Holat"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Hammasi</SelectItem>
                                            <SelectItem value="created">Yaratilgan</SelectItem>
                                            <SelectItem value="completed">Yakunlangan</SelectItem>
                                            <SelectItem value="accepted">Qabul qilingan</SelectItem>
                                            <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                                            <SelectItem value="stopped">Tugallangan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {completedOrders.length === 0 ? (
                        <Card className="bg-gradient-card border-0">
                            <CardContent className="p-8 text-center">
                                <p className="text-muted-foreground">Mavjud buyurtmalar yo'q</p>
                            </CardContent>
                        </Card>
                    ) : (
                        completedOrders.map((order) => (
                            <Card key={order.id} className="bg-gradient-card border-0 shadow-card-custom">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5"/>
                                                {order.route.from.name || "Topilmadi"} → {order.route.to.name || "Topilmadi"}
                                            </CardTitle>
                                            <CardDescription>Buyurtma #{order.id || "0"}</CardDescription>
                                        </div>
                                        {getStatusBadge(order.status)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <Clock className="h-4 w-4 inline mr-1"/>
                                            {formatDateTime(order.date, "date")} • {formatDateTime(order.time, "time")}
                                        </div>
                                        <div>
                                            <User className="h-4 w-4 inline mr-1"/>
                                            {order.passengers} kishi
                                        </div>
                                        <div className="font-medium text-primary">
                                            {formatCurrency(order?.client_deposit)} so'm
                                        </div>
                                    </div>

                                    {order.client && (
                                        <div className="border-t pt-4">
                                            <h4 className="font-medium mb-2">Mijoz ma'lumotlari:</h4>
                                            <div className="space-y-1 text-sm">
                                                {order.client.rating && (
                                                    <p className="flex items-center justify-between">
                                                        <span>Mijoz reytingi:</span>
                                                        <span>⭐ {order.client.rating}</span>
                                                    </p>
                                                )}
                                                {order.client.phone && (
                                                    <p className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3"/>
                                                        <a
                                                            href={`tel:${order.client.phone}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {order.client.phone}
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}


                                    {order.status !== "completed" && (
                                        <div className="border-t pt-4">
                                            <div className="flex gap-2">
                                                {getActionButton(order)}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    disabled={!order?.client}
                                                >
                                                    {order?.client ? (
                                                        <a href={`tel:${order.client.phone || "999999999"}`}>
                                                            <Phone className="h-4 w-4" />
                                                        </a>
                                                    ) : (
                                                        <span className="flex items-center">
                                                            <Phone className="h-4 w-4" />
                                                        </span>
                                                    )}
                                                </Button>

                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>
            </Tabs>

            {/* Confirmation Dialog */}
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
