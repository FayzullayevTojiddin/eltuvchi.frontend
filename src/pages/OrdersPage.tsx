import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {ConfirmActionDialog} from "@/components/ConfirmActionDialog";
import {
    Car,
    MapPin,
    Clock,
    CreditCard,
    Star,
    Phone,
    Filter,
    Eye, Play, CircleCheck
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api.ts";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

const OrdersPage = () => {
    const [filterStatus, setFilterStatus] = useState("all");
    const [orderData, setOrderData] = useState<any>([]);
    const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const navigate = useNavigate();

    // get data from server
    // useEffect(() => {
    //     try {
    //         api.get('/client/orders').then((res) => {
    //             if (!res?.success) {
    //                 toast.error("Buyurtmalarni olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    //                 navigate('/login')
    //             }
    //             setOrderData(res.data)
    //             console.log(res?.data)
    //         }).catch((err) => {
    //             console.log(err)
    //             toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    //         })
    //     } catch (e) {
    //         console.log(e)
    //         toast.error("Xatolik yuz berdi. Iltimos, urinib ko'ring.")
    //         window.location.reload()
    //     }
    // }, []);

    useEffect(() => {
        let apiKey = '/client/orders'

        if (filterStatus !== 'all' && filterStatus === 'created') {
            apiKey = '/client/orders?status=created'
        } else if (filterStatus !== 'all' && filterStatus === 'accepted') {
            apiKey = '/client/orders?status=accepted'
        } else if (filterStatus !== 'all' && filterStatus === 'started') {
            apiKey = '/client/orders?status=started'
        } else if (filterStatus !== 'all' && filterStatus === 'stopped') {
            apiKey = '/client/orders?status=stopped'
        } else if (filterStatus !== 'all' && filterStatus === 'completed') {
            apiKey = '/client/orders?status=completed'
        } else if (filterStatus !== 'all' && filterStatus === 'cancelled') {
            apiKey = '/client/orders?status=cancelled'
        }

        // 1. Eski buyurtmalarni olish
        api.get(apiKey)
            .then((res) => {
                if (!res?.success) {
                    toast.error("Buyurtmalarni olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                    navigate('/login');
                    return;
                }
                setOrderData(res.data);
                console.log("📦 Initial orders:", res.data);
            })
            .catch((err) => {
                console.error("❌ API error:", err);
                toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
            });

        // 2. WebSocket ulanishi
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

        const channel = echo.channel("client-orders");

        channel
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
            .listen("OrderDeleted", (event: any) => {
                console.log("🗑 Buyurtma o‘chirildi:", event);
                setOrderData((prev) => prev.filter((o) => o.id !== event.order.id));
            })
            .error((err: any) => {
                console.error("❌ WebSocket xatolik:", err);
                toast.error("WebSocket ulanishida xatolik yuz berdi!");
            });

        return () => {
            echo.disconnect();
        };
    }, [navigate, filterStatus]);


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-500">Yakunlangan</Badge>;
            case "created":
                return <Badge className="bg-blue-500">Faol</Badge>;
            case "started":
                return <Badge className="bg-green-500">Boshlangan</Badge>;
            case "cancelled":
                return <Badge variant="destructive">Bekor qilingan</Badge>;
            case "stopped":
                return <Badge className="bg-blue-500">Tugallangan</Badge>;
            case "accepted":
                return <Badge className='bg-green-500'>Qabul qilingan</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };


    const getRatingStars = (rating: number) => {
        return Array.from({length: 5}, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
            />
        ));
    };

    // format price
    const formatPrice = (price: string | number) => {
        return Number(price)
            .toFixed(0) // butun son qoldiradi
            .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // har 3 xonadan keyin bo'sh joy
    };

    // Handle order cancellation
    const handleCancelOrder = (orderId: number) => {
        setCancelOrderId(orderId);
        setShowCancelDialog(true);
    };

    const confirmCancelOrder = () => {
        if (cancelOrderId) {
            // Update order status to cancelled in the data
            setOrderData(prevData =>
                prevData.map(order =>
                    order.id === cancelOrderId
                        ? {...order, status: 'cancelled'}
                        : order
                )
            );
            api.delete(`/client/orders/${cancelOrderId}`).then((res) => {
                console.log(res?.data);
            }).catch((err) => {
                console.log(err);
                toast.error("Bekor qilishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
            })
        }
        setShowCancelDialog(false);
        setCancelOrderId(null);
    };


    const confirmCompleteOrder = (orderId: number) => {
        try {
            api.post(`/client/orders/${orderId}/complete`, {orderId}).then((res) => {
                console.log(res?.data);
                toast.success("Siz manzilga yetib keldingiz!!!");
            })
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.data)
        }
    }


    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Buyurtmalarim</h1>
                <p className="text-muted-foreground">Barcha buyurtmalar tarixi</p>
            </div>

            {/* Filter */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-5 w-5"/>
                            Buyurtmalar ({orderData.length})
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4"/>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Holat"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Hammasi</SelectItem>
                                    <SelectItem value="completed">Yakunlangan</SelectItem>
                                    <SelectItem value="created">Yaratilgan</SelectItem>
                                    <SelectItem value="accepted">Qabul qilingan</SelectItem>
                                    <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                                    <SelectItem value="stopped">Tugallangan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
                {orderData.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground"/>
                            <h3 className="font-medium mb-2">Buyurtmalar topilmadi</h3>
                            <p className="text-muted-foreground">
                                {filterStatus === "all"
                                    ? "Hali birorta buyurtma bermadingiz"
                                    : "Bu holat bo'yicha buyurtmalar yo'q"
                                }
                            </p>
                        </CardContent>
                    </Card>
                ) : (orderData.map((order) => (
                    <Card key={order.id} className="border-0 shadow-card-custom">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle className="text-lg">Buyurtma #{order.id}</CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <Clock className="h-4 w-4"/>
                                        <span>
                                          {order.date ? format(new Date(order.date), "yyyy-MM-dd") : "Sana yo'q"} •{" "}
                                            {order.time ? format(new Date(order.time), "HH:mm") : "Vaqt yo'q"}
                                        </span>
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusBadge(order.status)}
                                    {/*<Badge variant="outline">{order.carType}</Badge>*/}
                                    {/*<Badge variant="secondary">{order.price} so'm</Badge>*/}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Addresses */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                                    {order.route && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Qayerdan</p>
                                            <p className="font-medium">
                                                {order?.route.from?.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                                    {order.route && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Qayerga</p>
                                            <p className="font-medium">
                                                {order?.route.to?.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Driver Info */}
                            {order.driver && (
                                <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Car className="h-5 w-5 text-muted-foreground"/>
                                            <div>
                                                <p className="font-medium">{order.driver}</p>
                                                <p className="text-sm text-muted-foreground">{order.carNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {order.rating && (
                                                <div className="flex items-center gap-1">
                                                    {getRatingStars(order.rating)}
                                                </div>
                                            )}
                                            <Button size="sm" variant="outline">
                                                <Phone className="h-3 w-3 mr-1"/>
                                                Qo'ng'iroq
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Info */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CreditCard className="h-4 w-4"/>
                                <span>To'lov: {formatPrice(order.price_order)} so'm</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CreditCard className="h-4 w-4"/>
                                <span>Oldindan to'lov: {formatPrice(order.client_deposit)} so'm</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Car className="h-4 w-4"/>
                                <span>Yo'lovchilar soni: {order.passengers}</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                                {(order.status === "active" || order.status === "created" || order.status === "accepted") && (
                                    <>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleCancelOrder(order.id)}
                                        >
                                            Bekor qilish
                                        </Button>
                                    </>
                                )}
                                {order.status === "completed" && !order.rating && (
                                    <Button variant="outline" size="sm">
                                        <Star className="h-3 w-3 mr-1"/>
                                        Baholash
                                    </Button>
                                )}
                                {order.status === "stopped" && (
                                    <Button className="flex-1 gap-2"
                                            onClick={confirmCompleteOrder.bind(this, order.id)}>
                                        <CircleCheck className="h-4 w-4"/>
                                        Yetib keldim
                                    </Button>
                                )}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <Eye className="h-3 w-3 mr-1"/>
                                            Batafsil
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Buyurtma #{order.id} haqida ma'lumot</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium">Manzillar</h4>
                                                {order.route && (
                                                    <p className="text-sm text-muted-foreground">Qayerdan: {order?.route.from?.name}</p>
                                                )}

                                                {order.route && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Qayerga: {order?.route.to?.name}</p>
                                                )}

                                                {order?.note && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Tavsif: {order?.note}</p>
                                                )}
                                                {order?.phone && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Telefon raqam: <a className="text-blue-500 hover:underline"
                                                                          href={`tel://${order?.phone}`}>{order?.phone && order?.phone || "Telefon raqam kiritilmagan"}</a>
                                                    </p>
                                                )}
                                                {order?.optional_phone && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Qo'shimcha telefon raqam: <a
                                                        className="text-blue-500 hover:underline"
                                                        href={`tel://${order?.optional_phone}`}>{order?.optional_phone && order?.optional_phone || "Telefon raqam kiritilmagan"}</a>
                                                    </p>
                                                )}
                                                {order?.passengers && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Yo'lovchilar soni: {order?.passengers}</p>
                                                )}
                                                {order?.date && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Kiritgan sana: {format(new Date(order.date), "dd.MM.yyyy")}</p>
                                                )}
                                                {order?.time && (
                                                    <p className="text-sm text-muted-foreground">
                                                        <hr className='mt-2 mb-2'/>
                                                        Kiritgan vaqt: {format(new Date(order.time), "HH:mm")}</p>
                                                )}
                                            </div>
                                            {order.driver && (
                                                <div>
                                                    <h4 className="font-medium">Haydovchi ma'lumotlari</h4>
                                                    <p className="text-sm text-muted-foreground">Ism: {order.driver}</p>
                                                    <p className="text-sm text-muted-foreground">Telefon: {order.driverPhone}</p>
                                                    <p className="text-sm text-muted-foreground">Mashina: {order.carNumber}</p>
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="font-medium">To'lov ma'lumotlari</h4>
                                                <p className="text-sm text-muted-foreground">Narx: {formatPrice(order.price_order)} so'm</p>
                                                <p className="text-sm text-muted-foreground">Chegirma: {formatPrice(order.discount_summ)} so'm</p>
                                                <p className="text-sm text-muted-foreground">Oldindan
                                                    to'lov: {formatPrice(order.client_deposit)} so'm</p>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                )))}
            </div>

            {/* Cancel Order Confirmation Dialog */}
            <ConfirmActionDialog
                open={showCancelDialog}
                onOpenChange={setShowCancelDialog}
                title="Buyurtmani bekor qilish"
                description="Haqiqatan ham bu buyurtmani bekor qilmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
                actionText="Buyurtmani bekor qilish"
                onConfirm={confirmCancelOrder}
                variant="destructive"
            />
        </div>
    );
};

export default OrdersPage;
