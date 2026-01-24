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
    RefreshCw,
    Coins
} from 'lucide-react'
import {toast} from 'react-hot-toast'
import {ConfirmActionDialog} from '@/components/ConfirmActionDialog'
import api from "@/lib/api.ts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const TaxiMarketPage = () => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const [marketData, setMarketData] = useState([])
    const [myMarketData, setMyMarketData] = useState([])

    const fetchData = () => {
        api.get('/driver/market').then((res) => {
            setMarketData(res.data)
        }).catch((err) => {
            console.log(err)
            toast.error("Mahsulotlarni yuklashda xatolik!")
        })

        api.get('/driver/my_products').then((res) => {
            setMyMarketData(res?.data)
        }).catch((err) => {
            console.log(err)
            toast.error("Xaridlar tarixini yuklashda xatolik!")
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleProductClick = (product: any) => {
        setSelectedProduct(product)
        setShowConfirmDialog(true)
    }

    const confirmPurchase = () => {
        if (!selectedProduct) return
        
        setLoading(true)
        
        api.post(`/driver/market/${selectedProduct?.id}`, {
            product: selectedProduct,
        }).then((res) => {
            toast.success("Mahsulot muvaffaqiyatli sotib olindi!")
            setShowConfirmDialog(false)
            setSelectedProduct(null)
            fetchData()
        }).catch((err) => {
            console.log(err)
            if (err?.response?.data?.error) {
                toast.error(err.response.data.error)
            } else {
                toast.error("Xatolik yuz berdi!")
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const reorderItem = (item: any) => {
        setSelectedProduct(item)
        setShowConfirmDialog(true)
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return "-"
        const date = new Date(dateString)
        return date.toLocaleDateString("uz-UZ", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Market</CardTitle>
                    <CardDescription>Haydovchilar uchun foydali mahsulotlar</CardDescription>
                </CardHeader>
                <CardContent>
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

                        <TabsContent value="products" className="space-y-6 mt-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {marketData.length === 0 ? (
                                    <div className="col-span-full text-center py-12 border rounded-lg">
                                        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                                        <p className="text-lg font-medium text-muted-foreground">
                                            Mahsulotlar topilmadi
                                        </p>
                                    </div>
                                ) : (
                                    marketData.map((product) => (
                                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                                <Package className="h-20 w-20 text-slate-400"/>
                                            </div>
                                            <CardContent className="p-4 space-y-3">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {product.description || "Mahsulot haqida ma'lumot"}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400"/>
                                                    <span className="text-sm font-medium">{product.rating || 4.5}</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-between pt-2 border-t">
                                                    <div className="flex items-center gap-1">
                                                        <Coins className="h-5 w-5 text-amber-500"/>
                                                        <span className="text-xl font-bold text-amber-600">
                                                            {product.points}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">COIN</span>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleProductClick(product)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <ShoppingCart className="h-4 w-4"/>
                                                        Sotib olish
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="purchased" className="space-y-6 mt-6">
                            <div className="space-y-4">
                                {myMarketData.length === 0 ? (
                                    <div className="text-center py-12 border rounded-lg">
                                        <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                                        <p className="text-lg font-medium text-muted-foreground mb-2">
                                            Hozircha xaridlar yo'q
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Sizning xaridlaringiz shu yerda ko'rinadi
                                        </p>
                                    </div>
                                ) : (
                                    myMarketData.map((item) => (
                                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-4 space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Package className="h-8 w-8 text-slate-400"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-lg mb-1">
                                                            {item.title || "Mahsulot nomi"}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {item.description || "Ma'lumot yo'q"}
                                                        </p>
                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4"/>
                                                                <span>{formatDate(item.created_at)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Coins className="h-4 w-4 text-amber-500"/>
                                                                <span className="font-medium text-amber-600">
                                                                    {item.points || "0"} COIN
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {item.status ? (
                                                                <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                                                                    <CheckCircle className="h-3 w-3 mr-1"/>
                                                                    Yetkazildi
                                                                </Badge>
                                                            ) : (
                                                                <Badge variant="outline" className="text-amber-600 border-amber-600">
                                                                    <Clock className="h-3 w-3 mr-1"/>
                                                                    Kutilmoqda
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => reorderItem(item)}
                                                    className="w-full flex items-center justify-center gap-2"
                                                >
                                                    <RefreshCw className="h-4 w-4"/>
                                                    Qayta sotib olish
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>Mahsulotni sotib olish</DialogTitle>
                        <DialogDescription>
                            Mahsulot tafsilotlarini ko'rib chiqing
                        </DialogDescription>
                    </DialogHeader>
                    
                    {selectedProduct && (
                        <div className="space-y-4">
                            <div className="bg-white border border-slate-200 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <Package className="h-8 w-8 text-slate-400"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400"/>
                                            <span className="text-sm font-medium">{selectedProduct.rating || 4.5}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{selectedProduct.title}</h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    {selectedProduct.description || "Mahsulot haqida ma'lumot"}
                                </p>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                    <span className="text-sm text-slate-600">Narx:</span>
                                    <div className="flex items-center gap-1">
                                        <Coins className="h-5 w-5 text-amber-500"/>
                                        <span className="text-2xl font-bold text-slate-900">
                                            {selectedProduct.points}
                                        </span>
                                        <span className="text-sm text-slate-500">COIN</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                                <p className="text-sm text-amber-900">
                                    <span className="font-medium">Diqqat:</span> Sotib olish uchun hisobingizdan 
                                    <strong> {selectedProduct.points} COIN</strong> yechib olinadi.
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 sm:gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setShowConfirmDialog(false)}
                            disabled={loading}
                            className="flex-1"
                        >
                            Bekor qilish
                        </Button>
                        <Button 
                            onClick={confirmPurchase}
                            disabled={loading}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2"/>
                            {loading ? "Kutilmoqda..." : "Sotib olish"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TaxiMarketPage