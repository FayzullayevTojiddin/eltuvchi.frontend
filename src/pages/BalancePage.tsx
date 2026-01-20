import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Plus, ArrowUpDown, Clock, CheckCircle, XCircle, DollarSign, Minus } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api.ts"

const BalancePage = () => {
  const [currentBalance, setCurrentBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBalanceData()
  }, [])

  const fetchBalanceData = async () => {
    try {
      setLoading(true)
      
      const historyRes = await api.get('/balance-history')
      setTransactions(historyRes.data || [])
      
      const profileRes = await api.get('/client/me')
      setCurrentBalance(profileRes.data?.balance || 0)
      
    } catch (error) {
      console.error("Balans ma'lumotlarini yuklashda xatolik:", error)
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  const getTransactionIcon = (type: string) => {
    if (type === "plus") return <Plus className="h-4 w-4 text-green-600" />
    return <Minus className="h-4 w-4 text-red-600" />
  }

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 p-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Balans</h1>
        <p className="text-muted-foreground">Moliyaviy operatsiyalaringizni ko'ring</p>
      </div>

      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
        <CardContent className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80 mb-2">Joriy balans</p>
              <p className="text-2xl md:text-4xl font-bold">
                {loading ? "Yuklanmoqda..." : `${formatNumber(currentBalance)} so'm`}
              </p>
            </div>
            <div className="text-center">
              <Wallet className="h-8 w-8 md:h-12 md:w-12 text-primary-foreground/80 mb-2 mx-auto" />
              <p className="text-sm text-primary-foreground/80">Mavjud</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Yuklanmoqda...
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Hozircha operatsiyalar mavjud emas
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction: any) => (
                <div key={transaction.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h4 className="font-medium">{transaction.description || "Operatsiya"}</h4>
                      <div className="text-left md:text-right">
                        <p className={`font-bold ${transaction.type === 'plus' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'plus' ? '+' : '-'}{formatNumber(transaction.amount)} so'm
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 gap-2">
                      <p className="text-sm text-muted-foreground">{formatDate(transaction.created_at)}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Qoldiq: {formatNumber(transaction.balance_after)} so'm
                        </span>
                      </div>
                    </div>
                    {transaction.user && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Tomonidan: {transaction.user.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BalancePage