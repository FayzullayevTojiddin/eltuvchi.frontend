import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {DollarSign, Check, User, TrendingUp, Clock, Car, Star, MapPin, Calendar, Filter, Loader2} from "lucide-react"
import {useEffect, useState} from "react"
import {toast} from "react-hot-toast";
import api from "@/lib/api.ts";

const TaxiDashboard = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [dashboardData, setDashboardData] = useState<any>(null)

    // get dashboard data from API
    useEffect(() => {
        try {
            setLoading(true)
            api.get('/driver/dashboard')
                .then((res) => {
                    console.log(res.data);
                    setDashboardData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Xatolik yuz berdi!");
                });
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi!");
        }finally {
            setLoading(false)
        }
    }, []);

    const formatCurrency = (value: number | string) => {
        if (!value) return "0";
        return new Intl.NumberFormat("ru-RU").format(Number(value));
    };


    const stats = [
        {
            title: "Umumiy daromat",
            value: formatCurrency(dashboardData?.total_income) || "0",
            unit: "so'm",
            icon: DollarSign,
            change: "+12%"
        },
        {
            title: "Bajarilgan buyurtmalar",
            value: dashboardData?.completed_orders_count || "0",
            unit: "ta",
            icon: Check,
            change: "+8%"
        },
        {title: "Reyting", value: dashboardData?.average_rating || "0", unit: "⭐", icon: Star, change: "+0.1"},
        // {title: "Haftalik daromad", value: "2,850,000", unit: "so'm", icon: TrendingUp, change: "+15%"},
        // {title: "Umumiy safar", value: "1,240", unit: "km", icon: MapPin, change: "+120km"},
        // {title: "Onlayn vaqt", value: "8.5", unit: "soat", icon: Clock, change: "+2.1h"},
    ]

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 animate-fade-in">
                {/* Mashina yurayotgandek effekt */}
                <div className="relative w-40 h-16">
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
                <h1 className="text-3xl font-bold mb-2">Haydovchi Paneli</h1>
                <p className="text-muted-foreground">Buyurtmalarni boshqaring va daromad qiling</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-gradient-card border-0 shadow-card-custom">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value} {stat.unit}</p>
                                </div>
                                <stat.icon className="h-8 w-8 text-primary"/>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Earnings Filter */}
            {/*<Card className="bg-gradient-card border-0 shadow-card-custom">*/}
            {/*    <CardHeader>*/}
            {/*        <CardTitle className="flex items-center gap-2">*/}
            {/*            <Filter className="h-5 w-5"/>*/}
            {/*            Daromad filtri*/}
            {/*        </CardTitle>*/}
            {/*        <CardDescription>Sanani tanlang va daromadni ko'ring</CardDescription>*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent className="space-y-4">*/}
            {/*        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">*/}
            {/*            {[*/}
            {/*                {value: "today", label: "Bugun"},*/}
            {/*                {value: "yesterday", label: "Kecha"},*/}
            {/*                {value: "week", label: "Bu hafta"},*/}
            {/*                {value: "month", label: "Bu oy"}*/}
            {/*            ].map((option) => (*/}
            {/*                <Button*/}
            {/*                    key={option.value}*/}
            {/*                    variant={dateFilter === option.value ? "default" : "outline"}*/}
            {/*                    size="sm"*/}
            {/*                    onClick={() => setDateFilter(option.value)}*/}
            {/*                >*/}
            {/*                    {option.label}*/}
            {/*                </Button>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*        <div className="flex gap-2">*/}
            {/*            <Button*/}
            {/*                variant={dateFilter === "custom" ? "default" : "outline"}*/}
            {/*                size="sm"*/}
            {/*                onClick={() => setDateFilter("custom")}*/}
            {/*            >*/}
            {/*                Boshqa sana*/}
            {/*            </Button>*/}
            {/*            {dateFilter === "custom" && (*/}
            {/*                <Input*/}
            {/*                    type="date"*/}
            {/*                    value={selectedDate}*/}
            {/*                    onChange={(e) => setSelectedDate(e.target.value)}*/}
            {/*                    className="flex-1"*/}
            {/*                />*/}
            {/*            )}*/}
            {/*        </div>*/}

            {/*        <div className="p-4 bg-muted rounded-lg">*/}
            {/*            <div className="text-center">*/}
            {/*                <p className="text-sm text-muted-foreground">{filteredEarnings.period} daromadi</p>*/}
            {/*                <p className="text-2xl font-bold text-primary">{filteredEarnings.amount.toLocaleString()} so'm</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            {/* Quick Actions */}
            {/*<Card className="bg-gradient-card border-0 shadow-card-custom">*/}
            {/*    <CardContent className="p-6">*/}
            {/*        <div className="flex gap-4">*/}
            {/*            <Button onClick={handleWithdrawMoney} variant="default" className="flex-1">*/}
            {/*                <DollarSign className="h-4 w-4 mr-2"/>*/}
            {/*                Pul yechish*/}
            {/*            </Button>*/}
            {/*            <Button variant="outline" className="flex-1">*/}
            {/*                <User className="h-4 w-4 mr-2"/>*/}
            {/*                Profil sozlamalari*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            {/* Weekly Earnings Chart */}
            {/*<Card className="bg-gradient-card border-0 shadow-card-custom">*/}
            {/*    <CardHeader>*/}
            {/*        <CardTitle>Haftalik daromad</CardTitle>*/}
            {/*        <CardDescription>So'nggi hafta ko'rsatkichlari</CardDescription>*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent>*/}
            {/*        <div className="space-y-4">*/}
            {/*            {weeklyEarnings.map((day, index) => (*/}
            {/*                <div key={index} className="flex items-center justify-between">*/}
            {/*                    <span className="text-sm font-medium">{day.day}</span>*/}
            {/*                    <div className="flex items-center gap-2">*/}
            {/*                        <div className="w-32 bg-muted rounded-full h-2">*/}
            {/*                            <div*/}
            {/*                                className="bg-primary h-2 rounded-full transition-all duration-300"*/}
            {/*                                style={{width: `${(day.amount / 700000) * 100}%`}}*/}
            {/*                            ></div>*/}
            {/*                        </div>*/}
            {/*                        <span className="text-sm font-bold min-w-24 text-right">*/}
            {/*        {day.amount.toLocaleString()} so'm*/}
            {/*      </span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            {/* Recent Trips */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                    <CardTitle>So'nggi safarlar</CardTitle>
                    <CardDescription>Yaqinda bajarilgan buyurtmalar</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {dashboardData?.recent_orders && dashboardData.recent_orders.length > 0 ? (
                            dashboardData.recent_orders.map((trip) => (
                                <div
                                    key={trip.id}
                                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-primary"/>
                                        <div>
                                            <p className="font-medium">
                                                {trip.route?.from?.name} → {trip.route?.to?.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                #{trip.id} • {trip.created_at}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-primary">
                                            {new Intl.NumberFormat("uz-UZ").format(trip.price_order)} so'm
                                        </p>
                                        <p className="text-sm text-success">Yakunlandi</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">Hech qanday safar topilmadi</p>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default TaxiDashboard