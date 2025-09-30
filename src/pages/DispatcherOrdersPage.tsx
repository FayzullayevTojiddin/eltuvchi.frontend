
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Clock,
  MapPin,
  User,
  Phone,
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Eye
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const DispatcherOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [orderDetailDialog, setOrderDetailDialog] = useState(false);
  const [chatDialog, setChatDialog] = useState(false);
  const [assignDriverDialog, setAssignDriverDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "Alisher Karimov",
      customerPhone: "+998 90 123 45 67",
      from: "Toshkent, Yunusobod",
      to: "Samarqand, Markaz",
      departureTime: "14:30",
      arrivalTime: "17:00",
      price: 150000,
      passengers: 2,
      status: "kutayotgan",
      assignedDriver: null,
      createdAt: "2024-01-20 10:30",
      priority: "yuqori",
      description: "Tezkor borish kerak"
    },
    {
      id: "ORD-002",
      customer: "Malika Saidova",
      customerPhone: "+998 91 234 56 78",
      from: "Buxoro, Markaz",
      to: "Toshkent, Chilonzor",
      departureTime: "09:00",
      arrivalTime: "12:30",
      price: 180000,
      passengers: 1,
      status: "tayinlangan",
      assignedDriver: "Bobur Umarov",
      createdAt: "2024-01-20 08:15",
      priority: "o'rta",
      description: "Normal safar"
    },
    {
      id: "ORD-003",
      customer: "Jahongir Toshev",
      customerPhone: "+998 93 345 67 89",
      from: "Farg'ona, Quva",
      to: "Andijon, Markaz",
      departureTime: "16:00",
      arrivalTime: "17:30",
      price: 85000,
      passengers: 3,
      status: "jarayonda",
      assignedDriver: "Sardor Karimov",
      createdAt: "2024-01-20 12:00",
      priority: "past",
      description: "Oila bilan safar"
    },
    {
      id: "ORD-004",
      customer: "Nodira Abdullayeva",
      customerPhone: "+998 94 456 78 90",
      from: "Namangan, Pop",
      to: "Toshkent, Sergeli",
      departureTime: "11:30",
      arrivalTime: "15:00",
      price: 160000,
      passengers: 2,
      status: "tugallangan",
      assignedDriver: "Malika Tosheva",
      createdAt: "2024-01-19 14:20",
      priority: "o'rta",
      description: "Ishga borish"
    },
    {
      id: "ORD-005",
      customer: "Bekzod Rahimov",
      customerPhone: "+998 95 567 89 01",
      from: "Qashqadaryo, Qarshi",
      to: "Toshkent, Mirzo Ulug'bek",
      departureTime: "07:30",
      arrivalTime: "11:00",
      price: 170000,
      passengers: 1,
      status: "bekor_qilingan",
      assignedDriver: null,
      createdAt: "2024-01-20 06:45",
      priority: "yuqori",
      description: "Bekor qilingan safar"
    },
  ]);

  const availableDrivers = [
    { id: "1", name: "Bobur Umarov", status: "free" },
    { id: "2", name: "Sardor Rashidov", status: "free" },
    { id: "3", name: "Otabek Normurodov", status: "busy" },
    { id: "4", name: "Akmal Karimov", status: "free" },
    { id: "5", name: "Javohir Toshev", status: "free" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "kutayotgan":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Kutayotgan</Badge>;
      case "tayinlangan":
        return <Badge className="bg-yellow-100 text-yellow-800"><User className="h-3 w-3 mr-1" />Tayinlangan</Badge>;
      case "jarayonda":
        return <Badge className="bg-orange-100 text-orange-800"><Car className="h-3 w-3 mr-1" />Jarayonda</Badge>;
      case "tugallangan":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Tugallangan</Badge>;
      case "bekor_qilingan":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Bekor qilingan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "yuqori":
        return <Badge variant="destructive" className="text-xs">Yuqori</Badge>;
      case "o'rta":
        return <Badge variant="secondary" className="text-xs">O'rta</Badge>;
      case "past":
        return <Badge variant="outline" className="text-xs">Past</Badge>;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "priority" && order.priority === "yuqori") ||
                         (selectedFilter === "unassigned" && !order.assignedDriver);
    return matchesSearch && matchesStatus && matchesFilter;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "kutayotgan").length,
    assigned: orders.filter(o => o.status === "tayinlangan").length,
    inProgress: orders.filter(o => o.status === "jarayonda").length,
    completed: orders.filter(o => o.status === "tugallangan").length,
    cancelled: orders.filter(o => o.status === "bekor_qilingan").length,
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailDialog(true);
  };

  const handleChatOpen = (order) => {
    setSelectedOrder(order);
    setChatDialog(true);
  };

  const handleAssignDriver = (order) => {
    setSelectedOrder(order);
    setAssignDriverDialog(true);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setCancelDialog(true);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    toast.success(`${selectedOrder.customer} ga xabar yuborildi!`);
    setChatMessage("");
    setChatDialog(false);
  };

  const handleDriverAssignment = () => {
    if (!selectedDriver) return;

    const driverName = availableDrivers.find(d => d.id === selectedDriver)?.name;
    
    setOrders(prev =>
      prev.map(order =>
        order.id === selectedOrder.id
          ? { ...order, assignedDriver: driverName, status: "tayinlangan" }
          : order
      )
    );

    toast.success(`${driverName} haydovchi ${selectedOrder.id} buyurtmaga tayinlandi`);
    setAssignDriverDialog(false);
    setSelectedDriver("");
  };

  const handleOrderCancel = () => {
    if (!cancelReason.trim()) return;

    setOrders(prev =>
      prev.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: "bekor_qilingan" }
          : order
      )
    );

    toast.success(`${selectedOrder.id} buyurtma bekor qilindi`);
    setCancelDialog(false);
    setCancelReason("");
  };

  const handleCall = (phone) => {
    toast.success(`${phone} raqamiga qo'ng'iroq amalga oshirilmoqda...`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Buyurtmalar boshqaruvi</h1>
          <p className="text-muted-foreground">Barcha buyurtmalarni kuzatib boring va boshqaring</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Jami</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Kutayotgan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.assigned}</p>
              <p className="text-xs text-muted-foreground">Tayinlangan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
              <p className="text-xs text-muted-foreground">Jarayonda</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Tugallangan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-xs text-muted-foreground">Bekor qilingan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buyurtma ID, mijoz yoki manzil qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status bo'yicha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha statuslar</SelectItem>
            <SelectItem value="kutayotgan">Kutayotgan</SelectItem>
            <SelectItem value="tayinlangan">Tayinlangan</SelectItem>
            <SelectItem value="jarayonda">Jarayonda</SelectItem>
            <SelectItem value="tugallangan">Tugallangan</SelectItem>
            <SelectItem value="bekor_qilingan">Bekor qilingan</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtr" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha buyurtmalar</SelectItem>
            <SelectItem value="priority">Yuqori prioritet</SelectItem>
            <SelectItem value="unassigned">Tayinlanmagan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar ro'yxati</CardTitle>
          <CardDescription>
            Barcha buyurtmalar va ularning holati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyurtma</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Marshrut</TableHead>
                <TableHead>Vaqt</TableHead>
                <TableHead>Haydovchi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Narx</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(order.priority)}
                        <span className="text-xs text-muted-foreground">
                          {order.passengers} kishi
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <button 
                          onClick={() => handleCall(order.customerPhone)}
                          className="hover:text-primary cursor-pointer"
                        >
                          {order.customerPhone}
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-green-600" />
                        {order.from}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-red-600" />
                        {order.to}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>Jo'nash: {order.departureTime}</div>
                      <div className="text-muted-foreground">Yetish: {order.arrivalTime}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.assignedDriver ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{order.assignedDriver}</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Tayinlanmagan
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="font-medium">
                    {order.price.toLocaleString()} so'm
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className="h-4 w-4" />
                          Batafsil
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleChatOpen(order)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Chat ochish
                        </DropdownMenuItem>
                        {order.status === "kutayotgan" && (
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => handleAssignDriver(order)}
                          >
                            <User className="h-4 w-4" />
                            Haydovchi tayinlash
                          </DropdownMenuItem>
                        )}
                        {order.status !== "tugallangan" && order.status !== "bekor_qilingan" && (
                          <DropdownMenuItem 
                            className="gap-2 text-destructive"
                            onClick={() => handleCancelOrder(order)}
                          >
                            <XCircle className="h-4 w-4" />
                            Bekor qilish
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={orderDetailDialog} onOpenChange={setOrderDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Buyurtma ma'lumotlari</DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} buyurtmasining to'liq ma'lumoti
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mijoz</Label>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <Label>Telefon</Label>
                  <p className="font-medium">{selectedOrder.customerPhone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Qayerdan</Label>
                  <p className="font-medium">{selectedOrder.from}</p>
                </div>
                <div>
                  <Label>Qayerga</Label>
                  <p className="font-medium">{selectedOrder.to}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Jo'nash vaqti</Label>
                  <p className="font-medium">{selectedOrder.departureTime}</p>
                </div>
                <div>
                  <Label>Yetish vaqti</Label>
                  <p className="font-medium">{selectedOrder.arrivalTime}</p>
                </div>
                <div>
                  <Label>Yo'lovchilar</Label>
                  <p className="font-medium">{selectedOrder.passengers} kishi</p>
                </div>
              </div>
              <div>
                <Label>Tavsif</Label>
                <p className="font-medium">{selectedOrder.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Narx</Label>
                  <p className="font-medium">{selectedOrder.price.toLocaleString()} so'm</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>
              {selectedOrder.assignedDriver && (
                <div>
                  <Label>Tayinlangan haydovchi</Label>
                  <p className="font-medium">{selectedOrder.assignedDriver}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={chatDialog} onOpenChange={setChatDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedOrder?.customer} bilan chat
            </DialogTitle>
            <DialogDescription>
              Buyurtma #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Xabar yozing</Label>
              <Textarea
                id="message"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Xabar yozing..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChatDialog(false)}>
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
            <Button onClick={handleDriverAssignment}>
              Tayinlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Dialog */}
      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Buyurtmani bekor qilish
            </DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} buyurtmasini bekor qilish sababi
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Bekor qilish sababi</Label>
              <Textarea
                id="reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Buyurtmani bekor qilish sababini kiriting..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(false)}>
              Bekor qilish
            </Button>
            <Button variant="destructive" onClick={handleOrderCancel}>
              Buyurtmani bekor qilish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DispatcherOrdersPage;
