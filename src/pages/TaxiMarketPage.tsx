import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ShoppingCart, Package, Star, Check, Truck, AlertCircle, Gift} from "lucide-react"
import React, {useEffect, useState} from "react"
import toast from "react-hot-toast"
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
  const [products, setProducts] = useState([])
  const [myProducts, setMyProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [purchaseDialog, setPurchaseDialog] = useState({
    open: false,
    product: null
  })

  const fetchMarketData = () => {
    // Mavjud mahsulotlar
    api.get('/driver/market')
      .then((res) => {
        let productList = []
        
        if (Array.isArray(res.data)) {
          productList = res.data
        } else if (res.data && Array.isArray(res.data.data)) {
          productList = res.data.data
        }
        
        setProducts(productList)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Mahsulotlarni yuklashda xatolik yuz berdi")
      })

    // Mening mahsulotlarim
    api.get('/driver/my_products')
      .then((res) => {
        let myProductList = []
        
        if (Array.isArray(res.data)) {
          myProductList = res.data
        } else if (res.data && Array.isArray(res.data.data)) {
          myProductList = res.data.data
        }
        
        setMyProducts(myProductList)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Sizning mahsulotlaringizni yuklashda xatolik")
      })
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

  const showPurchaseDialog = (product) => {
    setPurchaseDialog({
      open: true,
      product: product
    })
  }

  const handlePurchaseProduct = () => {
    if (!purchaseDialog.product) return

    setLoading(true)
    
    api.post(`/driver/market/${purchaseDialog.product.id}`, {})
      .then((res) => {
        toast.success("Mahsulot muvaffaqiyatli sotib olindi!")
        setPurchaseDialog({open: false, product: null})
        fetchMarketData()
      })
      .catch((err) => {
        console.log(err?.response)
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        } else {
          toast.error("Xatolik yuz berdi!")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getStatusBadge = (status) => {
    if (status === true || status === 'active') {
      return <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs whitespace-nowrap">Faol</Badge>
    }
    return <Badge className="bg-red-500/20 text-red-400 border border-red-500/50 text-xs whitespace-nowrap">Nofaol</Badge>
  }

  const getDeliveryBadge = (delivered) => {
    if (delivered) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs whitespace-nowrap">
          <Check className="w-3 h-3 mr-1"/>
          Yetkazilgan
        </Badge>
      )
    }
    return (
      <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 text-xs whitespace-nowrap">
        <Truck className="w-3 h-3 mr-1"/>
        Yetkazilmoqda
      </Badge>
    )
  }

  const truncateText = (text, maxLength) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm border-0 rounded-none sm:rounded-lg">
          <CardHeader className="border-b border-slate-800 p-3 sm:p-4 md:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6"/>
              Market
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs sm:text-sm">
              Ball evaziga mahsulotlar sotib oling
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 md:p-4">
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="grid grid-cols-1 gap-2 bg-slate-800/50 p-1 h-auto mb-3 sm:mb-4">
                <TabsTrigger 
                  value="market" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 border border-slate-700 py-2 sm:py-2.5 text-xs sm:text-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                  Mavjud mahsulotlar ({products.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="my-products" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 border border-slate-700 py-2 sm:py-2.5 text-xs sm:text-sm"
                >
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                  Mening mahsulotlarim ({myProducts.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="market" className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-0.5">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Mavjud mahsulotlar</h3>
                  <p className="text-xs sm:text-sm text-slate-400">Ball evaziga mahsulot sotib oling</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {products.length === 0 ? (
                    <div className="col-span-full text-center py-8 sm:py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-2 sm:mb-3"/>
                      <p className="text-slate-400 text-sm sm:text-lg">Hozircha mahsulotlar yo'q</p>
                    </div>
                  ) : (
                    products.map((product) => (
                      <Card key={product.id} className="hover:shadow-xl transition-all border-slate-700 bg-slate-800/50 backdrop-blur-sm overflow-hidden group">
                        {product.icon_type && (
                          <div className="relative h-36 sm:h-48 bg-slate-900 overflow-hidden">
                            <img 
                              src={product.icon_type} 
                              alt={product.title || 'Mahsulot'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                              {getStatusBadge(product.status)}
                            </div>
                          </div>
                        )}
                        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                          <CardTitle className="text-sm sm:text-base md:text-lg text-white">
                            <span className="line-clamp-2">
                              <span className="inline sm:hidden">{truncateText(product.title || 'Mahsulot nomi', 25)}</span>
                              <span className="hidden sm:inline md:hidden">{truncateText(product.title || 'Mahsulot nomi', 35)}</span>
                              <span className="hidden md:inline">{product.title || 'Mahsulot nomi'}</span>
                            </span>
                          </CardTitle>
                          {product.description && (
                            <CardDescription className="text-slate-400 line-clamp-3 text-xs sm:text-sm mt-1">
                              {product.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6 pt-0">
                          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-3 sm:p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm text-yellow-200">Narxi:</span>
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"/>
                                <span className="text-lg sm:text-2xl font-bold text-yellow-400">
                                  {product.points || 0}
                                </span>
                                <span className="text-xs sm:text-sm text-yellow-200">ball</span>
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={() => showPurchaseDialog(product)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xs sm:text-sm min-h-[36px]"
                            disabled={loading || product.status !== true}
                          >
                            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                            Sotib olish
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-products" className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-0.5">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Mening mahsulotlarim</h3>
                  <p className="text-xs sm:text-sm text-slate-400">Sotib olingan mahsulotlar</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {myProducts.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <Package className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-2 sm:mb-3"/>
                      <p className="text-slate-400 text-sm sm:text-lg">Sizda hali mahsulotlar yo'q</p>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">Marketdan mahsulotlar sotib oling</p>
                    </div>
                  ) : (
                    myProducts.map((item) => {
                      const product = item.product || item
                      return (
                        <Card key={item.id} className="hover:shadow-xl transition-all border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                          <CardHeader className="pb-2 sm:pb-3 border-b border-slate-700 p-3 sm:p-6">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-sm sm:text-base md:text-lg text-white flex items-center gap-2">
                                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0"/>
                                  <span className="truncate">
                                    <span className="inline sm:hidden">{truncateText(product.title || 'Mahsulot', 15)}</span>
                                    <span className="hidden sm:inline md:hidden">{truncateText(product.title || 'Mahsulot', 25)}</span>
                                    <span className="hidden md:inline">{product.title || 'Mahsulot'}</span>
                                  </span>
                                </CardTitle>
                                {product.description && (
                                  <CardDescription className="text-slate-400 mt-1 line-clamp-2 text-xs sm:text-sm">
                                    {product.description}
                                  </CardDescription>
                                )}
                              </div>
                              {item.delivered !== undefined && getDeliveryBadge(item.delivered)}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-3 sm:pt-4 p-3 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              {product.icon_type && (
                                <div className="relative h-28 sm:h-32 bg-slate-900 rounded-lg overflow-hidden">
                                  <img 
                                    src={product.icon_type} 
                                    alt={product.title || 'Mahsulot'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              <div className="space-y-2 sm:space-y-3">
                                <div className="bg-yellow-500/10 border border-yellow-500/30 p-2.5 sm:p-3 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-yellow-200">Sarflangan ball:</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"/>
                                      <span className="text-base sm:text-lg font-bold text-yellow-400">{product.points || 0}</span>
                                    </div>
                                  </div>
                                </div>

                                {item.created_at && (
                                  <div className="text-[10px] sm:text-xs text-slate-400">
                                    Sotib olingan: {new Date(item.created_at).toLocaleDateString('uz-UZ', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Dialog open={purchaseDialog.open} onOpenChange={(open) => setPurchaseDialog({...purchaseDialog, open})}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 max-w-[calc(100%-2rem)] mx-4">
            <DialogHeader>
              <DialogTitle className="text-white text-base sm:text-lg">Mahsulotni tasdiqlash</DialogTitle>
              <DialogDescription className="text-slate-400 text-xs sm:text-sm">
                Mahsulotni sotib olishni tasdiqlaysizmi?
              </DialogDescription>
            </DialogHeader>
            
            {purchaseDialog.product && (
              <div className="space-y-3 sm:space-y-4">
                {purchaseDialog.product.image && (
                  <div className="relative h-40 sm:h-48 bg-slate-900 rounded-lg overflow-hidden">
                    <img 
                      src={purchaseDialog.product.image} 
                      alt={purchaseDialog.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-white mb-1.5 sm:mb-2 text-sm sm:text-base break-words">{purchaseDialog.product.name}</h3>
                  {purchaseDialog.product.description && (
                    <p className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3 break-words">{purchaseDialog.product.description}</p>
                  )}
                  
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-2.5 sm:p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-yellow-200">Narxi:</span>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"/>
                        <span className="text-lg sm:text-2xl font-bold text-yellow-400">
                          {purchaseDialog.product.points}
                        </span>
                        <span className="text-xs sm:text-sm text-yellow-200">ball</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-900/40 border border-amber-700/50 p-2.5 sm:p-3 rounded-lg">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 mt-0.5 flex-shrink-0"/>
                    <div className="text-xs sm:text-sm text-amber-100">
                      <p className="font-medium mb-0.5 sm:mb-1">Diqqat:</p>
                      <p className="break-words">Mahsulotni sotib olgandan keyin ballingizdan <strong>{purchaseDialog.product.points} ball</strong> yechib olinadi. Bu amalni bekor qilib bo'lmaydi.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setPurchaseDialog({...purchaseDialog, open: false})}
                disabled={loading}
                className="w-full sm:w-auto bg-slate-800 border-slate-700 text-white hover:bg-slate-700 text-xs sm:text-sm min-h-[36px]"
              >
                Bekor qilish
              </Button>
              <Button 
                onClick={handlePurchaseProduct}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs sm:text-sm min-h-[36px]"
              >
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"/>
                {loading ? "Kutilmoqda..." : "Sotib olish"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default TaxiMarketPage