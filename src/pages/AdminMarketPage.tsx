import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Package, Percent, Star, Gift, Zap, Crown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  title: string
  description: string
  points: number
  icon: string
  category: 'premium' | 'basic' | 'special'
  type: 'product' | 'discount'
  discountPercentage?: number
}

const AdminMarketPage = () => {
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState("products")

  // Mock data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Premium kiyim",
      description: "Haydovchilar uchun premium kiyim to'plami",
      points: 1000,
      icon: "Package",
      category: "premium",
      type: "product"
    },
    {
      id: "2", 
      title: "Telefon ushlagich",
      description: "Mashina uchun telefon ushlagich",
      points: 300,
      icon: "Zap",
      category: "basic",
      type: "product"
    }
  ])

  const [discounts, setDiscounts] = useState<Product[]>([
    {
      id: "3",
      title: "25% chegirma",
      description: "Keyingi buyurtmaga 25% chegirma",
      points: 200,
      icon: "Star",
      category: "premium",
      type: "discount",
      discountPercentage: 25
    },
    {
      id: "4",
      title: "10% chegirma", 
      description: "Har qanday buyurtmaga 10% chegirma",
      points: 100,
      icon: "Gift",
      category: "basic",
      type: "discount",
      discountPercentage: 10
    }
  ])

  const [newItem, setNewItem] = useState<{
    title: string
    description: string
    points: string
    icon: string
    category: 'premium' | 'basic' | 'special'
    type: 'product' | 'discount'
    discountPercentage: string
  }>({
    title: "",
    description: "",
    points: "",
    icon: "Package",
    category: "basic",
    type: "product",
    discountPercentage: ""
  })

  const iconOptions = [
    { value: "Package", label: "Paket", icon: Package },
    { value: "Star", label: "Yulduz", icon: Star },
    { value: "Gift", label: "Sovg'a", icon: Gift },
    { value: "Zap", label: "Energiya", icon: Zap },
    { value: "Crown", label: "Toj", icon: Crown },
    { value: "Percent", label: "Foiz", icon: Percent }
  ]

  const handleSubmit = () => {
    if (!newItem.title || !newItem.description || !newItem.points) {
      toast({
        title: "Xatolik",
        description: "Barcha majburiy maydonlarni to'ldiring",
        variant: "destructive"
      })
      return
    }

    const item: Product = {
      id: editingItem?.id || Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      points: parseInt(newItem.points),
      icon: newItem.icon,
      category: newItem.category,
      type: newItem.type,
      discountPercentage: newItem.discountPercentage ? parseInt(newItem.discountPercentage) : undefined
    }

    if (editingItem) {
      // Update existing item
      if (newItem.type === "product") {
        setProducts(prev => prev.map(p => p.id === editingItem.id ? item : p))
      } else {
        setDiscounts(prev => prev.map(d => d.id === editingItem.id ? item : d))
      }
      toast({
        title: "Muvaffaqiyatli yangilandi",
        description: `${newItem.type === "product" ? "Mahsulot" : "Chegirma"} yangilandi`
      })
    } else {
      // Add new item
      if (newItem.type === "product") {
        setProducts(prev => [...prev, item])
      } else {
        setDiscounts(prev => [...prev, item])
      }
      toast({
        title: "Muvaffaqiyatli qo'shildi",
        description: `Yangi ${newItem.type === "product" ? "mahsulot" : "chegirma"} qo'shildi`
      })
    }

    // Reset form
    setNewItem({
      title: "",
      description: "",
      points: "",
      icon: "Package",
      category: "basic",
      type: "product",
      discountPercentage: ""
    })
    setIsAddDialogOpen(false)
    setEditingItem(null)
  }

  const handleEdit = (item: Product) => {
    setEditingItem(item)
    setNewItem({
      title: item.title,
      description: item.description,
      points: item.points.toString(),
      icon: item.icon,
      category: item.category,
      type: item.type,
      discountPercentage: item.discountPercentage?.toString() || ""
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: string, type: 'product' | 'discount') => {
    if (type === "product") {
      setProducts(prev => prev.filter(p => p.id !== id))
    } else {
      setDiscounts(prev => prev.filter(d => d.id !== id))
    }
    toast({
      title: "O'chirildi",
      description: `${type === "product" ? "Mahsulot" : "Chegirma"} o'chirildi`
    })
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Package, Star, Gift, Zap, Crown, Percent
    }
    const IconComponent = iconMap[iconName] || Package
    return <IconComponent className="h-5 w-5" />
  }

  const ItemCard = ({ item, type }: { item: Product, type: 'product' | 'discount' }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              item.category === 'premium' ? 'bg-gradient-primary text-white' :
              item.category === 'special' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
              'bg-accent'
            }`}>
              {getIconComponent(item.icon)}
            </div>
            <div>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{item.points} ball</Badge>
                {item.discountPercentage && (
                  <Badge variant="outline">-{item.discountPercentage}%</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(item)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(item.id, type)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market boshqaruvi</h1>
          <p className="text-muted-foreground">Mahsulotlar va chegirmalarni boshqaring</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yangi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Tahrirlash" : "Yangi element qo'shish"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "Elementni tahrirlang" : "Yangi mahsulot yoki chegirma qo'shing"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Turi</Label>
                <Select value={newItem.type} onValueChange={(value: 'product' | 'discount') => setNewItem(prev => ({...prev, type: value as 'product' | 'discount'}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Mahsulot</SelectItem>
                    <SelectItem value="discount">Chegirma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Nomi</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem(prev => ({...prev, title: e.target.value}))}
                  placeholder="Element nomi"
                />
              </div>

              <div>
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({...prev, description: e.target.value}))}
                  placeholder="Element tavsifi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="points">Ball narxi</Label>
                  <Input
                    id="points"
                    type="number"
                    value={newItem.points}
                    onChange={(e) => setNewItem(prev => ({...prev, points: e.target.value}))}
                    placeholder="0"
                  />
                </div>

                {newItem.type === "discount" && (
                  <div>
                    <Label htmlFor="discount">Chegirma %</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={newItem.discountPercentage}
                      onChange={(e) => setNewItem(prev => ({...prev, discountPercentage: e.target.value}))}
                      placeholder="0"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="category">Kategoriya</Label>
                  <Select value={newItem.category} onValueChange={(value: 'basic' | 'premium' | 'special') => setNewItem(prev => ({...prev, category: value as 'basic' | 'premium' | 'special'}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Oddiy</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="special">Maxsus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="icon">Ikonka</Label>
                  <Select value={newItem.icon} onValueChange={(value) => setNewItem(prev => ({...prev, icon: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                {editingItem ? "Yangilash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products" className="gap-2">
            <Package className="h-4 w-4" />
            Mahsulotlar ({products.length})
          </TabsTrigger>
          <TabsTrigger value="discounts" className="gap-2">
            <Percent className="h-4 w-4" />
            Chegirmalar ({discounts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ItemCard key={product.id} item={product} type="product" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Hozircha mahsulotlar yo'q</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discounts" className="space-y-4">
          {discounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {discounts.map((discount) => (
                <ItemCard key={discount.id} item={discount} type="discount" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Percent className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Hozircha chegirmalar yo'q</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminMarketPage