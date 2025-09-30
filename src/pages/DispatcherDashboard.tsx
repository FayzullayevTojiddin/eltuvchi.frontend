
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Car,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Activity,
  TrendingUp,
} from "lucide-react";

const DispatcherDashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [assignDriverDialog, setAssignDriverDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState("");

  // Demo data
  const stats = [
    { title: "Jami buyurtmalar", value: "245", icon: ShoppingBag, change: "+12%" },
    { title: "Faol buyurtmalar", value: "18", icon: Activity, change: "+5%" },
    { title: "Tugallangan", value: "227", icon: CheckCircle, change: "+8%" },
    { title: "Kutayotgan", value: "12", icon: Clock, change: "-2%" },
  ];

  const weeklyData = [
    { day: "Dush", orders: 35 },
    { day: "Sesh", orders: 42 },
    { day: "Chor", orders: 38 },
    { day: "Pay", orders: 51 },
    { day: "Juma", orders: 49 },
    { day: "Shan", orders: 62 },
    { day: "Yak", orders: 45 },
  ];

  const statusData = [
    { name: "Tugallangan", value: 85, color: "#10b981" },
    { name: "Jarayonda", value: 10, color: "#f59e0b" },
    { name: "Bekor qilingan", value: 5, color: "#ef4444" },
  ];

  const [activeOrders, setActiveOrders] = useState([
    {
      id: "ORD-001",
      customer: "Alisher Karimov",
      from: "Chilonzor tumani",
      to: "Shayxontoxur tumani",
      driver: "Bobur Umarov",
      status: "jarayonda",
      time: "10:30",
    },
    {
      id: "ORD-002",
      customer: "Malika Saidova",
      from: "Yunusobod tumani",
      to: "Mirzo-Ulugbek tumani",
      driver: "Sardor Rashidov",
      status: "kutayotgan",
      time: "10:45",
    },
    {
      id: "ORD-003",
      customer: "Jahongir Toshev",
      from: "Sergeli tumani",
      to: "Olmazor tumani",
      driver: "Otabek Normurodov",
      status: "jarayonda",
      time: "11:00",
    },
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      customer: "Alisher Karimov",
      message: "Haydovchi qachon keladi?",
      time: "10:32",
      unread: true,
      orderId: "ORD-001",
    },
    {
      id: 2,
      customer: "Malika Saidova",
      message: "Manzilni o'zgartirish mumkinmi?",
      time: "10:28",
      unread: true,
      orderId: "ORD-002",
    },
    {
      id: 3,
      customer: "Jahongir Toshev",
      message: "Rahmat, xizmat uchun",
      time: "09:45",
      unread: false,
      orderId: "ORD-003",
    },
  ]);

  const availableDrivers = [
    { id: "1", name: "Bobur Umarov", status: "free" },
    { id: "2", name: "Sardor Rashidov", status: "free" },
    { id: "3", name: "Otabek Normurodov", status: "busy" },
    { id: "4", name: "Akmal Karimov", status: "free" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "jarayonda":
        return <Badge className="bg-yellow-100 text-yellow-800">Jarayonda</Badge>;
      case "kutayotgan":
        return <Badge className="bg-blue-100 text-blue-800">Kutayotgan</Badge>;
      case "tugallangan":
        return <Badge className="bg-green-100 text-green-800">Tugallangan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCall = (customer: string) => {
    toast.success(`${customer} ga qo'ng'iroq amalga oshirilmoqda...`);
  };

  const handleChatOpen = (chat: any) => {
    setSelectedChat(chat);
    setChatDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    toast.success("Xabar yuborildi!");
    setChatMessage("");
    setChatDialogOpen(false);
    
    // Mark chat as read
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === selectedChat?.id 
          ? { ...msg, unread: false }
          : msg
      )
    );
  };

  const handleAssignDriver = () => {
    if (!selectedDriver || !selectedOrder) return;

    const driverName = availableDrivers.find(d => d.id === selectedDriver)?.name;
    
    setActiveOrders(prev =>
      prev.map(order =>
        order.id === selectedOrder.id
          ? { ...order, driver: driverName, status: "tayinlangan" }
          : order
      )
    );

    toast.success(`${driverName} haydovchi ${selectedOrder.id} buyurtmaga tayinlandi`);
    setAssignDriverDialog(false);
    setSelectedOrder(null);
    setSelectedDriver("");
  };

  const handleAssignDriverClick = (order: any) => {
    setSelectedOrder(order);
    setAssignDriverDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispatcher paneli</h1>
          <p className="text-muted-foreground">
            Buyurtmalar va mijozlar bilan aloqani boshqaring
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Activity className="h-4 w-4 mr-2" />
          Faol
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {" "}o'tgan haftaga nisbatan
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Orders & Chat */}
        <div className="space-y-6">
          {/* Active Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Faol buyurtmalar
              </CardTitle>
              <CardDescription>
                Hozirda bajarilayotgan buyurtmalar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{order.customer}</h4>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {order.from} → {order.to}
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="h-3 w-3" />
                          Haydovchi: {order.driver}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {order.time}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCall(order.customer)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Qo'ng'iroq
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleChatOpen({
                            customer: order.customer,
                            orderId: order.id
                          })}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        {order.status === "kutayotgan" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAssignDriverClick(order)}
                          >
                            Haydovchi tayinlash
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat & Analytics */}
        <div className="space-y-6">
          {/* Chat Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Mijozlar chat
              </CardTitle>
              <CardDescription>
                Mijozlar bilan aloqa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {chatMessages.map((chat) => (
                    <div 
                      key={chat.id} 
                      className={`border rounded-lg p-3 cursor-pointer hover:bg-accent ${
                        chat.unread ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => handleChatOpen(chat)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{chat.customer}</h5>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                          {chat.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{chat.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">#{chat.orderId}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button className="w-full mt-4">
                Barcha chatlarni ko'rish
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Haftalik statistika</CardTitle>
            <CardDescription>So'nggi 7 kun ichidagi buyurtmalar</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buyurtmalar holati</CardTitle>
            <CardDescription>Buyurtmalar bo'yicha umumiy ma'lumot</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Chat Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedChat?.customer} bilan chat
            </DialogTitle>
            <DialogDescription>
              Buyurtma #{selectedChat?.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{selectedChat?.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{selectedChat?.time}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Javob yozing</Label>
              <Textarea
                id="message"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Xabar yozing..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChatDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleSendMessage}>
              Yuborish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Driver Dialog */}
      <Dialog open={assignDriverDialog} onOpenChange={setAssignDriverDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Haydovchi tayinlash
            </DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} buyurtmaga haydovchi tayinlang
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Haydovchini tanlang</Label>
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger>
                  <SelectValue placeholder="Haydovchini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers
                    .filter(driver => driver.status === "free")
                    .map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDriverDialog(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleAssignDriver}>
              Tayinlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DispatcherDashboard;
