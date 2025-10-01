import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Car, CheckCircle, XCircle, Clock, TrendingUp, Calendar, DollarSign, CircleDollarSign, Coins} from "lucide-react"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import api from "@/lib/api.ts";

const Dashboard = () => {
    const navigate = useNavigate()
    const [dashboardData, setDashboardData] = useState<any>(null)

    useEffect(() => {
        try {
            api.get('/client/dashboard').then((res) => {
                console.log(res?.data)
                setDashboardData(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi")
            })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi")
        }
    }, [])

    // Mock statistics data - replace with real API calls
    const stats = {
        totalOrders: 28,
        completedOrders: 22,
        cancelledOrders: 3,
        activeOrders: 3,
        totalSpent: 450000,
        thisMonthOrders: 8
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
