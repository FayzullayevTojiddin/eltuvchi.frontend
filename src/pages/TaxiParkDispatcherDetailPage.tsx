
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Users,
  Ban,
  CheckCircle,
  Car,
  User,
  AlertTriangle
} from "lucide-react";

const TaxiParkDispatcherDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Demo dispatcher ma'lumoti
  const dispatcher = {
    id: 1,
    name: "Malika Tosheva",
    email: "malika@taxipark.uz",
    phone: "+998 91 234 56 78",
    status: "faol",
    joinDate: "2024-01-15",
    totalDriversAdded: 12,
    totalDriversBlocked: 2,
    totalOrders: 203,
    avatar: "/placeholder.svg"
  };

  // Dispatcher tomonidan qo'shilgan haydovchilar
  const addedDrivers = [
    {
      id: 1,
      name: "Olim Karimov",
      phone: "+998 90 123 45 67",
      carNumber: "01A234BC",
      status: "faol",
      addedDate: "2024-01-20",
      totalOrders: 145
    },
    {
      id: 2,
      name: "Jasur Toshev",
      phone: "+998 93 345 67 89",
      carNumber: "01C456DE", 
      status: "faol",
      addedDate: "2024-02-10",
      totalOrders: 203
    },
    {
      id: 3,
      name: "Sardor Umarov",
      phone: "+998 91 234 56 78",
      carNumber: "01B345CD",
      status: "bloklangan",
      addedDate: "2024-02-01",
      blockedDate: "2024-03-15",
      totalOrders: 89
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "faol":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Faol</Badge>;
      case "bloklangan":
        return <Badge className="bg-red-100 text-red-800"><Ban className="h-3 w-3 mr-1" />Bloklangan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/taxi-park/dispatchers')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Orqaga
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Dispatcher Ma'lumotlari</h1>
          <p className="text-muted-foreground">{dispatcher.name} - Batafsil ma'lumot</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dispatcher ma'lumotlari */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Shaxsiy Ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={dispatcher.avatar} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{dispatcher.name}</h3>
                {getStatusBadge(dispatcher.status)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{dispatcher.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{dispatcher.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Qo'shilgan: {dispatcher.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistika */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Faoliyat Statistikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">{dispatcher.totalDriversAdded}</p>
                <p className="text-sm text-muted-foreground">Qo'shgan haydovchilar</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <p className="text-2xl font-bold text-red-600">{dispatcher.totalDriversBlocked}</p>
                <p className="text-sm text-muted-foreground">Bloklagan</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{addedDrivers.filter(d => d.status === 'faol').length}</p>
                <p className="text-sm text-muted-foreground">Faol haydovchilar</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Car className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-600">{dispatcher.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Qo'shilgan haydovchilar */}
      <Card>
        <CardHeader>
          <CardTitle>Qo'shilgan Haydovchilar</CardTitle>
          <CardDescription>
            {dispatcher.name} tomonidan qo'shilgan barcha haydovchilar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Haydovchi</TableHead>
                <TableHead>Mashina raqami</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Qo'shilgan sana</TableHead>
                <TableHead>Bloklangan sana</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addedDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {driver.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{driver.carNumber}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell className="font-medium">{driver.totalOrders}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {driver.addedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {driver.status === "bloklangan" && driver.blockedDate ? (
                      <div className="flex items-center gap-1 text-sm text-red-600">
                        <AlertTriangle className="h-3 w-3" />
                        {driver.blockedDate}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxiParkDispatcherDetailPage;
