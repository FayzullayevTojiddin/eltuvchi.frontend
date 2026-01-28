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
    Gift
} from 'lucide-react'
import {toast} from 'react-hot-toast'
import {ConfirmActionDialog} from '@/components/ConfirmActionDialog'
import api from "@/lib/api.ts"

const MarketPage = () => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [purchasedItems, setPurchasedItems] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = () => {
        try {
            setLoading(true)
            api.get('/client/market').then((res) => {
                console.log(res.data)
                setProducts(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error('Xatolik yuz berdi!')
            }).finally(() => {
                setLoading(false)
            })
        } catch (e) {
            console.log(e)
            toast.error('Xatolik yuz berdi!')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleProductClick = (product: any) => {
        setSelectedProduct(product)
        setShowConfirmDialog(true)
    }

    const confirmPurchase = () => {
        try {
            if (selectedProduct) {
                const requestData = {
                    discount_id: selectedProduct.id
                }

                setLoading(true)
                api.post('/client/market', requestData).then((res) => {
                    console.log(res.data)
                    toast.success('Mahsulot muvaffaqiyatli sotib olindi!')
                    fetchProducts()
                }).catch((err) => {
                    console.log(err.response?.data?.error)
                    toast.error(err.response?.data?.error || 'Xatolik yuz berdi!')
                }).finally(() => {
                    setLoading(false)
                })
            }
            setShowConfirmDialog(false)
            setSelectedProduct(null)
        } catch (e) {
            console.log(e)
            toast.error('Xatolik yuz berdi!')
            setLoading(false)
        }
    }

    const reorderItem = (item: any) => {
        setSelectedProduct({
            id: item.id,
            title: item.title || item.name,
            points: item.points || item.price,
            description: item.description,
            icon: item.icon
        })
        setShowConfirmDialog(true)
    }

    const truncateText = (text: string, maxLength: number) => {
        if (!text) return ''
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto px-2 sm:px-4 max-w-7xl py-4 sm:py-6">
                <div className="space-y-4 sm:space-y-6">
                    <div className="text-center space-y-1 sm:space-y-2">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Market</h1>
                        <p className="text-xs sm:text-sm text-slate-400">Foydali mahsulotlar va chegirmalar</p>
                    </div>

                    <Tabs defaultValue="products" className="w-full">
                        <TabsList className="grid grid-cols-1 gap-2 bg-slate-800/50 p-1 h-auto mb-3 sm:mb-4">
                            <TabsTrigger 
                                value="products" 
                                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 border border-slate-700 py-2 sm:py-2.5 text-xs sm:text-sm"
                            >
                                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                                Mahsulotlar ({products.length})
                            </TabsTrigger>
                            <TabsTrigger 
                                value="purchased" 
                                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 border border-slate-700 py-2 sm:py-2.5 text-xs sm:text-sm"
                            >
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                                Xaridlar tarixi ({purchasedItems.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="products" className="space-y-4 sm:space-y-6">
                            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {products.length === 0 ? (
                                    <div className="col-span-full text-center py-8 sm:py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                                        <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-2 sm:mb-3"/>
                                        <p className="text-slate-400 text-sm sm:text-base">Hozircha mahsulotlar yo'q</p>
                                    </div>
                                ) : (
                                    products.map((product) => (
                                        <Card key={product.id} className="overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:shadow-xl transition-all group">
                                            <div className="relative aspect-square bg-slate-900 overflow-hidden">
                                                {product.icon || product.image ? (
                                                    <img 
                                                        src={product.icon || product.image} 
                                                        alt={product.title || 'Mahsulot'}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                                        <Package className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400"/>
                                                    </div>
                                                )}
                                            </div>
                                            <CardContent className="p-3 sm:p-4 space-y-2">
                                                <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2">
                                                    <span className="inline sm:hidden">{truncateText(product.title || 'Mahsulot', 25)}</span>
                                                    <span className="hidden sm:inline">{product.title || 'Mahsulot'}</span>
                                                </h3>
                                                {product.description && (
                                                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">{product.description}</p>
                                                )}
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"/>
                                                    <span className="text-xs sm:text-sm text-slate-300">5.0</span>
                                                </div>
                                                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-2.5 sm:p-3 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs sm:text-sm text-yellow-200">Narxi:</span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"/>
                                                            <span className="text-base sm:text-lg font-bold text-yellow-400">
                                                                {product.points || 0}
                                                            </span>
                                                            <span className="text-xs sm:text-sm text-yellow-200">ball</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleProductClick(product)}
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xs sm:text-sm min-h-[36px]"
                                                    disabled={loading}
                                                >
                                                    <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2"/>
                                                    Sotib olish
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="purchased" className="space-y-4">
                            {purchasedItems.length > 0 ? (
                                purchasedItems.map((item) => (
                                    <Card key={item.id} className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                                        <CardContent className="p-3 sm:p-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-lg flex-shrink-0 overflow-hidden">
                                                        {item.icon ? (
                                                            <img 
                                                                src={item.icon} 
                                                                alt={item.title || item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Package className="h-6 w-6 text-slate-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-white text-sm sm:text-base truncate">
                                                            {item.title || item.name}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm text-slate-400">
                                                            Xarid sanasi: {item.purchaseDate}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs whitespace-nowrap">
                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                                Yetkazildi
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                                    <span className="font-bold text-green-400 text-sm sm:text-base whitespace-nowrap">
                                                        {item.points || item.price} ball
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => reorderItem(item)}
                                                        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 text-xs sm:text-sm min-h-[36px]"
                                                        disabled={loading}
                                                    >
                                                        <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                                                        Qayta sotib olish
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card className="border-slate-700 bg-slate-800/50">
                                    <CardContent className="p-6 sm:p-8 text-center">
                                        <Package className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-2 sm:mb-3"/>
                                        <p className="text-slate-400 text-sm sm:text-base">Xarid qilingan mahsulotlar mavjud emas</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>

                    <ConfirmActionDialog
                        open={showConfirmDialog}
                        onOpenChange={setShowConfirmDialog}
                        title="Mahsulotni sotib olish"
                        description={`${selectedProduct?.title || selectedProduct?.name} mahsulotini ${selectedProduct?.points || selectedProduct?.price} ballga sotib olmoqchimisiz?`}
                        actionText="Sotib olish"
                        onConfirm={confirmPurchase}
                    />
                </div>
            </div>
        </div>
    )
}

export default MarketPage