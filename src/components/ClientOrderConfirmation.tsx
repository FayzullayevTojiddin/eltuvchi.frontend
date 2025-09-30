import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, Clock, AlertTriangle, Star } from "lucide-react"
import { LoadingButton } from "./LoadingSpinner"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  driverName: string
  from: string
  to: string
  price: number
  status: 'waiting_confirmation' | 'completed'
  completedAt?: Date
}

interface ClientOrderConfirmationProps {
  order: Order
  onConfirm: (orderId: string) => void
}

export function ClientOrderConfirmation({ order, onConfirm }: ClientOrderConfirmationProps) {
  const { toast } = useToast()
  const [isConfirming, setIsConfirming] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rating, setRating] = useState(5)

  const handleConfirm = async () => {
    setIsConfirming(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      onConfirm(order.id)
      toast({
        title: "Safar tasdiqlandi!",
        description: "To'lov haydovchiga yuborildi. Rahmat!",
      })
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Tasdiqashda xatolik yuz berdi. Qayta urinib ko'ring.",
        variant: "destructive"
      })
    } finally {
      setIsConfirming(false)
    }
  }

  if (order.status === 'completed') {
    return (
      <Card className="border-success/20 bg-success/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-success">
            <CheckCircle className="h-5 w-5" />
            Safar yakunlandi
          </CardTitle>
          <CardDescription>
            Siz bu safarni tasdiqlagan va to'lov haydovchiga yuborilgan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Haydovchi:</span>
              <span className="font-medium">{order.driverName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Yo'nalish:</span>
              <span className="font-medium">{order.from} → {order.to}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">To'lov:</span>
              <span className="font-semibold text-success">{order.price.toLocaleString()} so'm</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-orange-500/20 bg-orange-500/5 animate-pulse">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-600">
          <Clock className="h-5 w-5" />
          Tasdiq kutilmoqda
        </CardTitle>
        <CardDescription>
          Haydovchi safar tugaganini bildirdi. Iltimos, tasdiqlang.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Haydovchi:</span>
            <span className="font-medium">{order.driverName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Yo'nalish:</span>
            <span className="font-medium">{order.from} → {order.to}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">To'lov:</span>
            <span className="font-semibold">{order.price.toLocaleString()} so'm</span>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-orange-600">Muhim!</p>
              <p className="text-orange-600/80">
                Safarni tasdiqlash orqali siz to'lovni haydovchiga yuborishga rozisiz.
              </p>
            </div>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-success hover:bg-success/90">
              Safarni tasdiqlash
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Safarni tasdiqlash</DialogTitle>
              <DialogDescription>
                Safar muvaffaqiyatli yakunlandimi? Tasdiqlash orqali to'lov haydovchiga yuboriladi.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Haydovchi:</span>
                  <span className="font-medium">{order.driverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yo'nalish:</span>
                  <span className="font-medium">{order.from} → {order.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To'lov miqdori:</span>
                  <span className="font-semibold text-lg">{order.price.toLocaleString()} so'm</span>
                </div>
              </div>

              {/* Rating section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Haydovchini baholang:</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 transition-colors ${
                        star <= rating ? 'text-yellow-500' : 'text-muted-foreground'
                      }`}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isConfirming}
                >
                  Bekor qilish
                </Button>
                <LoadingButton
                  isLoading={isConfirming}
                  loadingText="Tasdiqlanyapti..."
                  onClick={handleConfirm}
                  className="flex-1 bg-success hover:bg-success/90"
                >
                  Tasdiqlash va to'lash
                </LoadingButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}