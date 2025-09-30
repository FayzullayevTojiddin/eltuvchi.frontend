import {useEffect, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {Percent, Gift, Star, Clock, Award, ShoppingBag} from "lucide-react"
import {useNavigate} from "react-router-dom"
import api from "@/lib/api.ts";
import toast from "react-hot-toast"

const DiscountsPage = () => {
    const navigate = useNavigate()
    const [discounts, setDiscounts] = useState([])

    useEffect(() => {
        api.get('/client/my_discounts').then((res) => {
            console.log(res?.data)
            setDiscounts(res.data)
        }).catch((err) => {
            console.log(err)
            toast.error("Xatolik yuz berdi!")
        })
    }, []);

    // Mock user discounts data
    const userDiscounts = [
        {
            id: "1",
            title: "25% chegirma",
            description: "Keyingi buyurtmaga 25% chegirma",
            percentage: 25,
            isUsed: false,
            expiryDate: "2025-02-15",
            type: "general"
        },
        {
            id: "2",
            title: "10% chegirma",
            description: "Har qanday buyurtmaga 10% chegirma",
            percentage: 10,
            isUsed: false,
            expiryDate: "2025-02-28",
            type: "general"
        },
        {
            id: "3",
            title: "15% chegirma",
            description: "Uzoq masofa uchun 15% chegirma",
            percentage: 15,
            isUsed: true,
            expiryDate: "2025-01-25",
            type: "distance"
        },
        {
            id: "4",
            title: "Birinchi buyurtma",
            description: "Birinchi buyurtmaga 30% chegirma",
            percentage: 30,
            isUsed: true,
            expiryDate: "2025-01-20",
            type: "first_order"
        }
    ]

    const availableDiscounts = userDiscounts.filter(d => !d.isUsed)
    const usedDiscounts = userDiscounts.filter(d => d.isUsed)

    const getDiscountIcon = (type: string) => {
        switch (type) {
            case 'first_order':
                return <Gift className="h-5 w-5"/>
            case 'distance':
                return <Star className="h-5 w-5"/>
            default:
                return <Percent className="h-5 w-5"/>
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('uz-UZ')
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Chegirmalar</h1>
                <p className="text-muted-foreground">Mavjud va ishlatilgan chegirmalaringiz</p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Gift className="h-5 w-5 text-green-600"/>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{discounts.length}</p>
                                <p className="text-sm text-muted-foreground">Mavjud</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Award className="h-5 w-5 text-primary"/>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{discounts.length}</p>
                                <p className="text-sm text-muted-foreground">Ishlatilgan</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/*<Card>*/}
                {/*    <CardContent className="p-4">*/}
                {/*        <div className="flex items-center gap-3">*/}
                {/*            <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">*/}
                {/*                <Percent className="h-5 w-5 text-orange-600"/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p className="text-2xl font-bold">{Math.max(...userDiscounts.map(d => d.percentage))}%</p>*/}
                {/*                <p className="text-sm text-muted-foreground">Eng katta</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
            </div>

            {/* Available Discounts */}
            {discounts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gift className="h-5 w-5 text-green-600"/>
                            Mavjud chegirmalar ({discounts.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {discounts.map((discount) => (
                            <div key={discount.id}
                                 className="p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            {getDiscountIcon(discount.type)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{discount.title}</p>
                                            <p className="text-sm text-muted-foreground">{discount.description}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="h-3 w-3 text-muted-foreground"/>
                                                <span className="text-xs text-muted-foreground">
                          Amal qiladi: {formatDate(discount.expiryDate)}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary"
                                           className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        -{discount.value}%
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Used Discounts */}
            {discounts.length > 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-muted-foreground"/>
                            Jami chegirmalar ({usedDiscounts.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {discounts.map((discount) => (
                            <div key={discount.id} className="p-4 border rounded-lg bg-muted/30 opacity-60">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                            {getDiscountIcon(discount.type)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{discount.title}</p>
                                            <p className="text-sm text-muted-foreground">{discount.description}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="h-3 w-3 text-muted-foreground"/>
                                                <span className="text-xs text-muted-foreground">
                                        Ishlatilgan: {formatDate(discount.expiryDate)}
                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="outline">
                                        -{discount.percentage}%
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        Chegirma mavjud emas
                    </CardContent>
                </Card>
            )}


            {/* No discounts available */}
            {availableDiscounts.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4"/>
                        <h3 className="text-lg font-medium mb-2">Hozircha chegirmalaringiz yo'q</h3>
                        <p className="text-muted-foreground mb-6">
                            Yangi chegirmalar olish uchun marketga tashrif buyuring
                        </p>
                        <Button onClick={() => navigate('/market')} className="gap-2">
                            <ShoppingBag className="h-4 w-4"/>
                            Marketga o'tish
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default DiscountsPage