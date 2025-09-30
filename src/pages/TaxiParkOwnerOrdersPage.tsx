import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Car, 
  User, 
  Phone,
  Star,
  DollarSign,
  Filter,
  Search,
  Eye
} from "lucide-react";

const TaxiParkOwnerOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data for orders connected to this taxi park
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-20",
      time: "14:30",
      from: "Toshkent",
      to: "Samarqand",
      taxi: { number: "01A123BC", model: "Chevrolet Lacetti" },
      driver: { name: "Akmal Karimov", phone: "+998901234567" },
      passenger: { name: "Jasur Rahmonov", phone: "+998907654321" },
      price: 120000,
      commission: 12000,
      netRevenue: 108000,
      status: "Tugallangan",
      rating: 5,
      distance: "280 km",
      duration: "3 soat 45 daqiqa"
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      time: "16:15",
      from: "Andijon",
      to: "Farg'ona",
      taxi: { number: "01B456DE", model: "Daewoo Gentra" },
      driver: { name: "Bobur Aliyev", phone: "+998901234568" },
      passenger: { name: "Nargiza Karimova", phone: "+998907654322" },
      price: 85000,
      commission: 8500,
      netRevenue: 76500,
      status: "Jarayonda",
      rating: null,
      distance: "120 km",
      duration: "2 soat"
    },
    {
      id: "ORD-003",
      date: "2024-01-19",
      time: "09:45",
      from: "Buxoro",
      to: "Navoi",
      taxi: { number: "01C789FG", model: "Chevrolet Spark" },
      driver: { name: "Sardor Usmonov", phone: "+998901234569" },
      passenger: { name: "Dilshod Tursunov", phone: "+998907654323" },
      price: 95000,
      commission: 9500,
      netRevenue: 85500,
      status: "Tugallangan",
      rating: 4,
      distance: "180 km",
      duration: "2 soat 30 daqiqa"
    },
    {
      id: "ORD-004",
      date: "2024-01-19",
      time: "11:20",
      from: "Toshkent",
      to: "Buxoro",
      taxi: { number: "01A123BC", model: "Chevrolet Lacetti" },
      driver: { name: "Akmal Karimov", phone: "+998901234567" },
      passenger: { name: "Muhiddin Qodirov", phone: "+998907654324" },
      price: 150000,
      commission: 15000,
      netRevenue: 135000,
      status: "Bekor qilingan",
      rating: null,
      distance: "450 km",
      duration: "5 soat"
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase().includes(statusFilter);
    
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && order.date === "2024-01-20") ||
                       (dateFilter === "yesterday" && order.date === "2024-01-19") ||
                       (dateFilter === "week" && new Date(order.date) >= new Date("2024-01-14"));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalRevenue = filteredOrders
    .filter(order => order.status === "Tugallangan")
    .reduce((sum, order) => sum + order.netRevenue, 0);

  const totalOrders = filteredOrders.length;
  const completedOrders = filteredOrders.filter(order => order.status === "Tugallangan").length;
  const inProgressOrders = filteredOrders.filter(order => order.status === "Jarayonda").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Buyurtmalar</h1>
          <p className="text-muted-foreground">
            Taksi parkingiz orqali bajarilgan buyurtmalar
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami buyurtmalar</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tugallangan</p>
                <p className="text-2xl font-bold text-success">{completedOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jarayonda</p>
                <p className="text-2xl font-bold text-warning">{inProgressOrders}</p>
              </div>
              <Car className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sof daromad</p>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} so'm</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status bo'yicha filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holatlar</SelectItem>
              <SelectItem value="tugallangan">Tugallangan</SelectItem>
              <SelectItem value="jarayonda">Jarayonda</SelectItem>
              <SelectItem value="bekor">Bekor qilingan</SelectItem>
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="bg-gradient-card border-0 shadow-card-custom hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-sm">
                      {order.id}
                    </Badge>
                    <Badge variant={
                      order.status === "Tugallangan" ? "default" : 
                      order.status === "Jarayonda" ? "secondary" : "destructive"
                    }>
                      {order.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {order.date} • {order.time}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Route Information */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Yo'nalish</h4>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.from} → {order.to}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.distance} • {order.duration}
                      </div>
                    </div>

                    {/* Taxi and Driver Info */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Taksi va haydovchi</h4>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.taxi.number}</span>
                        <span className="text-sm text-muted-foreground">({order.taxi.model})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{order.driver.name}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{order.driver.phone}</span>
                      </div>
                    </div>

                    {/* Passenger Info */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Yo'lovchi</h4>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.passenger.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{order.passenger.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="text-right space-y-3 min-w-[200px]">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{order.price.toLocaleString()} so'm</p>
                    <p className="text-sm text-muted-foreground">
                      Komissiya: {order.commission.toLocaleString()} so'm
                    </p>
                    <p className="text-lg font-semibold text-success">
                      Siz olasiz: {order.netRevenue.toLocaleString()} so'm
                    </p>
                  </div>
                  
                  {order.rating && (
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{order.rating}/5</span>
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Batafsil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Buyurtmalar topilmadi</h3>
            <p className="text-muted-foreground">
              Hozircha bu filtrlar bo'yicha buyurtmalar mavjud emas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxiParkOwnerOrdersPage;