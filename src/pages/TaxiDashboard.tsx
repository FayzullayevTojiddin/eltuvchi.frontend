import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {DollarSign, Check, User, MapPin, Star, Loader2, Car} from "lucide-react"
import {useEffect, useState} from "react"
import {toast} from "react-hot-toast"
import api from "@/lib/api.ts"

const TaxiDashboard = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [dashboardData, setDashboardData] = useState<any>(null)
    
    useEffect(() => {
        try {
            setLoading(true)
            api.get('/driver/dashboard')
                .then((res) => {
                    console.log(res.data)
                    setDashboardData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Xatolik yuz berdi!")
                })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi!")
        } finally {
            setLoading(false)
        }
    }, [])

    const formatCurrency = (value: number | string) => {
        if (!value) return "0"
        return new Intl.NumberFormat("ru-RU").format(Number(value))
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "created":
                return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50 text-xs whitespace-nowrap">Yaratilgan</Badge>
            case "accepted":
                return <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs whitespace-nowrap">Qabul qilingan</Badge>
            case "started":
                return <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50 text-xs whitespace-nowrap">Boshlangan</Badge>
            case "stopped":
                return <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 text-xs whitespace-nowrap">To'xtatilgan</Badge>
            case "waiting_confirmation":
                return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 text-xs whitespace-nowrap">Tasdiq kutilmoqda</Badge>
            case "completed":
                return <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs whitespace-nowrap">Yakunlandi</Badge>
            case "cancelled":
                return <Badge className="bg-red-500/20 text-red-400 border border-red-500/50 text-xs whitespace-nowrap">Bekor qilingan</Badge>
            default:
                return <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/50 text-xs whitespace-nowrap">Noma'lum</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return ""
        try {
            const date = new Date(dateString)
            return date.toLocaleString("uz-UZ", {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch {
            return dateString
        }
    }

    const truncateText = (text: string, maxLength: number) => {
        if (!text) return ''
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }

    const stats = [
        {
            title: "Umumiy daromat",
            value: formatCurrency(dashboardData?.total_income) || "0",
            unit: "so'm",
            icon: DollarSign,
        },
        {
            title: "Bajarilgan buyurtmalar",
            value: dashboardData?.completed_orders_count || "0",
            unit: "ta",
            icon: Check,
        },
        {
            title: "Reyting",
            value: dashboardData?.average_rating || "0",
            unit: "⭐",
            icon: Star,
        },
    ]

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 animate-fade-in bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="relative w-40 h-16">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-[moveCar_3s_linear_infinite]">
                        <Car className="h-12 w-12 text-yellow-500"/>
                    </div>
                    <div className="absolute bottom-0 w-full h-1 bg-gray-200 rounded">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50 animate-pulse"></div>
                    </div>
                </div>
                <p className="text-base sm:text-lg font-medium text-slate-400">Sayt yuklanmoqda...</p>
                <Loader2 className="h-6 w-6 text-yellow-500 animate-spin"/>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto px-2 sm:px-4 max-w-7xl py-4 sm:py-6">
                <div className="space-y-4 sm:space-y-6 animate-fade-in">
                    <div className="text-center space-y-1 sm:space-y-2">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Haydovchi Paneli</h1>
                        <p className="text-xs sm:text-sm text-slate-400">Buyurtmalarni boshqaring va daromad qiling</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {stats.map((stat, index) => (
                            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-slate-400 truncate">{stat.title}</p>
                                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1 truncate">
                                                {stat.value} <span className="text-sm sm:text-base">{stat.unit}</span>
                                            </p>
                                        </div>
                                        <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 flex-shrink-0 ml-2"/>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Trips */}
                    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg md:text-xl text-white">So'nggi safarlar</CardTitle>
                            <CardDescription className="text-xs sm:text-sm text-slate-400">Yaqinda bajarilgan buyurtmalar</CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-6">
                            <div className="space-y-3 sm:space-y-4">
                                {dashboardData?.recent_orders && dashboardData.recent_orders.length > 0 ? (
                                    dashboardData.recent_orders.map((trip) => (
                                        <div
                                            key={trip.id}
                                            className="p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0 mt-0.5"/>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-white text-sm sm:text-base break-words">
                                                            <span className="inline sm:hidden">
                                                                {truncateText(trip.route?.from?.name || "?", 10)} → {truncateText(trip.route?.to?.name || "?", 10)}
                                                            </span>
                                                            <span className="hidden sm:inline md:hidden">
                                                                {truncateText(trip.route?.from?.name || "?", 15)} → {truncateText(trip.route?.to?.name || "?", 15)}
                                                            </span>
                                                            <span className="hidden md:inline">
                                                                {trip.route?.from?.name || "?"} → {trip.route?.to?.name || "?"}
                                                            </span>
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                                            <p className="text-xs sm:text-sm text-slate-400">
                                                                #{trip.id}
                                                            </p>
                                                            <span className="text-slate-600">•</span>
                                                            <p className="text-xs sm:text-sm text-slate-400">
                                                                {formatDate(trip.created_at)}
                                                            </p>
                                                        </div>
                                                        <div className="mt-2">
                                                            {getStatusBadge(trip.status)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-left sm:text-right flex-shrink-0">
                                                    <p className="font-bold text-green-400 text-sm sm:text-base">
                                                        {formatCurrency(trip.price_order)} so'm
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 sm:py-12 border-2 border-dashed border-slate-700 rounded-lg">
                                        <p className="text-slate-400 text-sm sm:text-base">Hech qanday safar topilmadi</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TaxiDashboard