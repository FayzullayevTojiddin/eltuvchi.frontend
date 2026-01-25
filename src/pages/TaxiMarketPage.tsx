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
      return <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">Faol</Badge>
    }
    return <Badge className="bg-red-500/20 text-red-400 border border-red-500/50">Nofaol</Badge>
  }

  const getDeliveryBadge = (delivered) => {
    if (delivered) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">
          <Check className="w-3 h-3 mr-1"/>
          Yetkazilgan
        </Badge>
      )
    }
    return (
      <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50">
        <Truck className="w-3 h-3 mr-1"/>
        Yetkazilmoqda
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="container mx-auto space-y-6">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <ShoppingCart className="w-6 h-6"/>
              Market
            </CardTitle>
            <CardDescription className="text-slate-400">
              Ball evaziga mahsulotlar sotib oling
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="grid w-full grid-cols-1 gap-2 bg-transparent border-0 h-auto">
                <TabsTrigger 
                  value="market" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 bg-slate-800/50 border border-slate-700 py-3"
                >
                  <ShoppingCart className="w-4 h-4 mr-2"/>
                  Mavjud mahsulotlar ({products.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="my-products" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 bg-slate-800/50 border border-slate-700 py-3"
                >
                  <Package className="w-4 h-4 mr-2"/>
                  Mening mahsulotlarim ({myProducts.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="market" className="space-y-4 mt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Mavjud mahsulotlar</h3>
                  <p className="text-sm text-slate-400">Ball evaziga mahsulot sotib oling</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.length === 0 ? (
                    <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3"/>
                      <p className="text-slate-400 text-lg">Hozircha mahsulotlar yo'q</p>
                    </div>
                  ) : (
                    products.map((product) => (
                      <Card key={product.id} className="hover:shadow-xl transition-all border-slate-700 bg-slate-800/50 backdrop-blur-sm overflow-hidden group">
                        {product.icon_type && (
                          <div className="relative h-48 bg-slate-900 overflow-hidden">
                            <img 
                              src={product.icon_type} 
                              alt={product.title || 'Mahsulot'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                              {getStatusBadge(product.status)}
                            </div>
                          </div>
                        )}
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-white flex items-start justify-between gap-2">
                            <span className="line-clamp-2">{product.title || 'Mahsulot nomi'}</span>
                          </CardTitle>
                          {product.description && (
                            <CardDescription className="text-slate-400 line-clamp-3">
                              {product.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-yellow-200">Narxi:</span>
                              <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                                <span className="text-2xl font-bold text-yellow-400">
                                  {product.points || 0}
                                </span>
                                <span className="text-sm text-yellow-200">ball</span>
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={() => showPurchaseDialog(product)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                            disabled={loading || product.status !== true}
                          >
                            <Gift className="w-4 h-4 mr-2"/>
                            Sotib olish
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-products" className="space-y-4 mt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Mening mahsulotlarim</h3>
                  <p className="text-sm text-slate-400">Sotib olingan mahsulotlar</p>
                </div>

                <div className="space-y-4">
                  {myProducts.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/30">
                      <Package className="w-12 h-12 text-slate-600 mx-auto mb-3"/>
                      <p className="text-slate-400 text-lg">Sizda hali mahsulotlar yo'q</p>
                      <p className="text-slate-500 text-sm mt-2">Marketdan mahsulotlar sotib oling</p>
                    </div>
                  ) : (
                    myProducts.map((item) => {
                      const product = item.product || item
                      return (
                        <Card key={item.id} className="hover:shadow-xl transition-all border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                          <CardHeader className="pb-3 border-b border-slate-700">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg text-white flex items-center gap-2">
                                  <Package className="w-5 h-5 text-blue-400"/>
                                  {product.title || 'Mahsulot'}
                                </CardTitle>
                                {product.description && (
                                  <CardDescription className="text-slate-400 mt-1">
                                    {product.description}
                                  </CardDescription>
                                )}
                              </div>
                              {item.delivered !== undefined && getDeliveryBadge(item.delivered)}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {product.icon_type && (
                                <div className="relative h-32 bg-slate-900 rounded-lg overflow-hidden">
                                  <img 
                                    src={product.icon_type} 
                                    alt={product.title || 'Mahsulot'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              <div className="space-y-3">
                                <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-yellow-200">Sarflangan ball:</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                      <span className="text-lg font-bold text-yellow-400">{product.points || 0}</span>
                                    </div>
                                  </div>
                                </div>

                                {item.created_at && (
                                  <div className="text-xs text-slate-400">
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
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Mahsulotni tasdiqlash</DialogTitle>
              <DialogDescription className="text-slate-400">
                Mahsulotni sotib olishni tasdiqlaysizmi?
              </DialogDescription>
            </DialogHeader>
            
            {purchaseDialog.product && (
              <div className="space-y-4">
                {purchaseDialog.product.image && (
                  <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
                    <img 
                      src={purchaseDialog.product.image} 
                      alt={purchaseDialog.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 p-4 rounded-lg">
                  <h3 className="font-medium text-white mb-2">{purchaseDialog.product.name}</h3>
                  {purchaseDialog.product.description && (
                    <p className="text-sm text-slate-300 mb-3">{purchaseDialog.product.description}</p>
                  )}
                  
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-200">Narxi:</span>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                        <span className="text-2xl font-bold text-yellow-400">
                          {purchaseDialog.product.points}
                        </span>
                        <span className="text-sm text-yellow-200">ball</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-900/40 border border-amber-700/50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0"/>
                    <div className="text-sm text-amber-100">
                      <p className="font-medium mb-1">Diqqat:</p>
                      <p>Mahsulotni sotib olgandan keyin ballingizdan <strong>{purchaseDialog.product.points} ball</strong> yechib olinadi. Bu amalni bekor qilib bo'lmaydi.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setPurchaseDialog({...purchaseDialog, open: false})}
                disabled={loading}
                className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                Bekor qilish
              </Button>
              <Button 
                onClick={handlePurchaseProduct}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                <Check className="w-4 h-4 mr-2"/>
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