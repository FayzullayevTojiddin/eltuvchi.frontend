
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  BarChart3,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Ban,
  Eye,
  Star,
  Car,
  Users,
  HeadphonesIcon
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AdminDispatcherDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  // Demo dispatcher data
  const [dispatcher, setDispatcher] = useState({
    id: 1,
    name: "Aziz Karimov",
    email: "aziz@eltuvchi.uz", 
    phone: "+998 90 123 45 67",
    region: "Toshkent",
    status: "faol",
    joinDate: "2023-08-15",
    lastActivity: "2024-01-20 15:30",
    shift: "08:00 - 20:00",
    rating: 4.8,
    avatar: "/placeholder.svg",
    totalOrders: 1250,
    successfulOrders: 1180,
    cancelledOrders: 45,
    responseTime: 2.3,
    customerSatisfaction: 95
  });

  const [editForm, setEditForm] = useState({
    name: dispatcher.name,
    email: dispatcher.email,
    phone: dispatcher.phone,
    region: dispatcher.region,
    shift: dispatcher.shift,
    status: dispatcher.status
  });

  const monthlyStats = [
    { month: "Yan", orders: 95, satisfaction: 94 },
    { month: "Fev", orders: 102, satisfaction: 96 },
    { month: "Mar", orders: 118, satisfaction: 95 },
    { month: "Apr", orders: 125, satisfaction: 97 },
    { month: "May", orders: 110, satisfaction: 96 },
    { month: "Iyun", orders: 130, satisfaction: 95 },
  ];

  const weeklyActivity = [
    { day: "Dush", hours: 8.5 },
    { day: "Sesh", hours: 9.2 },
    { day: "Chor", hours: 8.8 },
    { day: "Pay", hours: 9.5 },
    { day: "Juma", hours: 8.3 },
    { day: "Shan", hours: 7.8 },
    { day: "Yak", hours: 6.2 },
  ];

  const orderStats = [
    { name: "Muvaffaqiyatli", value: 94, color: "#10b981" },
    { name: "Bekor qilingan", value: 4, color: "#ef4444" },
    { name: "Rad etilgan", value: 2, color: "#f59e0b" },
  ];

  const recentOrders = [
    {
      id: "ORD-1001",
      customer: "Alisher Karimov",
      from: "Chilonzor",
      to: "Shayxontoxur", 
      status: "tugallangan",
      time: "15:20",
      date: "2024-01-20",
      rating: 5
    },
    {
      id: "ORD-1002", 
      customer: "Malika Saidova",
      from: "Yunusobod",
      to: "Mirzo-Ulugbek",
      status: "jarayonda",
      time: "15:45",
      date: "2024-01-20",
      rating: null
    },
    {
      id: "ORD-1003",
      customer: "Jahongir Toshev", 
      from: "Sergeli",
      to: "Olmazor",
      status: "bekor_qilingan",
      time: "14:30",
      date: "2024-01-20",
      rating: null
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "faol":
        return <Badge className="bg-success text-success-foreground"><Activity className="h-3 w-3 mr-1" />Faol</Badge>;
      case "kutish":
        return <Badge className="bg-warning text-warning-foreground"><Clock className="h-3 w-3 mr-1" />Kutishda</Badge>;
      case "bloklangan":
        return <Badge variant="destructive"><Ban className="h-3 w-3 mr-1" />Bloklangan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "tugallangan":
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Tugallangan</Badge>;
      case "jarayonda":
        return <Badge className="bg-warning text-warning-foreground"><Clock className="h-3 w-3 mr-1" />Jarayonda</Badge>;
      case "bekor_qilingan":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Bekor qilingan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleEdit = () => {
    setEditForm({
      name: dispatcher.name,
      email: dispatcher.email,
      phone: dispatcher.phone,
      region: dispatcher.region,
      shift: dispatcher.shift,
      status: dispatcher.status
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editForm.name || !editForm.email || !editForm.phone) {
      toast.error("Barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    setDispatcher(prev => ({
      ...prev,
      ...editForm
    }));

    toast.success("Dispatcher ma'lumotlari yangilandi!");
    setEditDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Xabar matni kiriting!");
      return;
    }

    toast.success(`${dispatcher.name} ga xabar yuborildi!`);
    setMessageText("");
    setMessageDialogOpen(false);
  };

  const regions = [
    "Toshkent", "Andijon", "Buxoro", "Farg'ona", "Jizzax", "Xorazm", 
    "Namangan", "Navoiy", "Qashqadaryo", "Samarqand", "Sirdaryo", "Surxondaryo", "Qaraqalpog'iston"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/dispatchers')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Orqaga
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Dispatcher ma'lumotlari</h1>
          <p className="text-muted-foreground">
            {dispatcher.name} ning to'liq profili va statistikasi
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Tahrirlash
          </Button>
          <Button variant="outline" onClick={() => setMessageDialogOpen(true)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Xabar yuborish
          </Button>
        </div>
      </div>

      {/* Main Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={dispatcher.avatar} />
              <AvatarFallback className="text-lg">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{dispatcher.name}</h2>
                <p className="text-muted-foreground">{dispatcher.email}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dispatcher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dispatcher.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dispatcher.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dispatcher.shift}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {getStatusBadge(dispatcher.status)}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{dispatcher.rating}</span>
                  <span className="text-sm text-muted-foreground">reyting</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{dispatcher.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Jami buyurtmalar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{dispatcher.successfulOrders}</p>
                <p className="text-xs text-muted-foreground">Muvaffaqiyatli</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{dispatcher.cancelledOrders}</p>
                <p className="text-xs text-muted-foreground">Bekor qilingan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{dispatcher.responseTime}s</p>
                <p className="text-xs text-muted-foreground">Javob vaqti</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{dispatcher.customerSatisfaction}%</p>
                <p className="text-xs text-muted-foreground">Mijoz mamnuniyati</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
          <TabsTrigger value="analytics">Analitika</TabsTrigger>
          <TabsTrigger value="activity">Faollik</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>So'nggi buyurtmalar</CardTitle>
              <CardDescription>
                Dispatcher tomonidan boshqarilgan eng so'nggi buyurtmalar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyurtma ID</TableHead>
                    <TableHead>Mijoz</TableHead>
                    <TableHead>Marshrut</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vaqt</TableHead>
                    <TableHead>Baho</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          {order.from} → {order.to}
                        </div>
                      </TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{order.time}</p>
                          <p className="text-muted-foreground">{order.date}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-sm">{order.rating}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Oylik statistika</CardTitle>
                <CardDescription>Buyurtmalar va mijoz mamnuniyati</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="hsl(var(--primary))" name="Buyurtmalar" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buyurtmalar taqsimoti</CardTitle>
                <CardDescription>Status bo'yicha taqsimot</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {orderStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Haftalik faollik</CardTitle>
              <CardDescription>Ishlagan soatlar kunlar bo'yicha</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Soatlar"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dispatcher ma'lumotlarini tahrirlash</DialogTitle>
            <DialogDescription>
              {dispatcher.name} ning ma'lumotlarini yangilang
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Ism Familiya *</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Aziz Karimov"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="aziz@eltuvchi.uz"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefon *</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-region">Viloyat</Label>
                <Select value={editForm.region} onValueChange={(value) => setEditForm(prev => ({ ...prev, region: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Viloyatni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-shift">Ish vaqti</Label>
                <Input
                  id="edit-shift"
                  value={editForm.shift}
                  onChange={(e) => setEditForm(prev => ({ ...prev, shift: e.target.value }))}
                  placeholder="08:00 - 20:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editForm.status} onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faol">Faol</SelectItem>
                    <SelectItem value="kutish">Kutishda</SelectItem>
                    <SelectItem value="bloklangan">Bloklangan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleSaveEdit}>
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xabar yuborish</DialogTitle>
            <DialogDescription>
              {dispatcher.name} ga xabar yuboring
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Xabar matni</Label>
              <Textarea
                id="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Xabar yozing..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleSendMessage}>
              Yuborish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDispatcherDetailPage;
