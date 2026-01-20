import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {
    Car,
    Clock,
    DollarSign,
    CircleDollarSign,
    Coins,
    Loader2,
    TrendingUp
} from "lucide-react"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import toast from "react-hot-toast"
import api from "@/lib/api.ts"
import axios from "axios"

const Dashboard = () => {
    const [initData, setInitData] = useState<string>('')
    const navigate = useNavigate()
    const [dashboardData, setDashboardData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [initialLoad, setInitialLoad] = useState(true)

    const formatPrice = (price: string | number) => {
        if (!price) return "0"
        return Number(price)
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const fetchDashboardData = async () => {
        try {
            const dashRes = await api.get("/client/dashboard")
            setDashboardData(dashRes.data)
        } catch (err: any) {
            toast.error("Dashboard ma'lumotlarini yuklashda xatolik")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const existingToken = localStorage.getItem("token")
        const userRole = localStorage.getItem("userRole")

        if (existingToken && userRole === "client") {
            fetchDashboardData()
            setInitialLoad(false)
            return
        }

        if (!window?.Telegram?.WebApp) {
            toast.error("Ilovani Telegram orqali oching")
            setLoading(false)
            return
        }

        const tg = window.Telegram.WebApp
        tg.ready()

        if (!tg.initData) {
            toast.error("Telegram initData topilmadi")
            setLoading(false)
            return
        }

        setInitData(tg.initData)
    }, [])

    useEffect(() => {
        if (!initData || !initialLoad) return

        const authenticateAndFetchData = async () => {
            try {
                setLoading(true)

                const authRes = await api.post("/auth", { initData })
                const { role, token } = authRes.data

                localStorage.clear()
                localStorage.setItem("token", token)
                localStorage.setItem("userRole", role)

                if (role === "client") {
                    toast.success("Muvaffaqiyatli kirdingiz!")

                    const dashRes = await api.get("/client/dashboard")
                    setDashboardData(dashRes.data)

                } else if (role === "driver") {
                    toast.success("Tizimga muvaffaqiyatli kirdingiz!")
                    navigate("/taxi")

                } else {
                    toast.error("Noma'lum foydalanuvchi roli")
                }

            } catch (err: any) {
                toast.error(
                    err?.response?.data?.message || "Avtorizatsiyada xatolik"
                )
            } finally {
                setLoading(false)
                setInitialLoad(false)
            }
        }

        authenticateAndFetchData()
    }, [initData])


    if (loading && !dashboardData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 animate-fade-in">
                <div className="relative w-40 h-20">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-[moveCar_3s_linear_infinite]">
                        <Car className="h-12 w-12 text-yellow-500"/>
                    </div>
                    <div className="absolute bottom-0 w-full h-1 bg-gray-200 rounded">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50 animate-pulse"></div>
                    </div>
                </div>
                <p className="text-lg font-medium text-muted-foreground">Yuklanmoqda...</p>
                <Loader2 className="h-6 w-6 text-primary animate-spin"/>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Bosh sahifa</h1>
                <p className="text-muted-foreground">Sizning buyurtmalar statistikasi</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-0 shadow-card-custom">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Car className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">
                                    {dashboardData?.orders_count || '0'}
                                </p>
                                <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-card-custom">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CircleDollarSign className="h-6 w-6 text-green-600"/>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">
                                    {formatPrice(dashboardData?.balance || 0)} so'm
                                </p>
                                <p className="text-sm text-muted-foreground">Balans</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-card-custom">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Coins className="h-6 w-6 text-blue-600"/>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">
                                    {formatPrice(dashboardData?.points || 0)}
                                </p>
                                <p className="text-sm text-muted-foreground">Ball</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-0 shadow-card-custom">
                <CardHeader>
                    <CardTitle>Tezkor harakatlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button 
                            className="h-auto py-4 flex-col gap-2" 
                            onClick={() => navigate('/order')}
                        >
                            <Car className="h-5 w-5"/>
                            Yangi buyurtma
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-auto py-4 flex-col gap-2"
                            onClick={() => navigate('/orders')}
                        >
                            <Clock className="h-5 w-5"/>
                            Buyurtmalar
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-auto py-4 flex-col gap-2"
                            onClick={() => navigate('/balance')}
                        >
                            <DollarSign className="h-5 w-5"/>
                            Balans
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-auto py-4 flex-col gap-2"
                            onClick={() => navigate('/discounts')}
                        >
                            <TrendingUp className="h-5 w-5"/>
                            Chegirmalar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard