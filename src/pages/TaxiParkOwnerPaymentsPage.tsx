import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  Car, 
  User, 
  Filter,
  Search,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const TaxiParkOwnerPaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for payments and transactions
  const balanceData = {
    currentBalance: 12450000,
    pendingPayments: 850000,
    totalEarnings: 45600000,
    totalWithdrawals: 33150000,
    monthlyEarnings: 2800000,
    monthlyWithdrawals: 1950000
  };

  const transactions = [
    {
      id: "TXN-001",
      type: "income",
      amount: 120000,
      description: "Buyurtma to'lovi",
      taxi: "01A123BC",
      driver: "Akmal Karimov",
      orderId: "ORD-001",
      date: "2024-01-20",
      time: "14:30",
      status: "Tasdiqlangan",
      commission: 12000,
      netAmount: 108000
    },
    {
      id: "TXN-002",
      type: "withdrawal",
      amount: 500000,
      description: "Pul yechish",
      method: "Bank kartasi",
      date: "2024-01-19",
      time: "16:45",
      status: "Jarayonda",
      commission: 5000,
      netAmount: 495000
    },
    {
      id: "TXN-003",
      type: "income",
      amount: 85000,
      description: "Buyurtma to'lovi",
      taxi: "01B456DE",
      driver: "Bobur Aliyev",
      orderId: "ORD-002",
      date: "2024-01-19",
      time: "12:15",
      status: "Tasdiqlangan",
      commission: 8500,
      netAmount: 76500
    },
    {
      id: "TXN-004",
      type: "expense",
      amount: 50000,
      description: "Xizmat haqi",
      reason: "Oylik platforma haqi",
      date: "2024-01-18",
      time: "09:00",
      status: "Tasdiqlangan",
      commission: 0,
      netAmount: 50000
    },
    {
      id: "TXN-005",
      type: "income",
      amount: 95000,
      description: "Buyurtma to'lovi",
      taxi: "01C789FG",
      driver: "Sardor Usmonov",
      orderId: "ORD-003",
      date: "2024-01-18",
      time: "11:20",
      status: "Tasdiqlangan",
      commission: 9500,
      netAmount: 85500
    }
  ];

  const driverBalances = [
    {
      driverId: 1,
      name: "Akmal Karimov",
      taxi: "01A123BC",
      currentBalance: 450000,
      monthlyEarnings: 890000,
      totalOrders: 28,
      lastPayment: "2024-01-20"
    },
    {
      driverId: 2,
      name: "Bobur Aliyev",
      taxi: "01B456DE",
      currentBalance: 320000,
      monthlyEarnings: 720000,
      totalOrders: 22,
      lastPayment: "2024-01-19"
    },
    {
      driverId: 3,
      name: "Sardor Usmonov",
      taxi: "01C789FG",
      currentBalance: 280000,
      monthlyEarnings: 680000,
      totalOrders: 18,
      lastPayment: "2024-01-18"
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.driver && transaction.driver.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && transaction.date === "2024-01-20") ||
                       (dateFilter === "yesterday" && transaction.date === "2024-01-19") ||
                       (dateFilter === "week" && new Date(transaction.date) >= new Date("2024-01-14"));
    
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">To'lovlar</h1>
          <p className="text-muted-foreground">
            Moliyaviy hisobotlar va to'lovlar tarixi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Hisobotni yuklash
          </Button>
          <Button className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Pul yechish
          </Button>
        </div>
      </div>

      {/* Balance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Joriy balans</p>
                <p className="text-2xl font-bold">{balanceData.currentBalance.toLocaleString()} so'm</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kutilayotgan to'lovlar</p>
                <p className="text-2xl font-bold text-warning">{balanceData.pendingPayments.toLocaleString()} so'm</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bu oylik kirim</p>
                <p className="text-2xl font-bold text-success">{balanceData.monthlyEarnings.toLocaleString()} so'm</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bu oylik chiqim</p>
                <p className="text-2xl font-bold text-muted-foreground">{balanceData.monthlyWithdrawals.toLocaleString()} so'm</p>
              </div>
              <TrendingDown className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Tranzaksiyalar</TabsTrigger>
          <TabsTrigger value="drivers">Haydovchilar balansi</TabsTrigger>
          <TabsTrigger value="analytics">Analitika</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tur bo'yicha filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha turlar</SelectItem>
                <SelectItem value="income">Kirim</SelectItem>
                <SelectItem value="withdrawal">Chiqim</SelectItem>
                <SelectItem value="expense">Xarajat</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sana bo'yicha filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha sanalar</SelectItem>
                <SelectItem value="today">Bugun</SelectItem>
                <SelectItem value="yesterday">Kecha</SelectItem>
                <SelectItem value="week">Bu hafta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="transactions" className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="bg-gradient-card border-0 shadow-card-custom">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-success/20' :
                        transaction.type === 'withdrawal' ? 'bg-warning/20' : 'bg-destructive/20'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowDownRight className={`h-4 w-4 ${
                            transaction.type === 'income' ? 'text-success' : ''
                          }`} />
                        ) : (
                          <ArrowUpRight className={`h-4 w-4 ${
                            transaction.type === 'withdrawal' ? 'text-warning' : 
                            transaction.type === 'expense' ? 'text-destructive' : ''
                          }`} />
                        )}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {transaction.id}
                      </Badge>
                      <Badge variant={
                        transaction.status === "Tasdiqlangan" ? "default" : 
                        transaction.status === "Jarayonda" ? "secondary" : "destructive"
                      }>
                        {transaction.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {transaction.date} • {transaction.time}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">{transaction.description}</h3>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        {transaction.taxi && (
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>{transaction.taxi}</span>
                          </div>
                        )}
                        {transaction.driver && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{transaction.driver}</span>
                          </div>
                        )}
                        {transaction.method && (
                          <span>Usul: {transaction.method}</span>
                        )}
                        {transaction.reason && (
                          <span>Sabab: {transaction.reason}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2 min-w-[200px]">
                    <div className="space-y-1">
                      <p className={`text-2xl font-bold ${
                        transaction.type === 'income' ? 'text-success' :
                        transaction.type === 'withdrawal' ? 'text-warning' : 'text-destructive'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} so'm
                      </p>
                      {transaction.commission > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Komissiya: {transaction.commission.toLocaleString()} so'm
                        </p>
                      )}
                      <p className="text-lg font-semibold">
                        Sof: {transaction.netAmount.toLocaleString()} so'm
                      </p>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Batafsil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          {driverBalances.map((driver) => (
            <Card key={driver.driverId} className="bg-gradient-card border-0 shadow-card-custom">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold">{driver.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Car className="h-4 w-4" />
                        <span>{driver.taxi}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{driver.totalOrders} buyurtma</span>
                        <span>Oxirgi to'lov: {driver.lastPayment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-lg font-bold">{driver.currentBalance.toLocaleString()} so'm</p>
                      <p className="text-xs text-muted-foreground">Joriy balans</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-success">{driver.monthlyEarnings.toLocaleString()} so'm</p>
                      <p className="text-xs text-muted-foreground">Bu oylik</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ko'rish
                      </Button>
                      <Button size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        To'lov
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Oylik moliyaviy xulosalar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Jami kirim:</span>
                    <span className="font-medium text-success">{balanceData.monthlyEarnings.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Jami chiqim:</span>
                    <span className="font-medium text-warning">{balanceData.monthlyWithdrawals.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sof foyda:</span>
                    <span className="font-medium text-primary">
                      {(balanceData.monthlyEarnings - balanceData.monthlyWithdrawals).toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Foydalilik:</span>
                    <span className="font-medium">
                      {Math.round(((balanceData.monthlyEarnings - balanceData.monthlyWithdrawals) / balanceData.monthlyEarnings) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Umumiy statistika</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Jami daromad:</span>
                    <span className="font-medium">{balanceData.totalEarnings.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Jami yechildi:</span>
                    <span className="font-medium">{balanceData.totalWithdrawals.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Joriy balans:</span>
                    <span className="font-medium text-success">{balanceData.currentBalance.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Kutilayotgan:</span>
                    <span className="font-medium text-warning">{balanceData.pendingPayments.toLocaleString()} so'm</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxiParkOwnerPaymentsPage;