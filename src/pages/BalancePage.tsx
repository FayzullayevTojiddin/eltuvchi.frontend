import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Wallet, Plus, ArrowUpDown, Clock, CheckCircle, XCircle, DollarSign, ExternalLink } from "lucide-react"
import { toast } from "sonner"

const BalancePage = () => {
  const [currentBalance] = useState(125000)
  const [withdrawDialog, setWithdrawDialog] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  const [transactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: 50000,
      description: "Balansni to'ldirish",
      date: "2024-01-20 14:30",
      status: "completed"
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 25000,
      description: "Pul yechish - Karta",
      date: "2024-01-19 10:15",
      status: "completed"
    },
    {
      id: 3,
      type: "deposit",
      amount: 100000,
      description: "Buyurtma uchun to'lov",
      date: "2024-01-18 16:45",
      status: "completed"
    },
    {
      id: 4,
      type: "withdrawal",
      amount: 30000,
      description: "Click orqali pul yechish",
      date: "2024-01-17 09:20",
      status: "pending"
    },
  ])

  const getTransactionIcon = (type: string, status: string) => {
    if (status === "pending") return <Clock className="h-4 w-4 text-yellow-600" />
    if (status === "failed") return <XCircle className="h-4 w-4 text-red-600" />
    if (type === "deposit") return <Plus className="h-4 w-4 text-green-600" />
    return <ArrowUpDown className="h-4 w-4 text-blue-600" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Amalga oshirilgan</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Kutilmoqda</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Muvaffaqiyatsiz</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount)
    
    if (!amount || amount <= 0) {
      toast.error("To'g'ri summa kiriting!")
      return
    }
    
    if (amount > currentBalance) {
      toast.error("Balansda yetarli mablag' yo'q!")
      return
    }

    if (!withdrawMethod) {
      toast.error("Pul yechish usulini tanlang!")
      return
    }

    if (withdrawMethod === "card") {
      if (!cardNumber || !cardHolder || !expiryDate) {
        toast.error("Karta ma'lumotlarini to'liq kiriting!")
        return
      }
    }

    // Simulate withdrawal process
    toast.success(`${amount.toLocaleString()} so'm ${withdrawMethod === "card" ? "kartaga" : "Click orqali"} yuborildi!`)
    setWithdrawDialog(false)
    setWithdrawAmount("")
    setWithdrawMethod("")
    setCardNumber("")
    setCardHolder("")
    setExpiryDate("")
  }

  const handleClickWithdraw = () => {
    const amount = parseInt(withdrawAmount)
    if (!amount || amount <= 0) {
      toast.error("To'g'ri summa kiriting!")
      return
    }
    
    if (amount > currentBalance) {
      toast.error("Balansda yetarli mablag' yo'q!")
      return
    }

    // Click.uz saytiga yo'naltirish
    const clickUrl = `https://click.uz/withdraw?amount=${amount}&callback=eltuvchi-app`
    window.open(clickUrl, '_blank')
    toast.success("Click.uz saytiga yo'naltirilmoqda...")
    setWithdrawDialog(false)
    setWithdrawAmount("")
    setWithdrawMethod("")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 p-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Balans</h1>
        <p className="text-muted-foreground">Moliyaviy operatsiyalaringizni boshqaring</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
        <CardContent className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80 mb-2">Joriy balans</p>
              <p className="text-2xl md:text-4xl font-bold">{currentBalance.toLocaleString()} so'm</p>
            </div>
            <div className="text-center">
              <Wallet className="h-8 w-8 md:h-12 md:w-12 text-primary-foreground/80 mb-2 mx-auto" />
              <p className="text-sm text-primary-foreground/80">Mavjud</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold">Balansni to'ldirish</h3>
                <p className="text-sm text-muted-foreground">Click yoki Payme orqali</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                To'ldirish
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ArrowUpDown className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold">Pul yechish</h3>
                <p className="text-sm text-muted-foreground">Karta yoki Click orqali</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setWithdrawDialog(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full md:w-auto"
              >
                Yechish
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Operatsiyalar tarixi
          </CardTitle>
          <CardDescription>
            Oxirgi moliyaviy operatsiyalaringiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {getTransactionIcon(transaction.type, transaction.status)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h4 className="font-medium">{transaction.description}</h4>
                    <div className="text-left md:text-right">
                      <p className={`font-bold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString()} so'm
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-1 gap-2">
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Pul yechish</DialogTitle>
            <DialogDescription>
              Pul yechish usulini tanlang va ma'lumotlarni kiriting
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Summa (so'm)</Label>
              <Input
                id="amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0"
                max={currentBalance}
              />
              <p className="text-xs text-muted-foreground">
                Maksimal: {currentBalance.toLocaleString()} so'm
              </p>
            </div>

            <div className="space-y-2">
              <Label>Pul yechish usuli</Label>
              <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Usulni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Bank kartasi</SelectItem>
                  <SelectItem value="click">Click.uz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {withdrawMethod === "card" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Karta ma'lumotlari</h4>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Karta raqami</Label>
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="8600 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardHolder">Karta egasi</Label>
                    <Input
                      id="cardHolder"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="JOHN SMITH"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Amal qilish muddati</Label>
                    <Input
                      id="expiryDate"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                </div>
              </>
            )}

            {withdrawMethod === "click" && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-600">Click.uz orqali</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Siz Click.uz saytiga yo'naltirilasiz va u yerda pul yechish amalini yakunlaysiz.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col md:flex-row gap-2">
            <Button variant="outline" onClick={() => setWithdrawDialog(false)} className="w-full md:w-auto">
              Bekor qilish
            </Button>
            <Button onClick={withdrawMethod === "click" ? handleClickWithdraw : handleWithdraw} className="w-full md:w-auto">
              {withdrawMethod === "click" ? "Click.uz ga o'tish" : "Pul yechish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BalancePage
