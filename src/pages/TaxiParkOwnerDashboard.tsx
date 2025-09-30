
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock,
  Star,
  BarChart3,
  Plus,
  Eye
} from "lucide-react";

const TaxiParkOwnerDashboard = () => {
  // Mock data for statistics
  const parkStats = {
    totalDrivers: 45,
    activeDrivers: 38,
    totalRevenue: 15400000,
    monthlyRevenue: 2800000,
    completedOrders: 1250,
    averageRating: 4.8,
    totalCars: 45
  };

  const recentOrders = [
    {
      id: "001",
      driver: "Akmal Karimov",
      route: "Toshkent - Samarqand",
      price: 120000,
      status: "Completed",
      time: "2 soat oldin"
    },
    {
      id: "002", 
      driver: "Bobur Aliyev",
      route: "Andijon - Farg'ona",
      price: 85000,
      status: "In Progress",
      time: "30 daqiqa oldin"
    },
    {
      id: "003",
      driver: "Sardor Usmonov", 
      route: "Buxoro - Navoi",
      price: 95000,
      status: "Completed",
      time: "1 soat oldin"
    }
  ];

  const topDrivers = [
    { name: "Akmal Karimov", orders: 45, rating: 4.9, revenue: 890000 },
    { name: "Bobur Aliyev", orders: 38, rating: 4.8, revenue: 720000 },
    { name: "Sardor Usmonov", orders: 35, rating: 4.7, revenue: 680000 },
    { name: "Jasur Rahmonov", orders: 32, rating: 4.8, revenue: 650000 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            "Tezkor Taksi" park statistikasi va umumiy ko'rinish
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            Faol
          </Badge>
        </div>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami haydovchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkStats.totalDrivers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{parkStats.activeDrivers}</span> faol
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mashinalar</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkStats.totalCars}</div>
            <p className="text-xs text-muted-foreground">
              Jami ro'yxatga olingan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oylik daromad</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {parkStats.monthlyRevenue.toLocaleString()} so'm
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> o'tgan oydan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reyting</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              O'rtacha reyting
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daromad dinamikasi
            </CardTitle>
            <CardDescription>
              Oxirgi 6 oy davridagi daromad o'zgarishi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              <BarChart3 className="h-8 w-8 mr-2" />
              Grafik ko'rinishi
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                So'nggi buyurtmalar
              </CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Barchasini ko'rish
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{order.driver}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {order.route}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{order.price.toLocaleString()} so'm</p>
                    <Badge 
                      variant={order.status === "Completed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {order.status === "Completed" ? "Tugallangan" : "Jarayonda"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Drivers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Eng faol haydovchilar</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Barchasini ko'rish
            </Button>
          </div>
          <CardDescription>
            Oy davomida eng ko'p buyurtma bajargan haydovchilar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDrivers.map((driver, index) => (
              <div key={driver.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{driver.orders} buyurtma</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {driver.rating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{driver.revenue.toLocaleString()} so'm</p>
                  <p className="text-xs text-muted-foreground">Oylik daromad</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Oylik statistika</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Jami buyurtmalar</span>
                <span className="font-medium">{parkStats.completedOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">O'rtacha buyurtma narxi</span>
                <span className="font-medium">95,000 so'm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Faol haydovchilar</span>
                <span className="font-medium">{parkStats.activeDrivers}/{parkStats.totalDrivers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">O'rtacha reyting</span>
                <span className="font-medium">{parkStats.averageRating}/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mashina holati</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Faol mashinalar</span>
                <span className="font-medium text-green-600">38</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ta'mirlash</span>
                <span className="font-medium text-yellow-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dam olishda</span>
                <span className="font-medium text-gray-600">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Jami</span>
                <span className="font-medium">{parkStats.totalCars}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxiParkOwnerDashboard;
