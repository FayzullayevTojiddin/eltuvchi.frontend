import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {
    Car,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp,
    Calendar,
    DollarSign,
    CircleDollarSign,
    Coins,
    Loader2
} from "lucide-react"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import api from "@/lib/api.ts";
import axios from "axios";

const Dashboard = () => {
    const [initData, setInitData] = useState<any>(null);
    const navigate = useNavigate()
    const [dashboardData, setDashboardData] = useState<any>(null)

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        try{
            if (window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                setInitData(tg.initDataUnsafe);

                tg.ready();
            }
        }catch (e) {
            console.log(e)
            toast.error(e.message)
        }
    }, []);


    useEffect(() => {
        if (initData) {
            toast.error(initData.message)
        }
    }, []);
    useEffect(() => {
        try {
            setLoading(true)
            axios.post(api.apiUrl + "/auth", {
                initData: "query_id=AAHs9QY3AwAAAOz1BjcIcR5F&user=%7B%22id%22%3A7365653996%2C%22first_name%22%3A%22Tojiddin%22%2C%22last_name%22%3A%22Fayzullaev%22%2C%22username%22%3A%22Azamat_akoooo%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F5SM6uSRMAo5wYgVYHpj2nefym3PrJayQGjr54-XcEE1WIk7Oym0qPaW4NhHZxIfx.svg%22%7D&auth_date=1754389322&signature=gE_DFjG4awAWY6CC-qoH7KTSiGbjAvwzhcjcajGSrlLlLh_07DLdtyHL4Q3TkIewRjij3RnyVu7GAn7emUG-DA&hash=ee49e391e0774fc96dad457492cc1321549864cd72de4bba2aca1ad0a462ee3b"
            }).then((res) => {
                console.log(res, res?.data)
                if (res?.status === 200) {
                    if (res?.data?.role == 'client') {
                        localStorage.clear()
                        localStorage.setItem('userRole', 'client')
                        localStorage.setItem('token', res?.data?.token)
                        toast.success("Muvaffaqiyatli kirdingiz!")
                    } else if (res?.data?.role == "driver") {
                        localStorage.clear()
                        localStorage.setItem('userRole', 'driver')
                        localStorage.setItem('token', res?.data?.token)
                        navigate('/taxi')
                        toast.success("Tizimga muvaffaqiyatli kirdingiz!")
                        return
                    } else {
                        toast.error("Kirishda xatolik yuz berdi!")
                        setLoading(true)
                    }

                    api.get('/client/dashboard').then((res) => {
                        console.log(res?.data)
                        setDashboardData(res.data)
                    }).catch((err) => {
                        console.log(err)
                        toast.error("Xatolik yuz berdi")
                    })


                }
            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi")
        } finally {
            setLoading(true)
        }
    }, [])


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 animate-fade-in">
                {/* Mashina yurayotgandek effekt */}
                <div className="relative w-40 h-20">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-[moveCar_3s_linear_infinite]">
                        <Car className="h-12 w-12 text-yellow-500"/>
                    </div>
                    <div className="absolute bottom-0 w-full h-1 bg-gray-200 rounded">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50 animate-pulse"></div>
                    </div>
                </div>
                <p className="text-lg font-medium text-muted-foreground">Sayt yuklanmoqda...</p>

                {/* Agar xohlasangiz oddiy spinner ham qo‘shib qo‘ying */}
                <Loader2 className="h-6 w-6 text-primary animate-spin"/>
            </div>
        );
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
                                <p className="text-2xl font-bold">{dashboardData?.orders_count || '0'}</p>
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
                                <p className="text-2xl font-bold">{dashboardData?.balance || "0"} so'm</p>
                                <p className="text-sm text-muted-foreground">To'lov</p>
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
                                <p className="text-2xl font-bold">{dashboardData?.points || "0"}</p>
                                <p className="text-sm text-muted-foreground">Ball</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/*<Card className="border-0 shadow-card-custom">*/}
                {/*    <CardContent className="p-6">*/}
                {/*        <div className="flex items-center gap-3">*/}
                {/*            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">*/}
                {/*                <XCircle className="h-6 w-6 text-red-600"/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p className="text-2xl font-bold">{stats.cancelledOrders}</p>*/}
                {/*                <p className="text-sm text-muted-foreground">Bekor qilingan</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
            </div>

            {/* Additional Statistics */}
            {/*<div className="grid md:grid-cols-2 gap-4">*/}
            {/*    <Card className="border-0 shadow-card-custom">*/}
            {/*        <CardContent className="p-6">*/}
            {/*            <div className="flex items-center gap-3">*/}
            {/*                <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">*/}
            {/*                    <DollarSign className="h-6 w-6 text-orange-600"/>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <p className="text-2xl font-bold">{stats.totalSpent.toLocaleString()} so'm</p>*/}
            {/*                    <p className="text-sm text-muted-foreground">Jami sarflangan</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}

            {/*    <Card className="border-0 shadow-card-custom">*/}
            {/*        <CardContent className="p-6">*/}
            {/*            <div className="flex items-center gap-3">*/}
            {/*                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">*/}
            {/*                    <Calendar className="h-6 w-6 text-purple-600"/>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <p className="text-2xl font-bold">{stats.thisMonthOrders}</p>*/}
            {/*                    <p className="text-sm text-muted-foreground">Shu oy</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</div>*/}

            {/* Quick Actions */}
            <Card className="border-0 shadow-card-custom">
                <CardHeader>
                    <CardTitle>Tezkor harakatlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button className="h-auto py-4 flex-col gap-2" onClick={() => navigate('/order')}>
                            <Car className="h-5 w-5"/>
                            Yangi buyurtma
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2"
                                onClick={() => navigate('/orders')}>
                            <Clock className="h-5 w-5"/>
                            Buyurtmalar
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2"
                                onClick={() => navigate('/balance')}>
                            <DollarSign className="h-5 w-5"/>
                            Balans
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2"
                                onClick={() => navigate('/discounts')}>
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
