
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Car,
  UserCheck,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaxiParkAdminDashboard = () => {
  const navigate = useNavigate();

  // Demo ma'lumotlar
  const taxiParkInfo = {
    name: "Yangi Avlod Takso Park",
    license: "TP-2024-001",
    address: "Toshkent sh., Chilonzor t., Bunyodkor ko'chasi 1-uy",
    phone: "+998 71 123 45 67",
    totalDrivers: 45,
    activeDrivers: 38,
    blockedDrivers: 3,
    totalDispatchers: 5,
    activeDispatchers: 4
  };

  const recentActivity = [
    {
      id: 1,
      type: "driver_added",
      message: "Yangi haydovchi qo'shildi: Olim Karimov",
      dispatcher: "Malika Tosheva",
      time: "2 soat oldin"
    },
    {
      id: 2,
      type: "driver_blocked",
      message: "Haydovchi bloklandi: Sardor Umarov",
      dispatcher: "Bobur Hakimov",
      time: "4 soat oldin"
    },
    {
      id: 3,
      type: "order_completed",
      message: "50+ buyurtma yakunlandi",
      dispatcher: "Sistema",
      time: "6 soat oldin"
    }
  ];

  const topPerformers = [
    { name: "Aziz Mahmudov", orders: 28, rating: 4.9 },
    { name: "Jasur Toshev", orders: 25, rating: 4.8 },
    { name: "Bekzod Karimov", orders: 23, rating: 4.7 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Takso Park Boshqaruvi</h1>
          <p className="text-muted-foreground">
            {taxiParkInfo.name} - Umumiy ma'lumotlar va statistika
          </p>
        </div>

        {/* Takso park ma'lumotlari */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Takso Park Ma'lumotlari
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nomi</p>
                <p className="font-medium">{taxiParkInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Litsenziya</p>
                <p className="font-medium">{taxiParkInfo.license}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Manzil</p>
                <p className="font-medium">{taxiParkInfo.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">{taxiParkInfo.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/taxi-park/drivers')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{taxiParkInfo.totalDrivers}</p>
                <p className="text-xs text-muted-foreground">Jami haydovchilar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{taxiParkInfo.activeDrivers}</p>
                <p className="text-xs text-muted-foreground">Faol haydovchilar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/taxi-park/dispatchers')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{taxiParkInfo.totalDispatchers}</p>
                <p className="text-xs text-muted-foreground">Dispatcherlar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{taxiParkInfo.blockedDrivers}</p>
                <p className="text-xs text-muted-foreground">Bloklangan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eng yaxshi haydovchilar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Eng Faol Haydovchilar
            </CardTitle>
            <CardDescription>Bu oyda eng ko'p buyurtma bajargan haydovchilar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-muted-foreground">{performer.orders} buyurtma</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{performer.rating} ⭐</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* So'nggi faoliyat */}
        <Card>
          <CardHeader>
            <CardTitle>So'nggi Faoliyat</CardTitle>
            <CardDescription>Takso parkdagi oxirgi hodisalar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    {activity.type === 'driver_added' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === 'driver_blocked' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                    {activity.type === 'order_completed' && <Activity className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">Dispatcher: {activity.dispatcher}</p>
                      <p className="text-xs text-muted-foreground">• {activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxiParkAdminDashboard;
