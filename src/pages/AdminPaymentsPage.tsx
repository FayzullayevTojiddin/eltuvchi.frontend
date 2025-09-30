import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Eye, Filter, PrinterIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const AdminPaymentsPage = () => {
  const { toast } = useToast()
  const [paymentFilter, setPaymentFilter] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const payments = [
    { id: "p001", user: "Akmal Karimov", amount: "100,000", method: "Click", date: "2025-01-30", time: "14:30", status: "completed", orderId: "001", userPhone: "+998901234567" },
    { id: "p002", user: "Dilshod Rahimov", amount: "50,000", method: "Payme", date: "2025-01-30", time: "12:15", status: "completed", orderId: "003", userPhone: "+998909876543" },
    { id: "p003", user: "Sarvar Nazarov", amount: "75,000", method: "Click", date: "2025-01-29", time: "18:45", status: "completed", orderId: "007", userPhone: "+998901111111" },
    { id: "p004", user: "Dilnoza Saidova", amount: "120,000", method: "Payme", date: "2025-01-29", time: "16:20", status: "completed", orderId: "004", userPhone: "+998905555555" },
    { id: "p005", user: "Rustam Toshev", amount: "85,000", method: "Click", date: "2025-01-28", time: "09:30", status: "completed", orderId: "005", userPhone: "+998904444444" },
  ]

  const filteredPayments = payments.filter(payment => {
    const userMatch = payment.user.toLowerCase().includes(paymentFilter.toLowerCase())
    const idMatch = payment.id.toLowerCase().includes(paymentFilter.toLowerCase())
    const methodMatch = paymentMethodFilter === "all" || payment.method.toLowerCase() === paymentMethodFilter
    return (userMatch || idMatch) && methodMatch
  })

  const handlePrintReceipt = (paymentId: string) => {
    toast({
      title: "Kvitansiya chop etilmoqda",
      description: `To'lov #${paymentId} uchun kvitansiya tayyorlanmoqda.`,
    })
  }

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setViewDialogOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">To'lovlar tarixi</h1>
        <p className="text-muted-foreground">Barcha to'lovlar va kvitansiyalar</p>
      </div>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                To'lovlar
              </CardTitle>
              <CardDescription>Jami {filteredPayments.length} ta to'lov</CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Input
                  placeholder="Qidirish..."
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-40"
                />
              </div>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Usul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Hammasi</SelectItem>
                  <SelectItem value="click">Click</SelectItem>
                  <SelectItem value="payme">Payme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>To'lov ID</TableHead>
                <TableHead>Foydalanuvchi</TableHead>
                <TableHead>Miqdor</TableHead>
                <TableHead>Usul</TableHead>
                <TableHead>Sana/Vaqt</TableHead>
                <TableHead>Buyurtma ID</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">#{payment.id}</TableCell>
                  <TableCell>{payment.user}</TableCell>
                  <TableCell>{payment.amount} so'm</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.date} {payment.time}</TableCell>
                  <TableCell>#{payment.orderId}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-success">
                      To'landi
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPayment(payment)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePrintReceipt(payment.id)}
                      >
                        <PrinterIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>To'lov tafsilotlari</DialogTitle>
            <DialogDescription>
              To'lov #{selectedPayment?.id} ning to'liq ma'lumotlari
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">To'lov ID</h3>
                <p>#{selectedPayment.id}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Buyurtma ID</h3>
                <p>#{selectedPayment.orderId}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Foydalanuvchi</h3>
                <p>{selectedPayment.user}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Telefon</h3>
                <p>{selectedPayment.userPhone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">To'lov usuli</h3>
                <p>{selectedPayment.method}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Holat</h3>
                <p>
                  <Badge variant="default" className="bg-success">
                    To'landi
                  </Badge>
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Sana</h3>
                <p>{selectedPayment.date}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Vaqt</h3>
                <p>{selectedPayment.time}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-medium text-sm text-muted-foreground">Miqdor</h3>
                <p className="text-2xl font-bold">{selectedPayment.amount} so'm</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminPaymentsPage