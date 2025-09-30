import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Phone, 
  Car, 
  Star, 
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  FileText
} from "lucide-react";

const TaxiParkDriverDetail = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();

  // Mock driver data
  const driver = {
    id: parseInt(driverId || "1"),
    name: "Akmal Karimov",
    phone: "+998901234567",
    license: "AA1234567",
    car: "Chevrolet Lacetti",
    carNumber: "01A123BC",
    rating: 4.9,
    totalOrders: 245,
    completedOrders: 240,
    cancelledOrders: 5,
    status: "active",
    joinDate: "2024-01-15",
    totalEarnings: 5400000,
    thisMonthEarnings: 890000,
    isBlocked: false,
    avatar: "",
    address: "Toshkent sh., Chilonzor t.",
    birthDate: "1985-05-15",
    experience: "8 yil"
  };

  // Mock orders data
  const recentOrders = [
    {
      id: "001",
      date: "2024-12-20",
      time: "14:30",
      from: "Toshkent",
      to: "Samarqand",
      client: "Aziz Karimov",
      price: 120000,
      status: "completed",
      rating: 5,
      comment: "Juda yaxshi xizmat, tez va xavfsiz"
    },
    {
      id: "002", 
      date: "2024-12-20",
      time: "09:15",
      from: "Andijon",
      to: "Farg'ona",
      client: "Nodira Umarova",
      price: 85000,
      status: "completed",
      rating: 5,
      comment: "Zo'r haydovchi, tavsiya qilaman"
    },
    {
      id: "003",
      date: "2024-12-19",
      time: "16:45",
      from: "Buxoro",
      to: "Navoi",
      client: "Jasur Rahmonov",
      price: 95000,
      status: "completed", 
      rating: 4,
      comment: "Yaxshi xizmat"
    },
    {
      id: "004",
      date: "2024-12-19",
      time: "11:20",
      from: "Qarshi",
      to: "Toshkent",
      client: "Malika Tosheva",
      price: 140000,
      status: "cancelled",
      rating: 0,
      comment: "Haydovchi kech keldi"
    },
    {
      id: "005",
      date: "2024-12-18",
      time: "13:10",
      from: "Namangan",
      to: "Toshkent",
      client: "Sardor Aliyev",
      price: 110000,
      status: "completed",
      rating: 5,
      comment: "Mukammal xizmat"
    }
  ];

  const monthlyEarnings = [
    { month: "Yanvar", earnings: 750000, orders: 45 },
    { month: "Fevral", earnings: 820000, orders: 52 },
    { month: "Mart", earnings: 680000, orders: 41 },
    { month: "Aprel", earnings: 920000, orders: 58 },
    { month: "May", earnings: 870000, orders: 55 },
    { month: "Iyun", earnings: 950000, orders: 62 },
    { month: "Iyul", earnings: 1120000, orders: 71 },
    { month: "Avgust", earnings: 980000, orders: 64 },
    { month: "Sentabr", earnings: 890000, orders: 56 },
    { month: "Oktabr", earnings: 1050000, orders: 68 },
    { month: "Noyabr", earnings: 920000, orders: 59 },
    { month: "Dekabr", earnings: 890000, orders: 54 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/taxi-park-owner/drivers")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Orqaga
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Haydovchi tafsilotlari</h1>
          <p className="text-muted-foreground">
            {driver.name} haqida to'liq ma'lumot
          </p>
        </div>
      </div>

      {/* Driver Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{driver.name}</h2>
                {driver.status === "active" && !driver.isBlocked && <Badge variant="default">Faol</Badge>}
                {driver.isBlocked && <Badge variant="destructive">Bloklangan</Badge>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>{driver.car} ({driver.carNumber})</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Guvohnoma: {driver.license}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Qo'shilgan: {driver.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{driver.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Reyting</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
                <p className="text-2xl font-bold">{driver.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Tugallangan</p>
                <p className="text-2xl font-bold text-green-600">{driver.completedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Bekor qilingan</p>
                <p className="text-2xl font-bold text-red-600">{driver.cancelledOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Jami daromad</p>
                <p className="text-2xl font-bold">{driver.totalEarnings.toLocaleString()} so'm</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Buyurtmalar tarixi</TabsTrigger>
          <TabsTrigger value="earnings">Daromad statistikasi</TabsTrigger>
          <TabsTrigger value="profile">Shaxsiy ma'lumotlar</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>So'nggi buyurtmalar</CardTitle>
              <CardDescription>
                Haydovchining oxirgi 30 kun ichidagi buyurtmalari
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{order.id}
                        </Badge>
                        <span className="font-medium">{order.client}</span>
                        <Badge 
                          variant={order.status === "completed" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {order.status === "completed" ? "Tugallangan" : "Bekor qilingan"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {order.from} - {order.to}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {order.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {order.time}
                        </div>
                      </div>
                      {order.comment && (
                        <p className="text-sm text-muted-foreground italic">
                          "{order.comment}"
                        </p>
                      )}
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-lg">{order.price.toLocaleString()} so'm</p>
                      {order.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{order.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oylik daromad statistikasi</CardTitle>
              <CardDescription>
                2024-yil davomidagi oylik daromad va buyurtmalar soni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEarnings.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{month.month}</h4>
                      <p className="text-sm text-muted-foreground">
                        {month.orders} buyurtma
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{month.earnings.toLocaleString()} so'm</p>
                      <p className="text-xs text-muted-foreground">
                        O'rtacha: {Math.round(month.earnings / month.orders).toLocaleString()} so'm/buyurtma
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">To'liq ismi</Label>
                  <p className="text-sm">{driver.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Telefon raqami</Label>
                  <p className="text-sm">{driver.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Manzil</Label>
                  <p className="text-sm">{driver.address}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tug'ilgan sana</Label>
                  <p className="text-sm">{driver.birthDate}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tajriba</Label>
                  <p className="text-sm">{driver.experience}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transport ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Mashina modeli</Label>
                  <p className="text-sm">{driver.car}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Davlat raqami</Label>
                  <p className="text-sm">{driver.carNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Haydovchilik guvohnomasi</Label>
                  <p className="text-sm">{driver.license}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Holati</Label>
                  <div className="flex items-center gap-2">
                    {driver.status === "active" && !driver.isBlocked && <Badge variant="default">Faol</Badge>}
                    {driver.isBlocked && <Badge variant="destructive">Bloklangan</Badge>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ro'yxatdan o'tgan sana</Label>
                  <p className="text-sm">{driver.joinDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

export default TaxiParkDriverDetail;