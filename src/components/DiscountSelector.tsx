import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Percent, Gift, Star, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Discount {
  id: string
  title: string
  description: string
  percentage: number
  isUsed: boolean
}

interface DiscountSelectorProps {
  onDiscountSelect: (discount: Discount | null) => void
  selectedDiscount: Discount | null
}

export function DiscountSelector({ onDiscountSelect, selectedDiscount }: DiscountSelectorProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  // Mock user discounts
  const userDiscounts: Discount[] = [
    {
      id: "1",
      title: "25% chegirma",
      description: "Keyingi buyurtmaga 25% chegirma",
      percentage: 25,
      isUsed: false
    },
    {
      id: "2", 
      title: "10% chegirma",
      description: "Har qanday buyurtmaga 10% chegirma",
      percentage: 10,
      isUsed: false
    },
    {
      id: "3",
      title: "15% chegirma", 
      description: "Uzoq masofa uchun 15% chegirma",
      percentage: 15,
      isUsed: true
    }
  ]

  const availableDiscounts = userDiscounts.filter(d => !d.isUsed)

  const handleDiscountSelect = (discount: Discount) => {
    onDiscountSelect(discount)
    setIsOpen(false)
  }

  const handleRemoveDiscount = () => {
    onDiscountSelect(null)
  }

  return (
    <div className="space-y-2">
      {selectedDiscount ? (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Percent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{selectedDiscount.title}</p>
                  <p className="text-sm text-muted-foreground">{selectedDiscount.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveDiscount}
              >
                Bekor qilish
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Percent className="h-4 w-4" />
              Chegirma tanlash
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Chegirmalaringiz
              </DialogTitle>
              <DialogDescription>
                Mavjud chegirmalardan birini tanlang yoki yangi chegirmalar uchun marketga o'ting
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3">
              {availableDiscounts.length > 0 ? (
                availableDiscounts.map((discount) => (
                  <Card 
                    key={discount.id} 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleDiscountSelect(discount)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{discount.title}</p>
                            <p className="text-xs text-muted-foreground">{discount.description}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          -{discount.percentage}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-6">
                  <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-3">Hozircha chegirmalaringiz yo'q</p>
                  <Button 
                    onClick={() => {
                      setIsOpen(false)
                      navigate('/market')
                    }}
                    className="gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Marketga o'tish
                  </Button>
                </div>
              )}
              
              {availableDiscounts.length > 0 && (
                <div className="pt-3 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => {
                      setIsOpen(false)
                      navigate('/market')
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Ko'proq chegirma olish
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}