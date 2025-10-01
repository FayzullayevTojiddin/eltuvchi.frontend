import React, {useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {
    ShoppingCart,
    Star,
    Package,
    Clock,
    CheckCircle,
    RefreshCw
} from 'lucide-react'
import {toast} from 'react-hot-toast'
import {ConfirmActionDialog} from '@/components/ConfirmActionDialog'
import api from "@/lib/api.ts";

const TaxiMarketPage = () => {
    // const [cart, setCart] = useState<any[]>([])
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)

    const [marketData, setMarketData] = useState([])
    const [myMarketData, setMyMarketData] = useState([])

    // get market data from api
    useEffect(() => {
        try {
            api.get('/driver/market').then((res) => {
                console.log(res.data)
                setMarketData(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi!")
            })

            api.get('/driver/my_products').then((res) => {
                console.log('my orders', res?.data)
                setMyMarketData(res?.data)
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi!")
            })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi!")
        }
    }, []);


    const [purchasedItems, setPurchasedItems] = useState([
        {
            id: 1,
            name: 'Avtomobil tozalagichi',
            price: 25000,
            purchaseDate: '2024-01-10',
            status: 'delivered'
        },
        {
            id: 2,
            name: 'Telefon ushlagichi',
            price: 35000,
            purchaseDate: '2024-01-05',
            status: 'delivered'
        }
    ])

    // Market mahsulotlari
    const products = [
        {
            id: 1,
            name: 'Avtomobil tozalagichi',
            price: 25000,
            rating: 4.8,
            image: '/placeholder.svg',
            description: 'Yuqori sifatli avtomobil ichki qismini tozalash uchun'
        },
        {
            id: 2,
            name: 'Telefon ushlagichi',
            price: 35000,
            rating: 4.9,
            image: '/placeholder.svg',
            description: 'Telefon uchun mustahkam va ishonchli ushlagich'
        },
        {
            id: 3,
            name: 'Avtomobil parfyumi',
            price: 15000,
            rating: 4.7,
            image: '/placeholder.svg',
            description: 'Yoqimli hid bilan avtomobilingizni tozalang'
        }
    ]

    const handleProductClick = (product: any) => {
        setSelectedProduct(product)
        setShowConfirmDialog(true)
    }

    const confirmPurchase = () => {
        // if (selectedProduct) {
        //     const newPurchase = {
        //         ...selectedProduct,
        //         purchaseDate: new Date().toISOString().split('T')[0],
        //         status: 'delivered'
        //     }
        //     setPurchasedItems([newPurchase, ...purchasedItems])
        //     toast.success('Mahsulot muvaffaqiyatli sotib olindi!')
        // }
        // setShowConfirmDialog(false)
        // setSelectedProduct(null)

        try {
            api.post(`/driver/market/${selectedProduct?.id}`, {
                product: selectedProduct,
            }).then((res) => {
                console.log(res.data)
                toast.success("Mahsulot sotib olindi!")
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.error)
            })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi!")
        }
    }

    const reorderItem = (item: any) => {
        setSelectedProduct({
            id: item.id,
            name: item.name,
            price: item.price,
            rating: 4.8,
            image: '/placeholder.svg',
            description: 'Qayta buyurtma'
        })
        setShowConfirmDialog(true)
    }

    return (
        <div className="space-y-6 p-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Market</h1>
                <p className="text-muted-foreground">Haydovchilar uchun foydali mahsulotlar</p>
            </div>

            <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products" className="flex items-center gap-2">
                        <Package className="h-4 w-4"/>
                        Mahsulotlar
                    </TabsTrigger>
                    <TabsTrigger value="purchased" className="flex items-center gap-2">
                        <Clock className="h-4 w-4"/>
                        Xaridlar tarixi
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {marketData.length === 0 ? (
                            <p className="col-span-full text-center text-muted-foreground">
                                Mahsulotlar topilmadi
                            </p>
                        ) : (
                            marketData.map((product) => (
                                <Card key={product.id} className="overflow-hidden">
                                    <div className="aspect-square bg-muted flex items-center justify-center">
                                        <Package className="h-12 w-12 text-muted-foreground"/>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="space-y-2">
                                            <h3 className="font-semibold">{product.title}</h3>
                                            <p className="text-sm text-muted-foreground">{product.description}</p>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                                <span className="text-sm">{product.rating || 4}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <span className="text-lg font-bold">
                                                {product.points} COIN
                                              </span>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleProductClick(product)}
                                                    className="flex items-center gap-2"
                                                >
                                                    <ShoppingCart className="h-4 w-4"/>
                                                    Sotib olish
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                </TabsContent>

                <TabsContent value="purchased" className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-4">
                            {myMarketData.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    <p className="text-lg font-medium">📭 Hozircha hech qanday ma'lumot mavjud emas</p>
                                    <p className="text-sm">Sizning xaridlaringiz shu yerda ko‘rinadi</p>
                                </div>
                            ) : (
                                myMarketData.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-muted-foreground"/>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{item.title || "Mahsulot nomi"}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            Xarid sanasi: {item.created_at}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Qo'shimcha: {item.description || "Qisqacha ma'lumot yo'q"}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="outline" className="text-green-600 border-green-600">
                                                                <CheckCircle className="h-3 w-3 mr-1"/>
                                                                Yetkazildi
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold">{item.points || "0"} point</span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => reorderItem(item)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <RefreshCw className="h-4 w-4"/>
                                                        Qayta sotib olish
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>

                    </div>
                </TabsContent>
            </Tabs>

            <ConfirmActionDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                title="Mahsulotni sotib olish"
                description={`${selectedProduct?.name} mahsulotini ${selectedProduct?.price} so'mga sotib olmoqchimisiz?`}
                actionText="Sotib olish"
                onConfirm={confirmPurchase}
            />
        </div>
    )
}

export default TaxiMarketPage
