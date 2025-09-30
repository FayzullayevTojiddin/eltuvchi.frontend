
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Search,
  MoreVertical,
  Edit,
  Ban,
  CheckCircle,
  Phone,
  Car,
  Calendar,
  User,
  AlertTriangle,
  Activity
} from "lucide-react";

const TaxiParkDriversPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddingDriver, setIsAddingDriver] = useState(false);

  // Demo haydovchilar ma'lumotlari
  const drivers = [
    {
      id: 1,
      name: "Olim Karimov",
      phone: "+998 90 123 45 67",
      carNumber: "01A234BC",
      carModel: "Chevrolet Nexia",
      status: "faol",
      totalOrders: 145,
      rating: 4.8,
      joinDate: "2024-01-15",
      addedBy: "Malika Tosheva",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sardor Umarov", 
      phone: "+998 91 234 56 78",
      carNumber: "01B345CD",
      carModel: "Daewoo Nexia",
      status: "bloklangan",
      totalOrders: 89,
      rating: 4.2,
      joinDate: "2024-02-01",
      addedBy: "Bobur Hakimov",
      blockedBy: "Malika Tosheva",
      blockedDate: "2024-03-15",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Jasur Toshev",
      phone: "+998 93 345 67 89", 
      carNumber: "01C456DE",
      carModel: "Chevrolet Spark",
      status: "faol",
      totalOrders: 203,
      rating: 4.9,
      joinDate: "2024-01-20",
      addedBy: "Nodira Abdullayeva",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Bekzod Karimov",
      phone: "+998 94 456 78 90",
      carNumber: "01D567EF", 
      carModel: "Daewoo Matiz",
      status: "dam_olish",
      totalOrders: 167,
      rating: 4.6,
      joinDate: "2024-02-10",
      addedBy: "Malika Tosheva",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "faol":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Faol</Badge>;
      case "dam_olish":
        return <Badge className="bg-yellow-100 text-yellow-800"><Activity className="h-3 w-3 mr-1" />Dam olish</Badge>;
      case "bloklangan":
        return <Badge className="bg-red-100 text-red-800"><Ban className="h-3 w-3 mr-1" />Bloklangan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm) ||
                         driver.carNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || driver.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Haydovchilar</h1>
          <p className="text-muted-foreground">Takso park haydovchilarini boshqaring</p>
        </div>
        <Dialog open={isAddingDriver} onOpenChange={setIsAddingDriver}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Haydovchi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi haydovchi qo'shish</DialogTitle>
              <DialogDescription>
                Yangi haydovchi ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="driverName">To'liq ismi</Label>
                <Input id="driverName" placeholder="Ism Familiya" />
              </div>
              <div>
                <Label htmlFor="driverPhone">Telefon raqami</Label>
                <Input id="driverPhone" placeholder="+998 90 123 45 67" />
              </div>
              <div>
                <Label htmlFor="carNumber">Mashina raqami</Label>
                <Input id="carNumber" placeholder="01A234BC" />
              </div>
              <div>
                <Label htmlFor="carModel">Mashina modeli</Label>
                <Input id="carModel" placeholder="Chevrolet Nexia" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsAddingDriver(false)} className="flex-1">
                  Qo'shish
                </Button>
                <Button variant="outline" onClick={() => setIsAddingDriver(false)} className="flex-1">
                  Bekor qilish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Qidiruv va filtrlash */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Haydovchi qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Haydovchilar jadvali */}
      <Card>
        <CardHeader>
          <CardTitle>Haydovchilar ro'yxati</CardTitle>
          <CardDescription>
            Barcha haydovchilar va ularning ma'lumotlari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Haydovchi</TableHead>
                <TableHead>Mashina</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Reyting</TableHead>
                <TableHead>Qo'shgan</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {driver.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{driver.carNumber}</p>
                        <p className="text-sm text-muted-foreground">{driver.carModel}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(driver.status)}
                    {driver.status === "bloklangan" && driver.blockedBy && (
                      <div className="mt-1">
                        <p className="text-xs text-red-600">Bloklagan: {driver.blockedBy}</p>
                        <p className="text-xs text-muted-foreground">{driver.blockedDate}</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{driver.totalOrders}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{driver.rating} ⭐</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{driver.addedBy}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {driver.joinDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Tahrirlash
                        </DropdownMenuItem>
                        {driver.status === "faol" ? (
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Ban className="h-4 w-4" />
                            Bloklash
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            Faollashtirish
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
    </div>
  );
};

export default TaxiParkDriversPage;
