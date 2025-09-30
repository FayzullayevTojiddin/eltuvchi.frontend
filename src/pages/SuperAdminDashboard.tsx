
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Car,
  Building2,
  ShoppingBag,
  TrendingUp,
  Activity,
  DollarSign,
  Store
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    totalUsers: 1250,
    totalDrivers: 450,
    totalTaxiParks: 25,
    totalOrders: 15680,
    todayRevenue: "2,500,000",
    activeOrders: 45
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">SuperAdmin Dashboard</h1>
          <p className="text-muted-foreground">
            Tizim bo'yicha umumiy statistika va boshqaruv
          </p>
        </div>
      </div>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/super-admin/users')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Foydalanuvchilar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/super-admin/drivers')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.totalDrivers}</p>
                <p className="text-xs text-muted-foreground">Haydovchilar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/super-admin/taxi-parks')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalTaxiParks}</p>
                <p className="text-xs text-muted-foreground">Takso Parklar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/super-admin/orders')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Jami buyurtmalar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-lg font-bold text-emerald-600">{stats.todayRevenue}</p>
                <p className="text-xs text-muted-foreground">Bugungi daromad</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/super-admin/market')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-pink-600" />
              <div>
                <p className="text-2xl font-bold text-pink-600">Market</p>
                <p className="text-xs text-muted-foreground">Boshqarish</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eng faol takso parklar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Eng Faol Takso Parklar
            </CardTitle>
            <CardDescription>Bu oyda eng ko'p buyurtma bajargan parklar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Yangi Avlod Takso Park</p>
                  <p className="text-sm text-muted-foreground">450 buyurtma</p>
                </div>
                <Badge variant="secondary">4.9 ⭐</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Toshkent Takso</p>
                  <p className="text-sm text-muted-foreground">380 buyurtma</p>
                </div>
                <Badge variant="secondary">4.8 ⭐</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Speed Taxi Park</p>
                  <p className="text-sm text-muted-foreground">320 buyurtma</p>
                </div>
                <Badge variant="secondary">4.7 ⭐</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tizim holati */}
        <Card>
          <CardHeader>
            <CardTitle>Tizim Holati</CardTitle>
            <CardDescription>Real vaqt statistikasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Faol buyurtmalar</span>
                <Badge variant="default" className="bg-green-500">{stats.activeOrders}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Onlayn haydovchilar</span>
                <Badge variant="default" className="bg-blue-500">320</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Kutayotgan buyurtmalar</span>
                <Badge variant="default" className="bg-orange-500">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tizim yuklanganligi</span>
                <Badge variant="default" className="bg-emerald-500">78%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
