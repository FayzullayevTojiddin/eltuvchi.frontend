import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  User, 
  Phone,
  Star,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Ban,
  CheckCircle
} from "lucide-react";

const TaxiParkOwnerTaxisPage = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for taxis in this park
  const taxis = [
    {
      id: 1,
      number: "01A123BC",
      model: "Chevrolet Lacetti",
      year: 2020,
      color: "Oq",
      driver: {
        name: "Akmal Karimov",
        phone: "+998901234567",
        email: "akmal@gmail.com",
        experience: 5
      },
      status: "Faol",
      orders: 45,
      monthlyOrders: 28,
      rating: 4.9,
      monthlyRevenue: 890000,
      totalRevenue: 5400000,
      registeredAt: "2024-01-15",
      lastActive: "2024-01-20 14:30"
    },
    {
      id: 2,
      number: "01B456DE",
      model: "Daewoo Gentra",
      year: 2019,
      color: "Kulrang",
      driver: {
        name: "Bobur Aliyev",
        phone: "+998901234568",
        email: "bobur@gmail.com",
        experience: 3
      },
      status: "Faol",
      orders: 38,
      monthlyOrders: 22,
      rating: 4.7,
      monthlyRevenue: 720000,
      totalRevenue: 2160000,
      registeredAt: "2024-02-01",
      lastActive: "2024-01-20 16:15"
    },
    {
      id: 3,
      number: "01C789FG",
      model: "Chevrolet Spark",
      year: 2021,
      color: "Qora",
      driver: {
        name: "Sardor Usmonov",
        phone: "+998901234569",
        email: "sardor@gmail.com",
        experience: 7
      },
      status: "Band",
      orders: 35,
      monthlyOrders: 18,
      rating: 4.8,
      monthlyRevenue: 680000,
      totalRevenue: 2720000,
      registeredAt: "2024-01-20",
      lastActive: "2024-01-20 11:45"
    },
    {
      id: 4,
      number: "01D321GH",
      model: "Chevrolet Cobalt",
      year: 2022,
      color: "Ko'k",
      driver: {
        name: "Jasur Rahmonov",
        phone: "+998901234570",
        email: "jasur@gmail.com",
        experience: 2
      },
      status: "Bloklangan",
      orders: 12,
      monthlyOrders: 0,
      rating: 4.5,
      monthlyRevenue: 0,
      totalRevenue: 360000,
      registeredAt: "2024-01-10",
      lastActive: "2024-01-18 09:20"
    }
  ];

  const filteredTaxis = taxis.filter(taxi => {
    const matchesSearch = taxi.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         taxi.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         taxi.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || taxi.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddTaxi = () => {
    toast({
      title: "Taksi qo'shildi",
      description: "Yangi taksi muvaffaqiyatli ro'yxatga olindi",
    });
    setIsAddDialogOpen(false);
  };

  const handleBlockTaxi = (taxiId: number) => {
    toast({
      title: "Taksi bloklandi",
      description: "Taksi vaqtincha faoliyatdan to'xtatildi",
      variant: "destructive",
    });
  };

  const handleActivateTaxi = (taxiId: number) => {
    toast({
      title: "Taksi faollashtirildi",
      description: "Taksi yana faoliyat boshlashi mumkin",
    });
  };

  const totalTaxis = taxis.length;
  const activeTaxis = taxis.filter(taxi => taxi.status === "Faol").length;
  const blockedTaxis = taxis.filter(taxi => taxi.status === "Bloklangan").length;
  const totalRevenue = taxis.reduce((sum, taxi) => sum + taxi.monthlyRevenue, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Taksilarim</h1>
          <p className="text-muted-foreground">
            Taksi parkingizga tegishli taksilar va haydovchilar
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Yangi taksi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yangi taksi qo'shish</DialogTitle>
              <DialogDescription>
                Yangi taksi va haydovchi ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="car-number">Davlat raqami</Label>
                  <Input id="car-number" placeholder="01A123BC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="car-model">Mashina modeli</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Modelni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lacetti">Chevrolet Lacetti</SelectItem>
                      <SelectItem value="gentra">Daewoo Gentra</SelectItem>
                      <SelectItem value="spark">Chevrolet Spark</SelectItem>
                      <SelectItem value="cobalt">Chevrolet Cobalt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="car-year">Ishlab chiqarilgan yili</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Yilni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="car-color">Rangi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rangni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oq">Oq</SelectItem>
                      <SelectItem value="qora">Qora</SelectItem>
                      <SelectItem value="kulrang">Kulrang</SelectItem>
                      <SelectItem value="ko'k">Ko'k</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-name">Haydovchi ismi</Label>
                  <Input id="driver-name" placeholder="Haydovchi ismini kiriting" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-phone">Telefon raqami</Label>
                  <Input id="driver-phone" placeholder="+998901234567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input id="driver-email" type="email" placeholder="driver@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-experience">Tajriba (yil)</Label>
                  <Input id="driver-experience" type="number" placeholder="5" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddTaxi}>
                Qo'shish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami taksilar</p>
                <p className="text-2xl font-bold">{totalTaxis}</p>
              </div>
              <Car className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Faol taksilar</p>
                <p className="text-2xl font-bold text-success">{activeTaxis}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bloklangan</p>
                <p className="text-2xl font-bold text-warning">{blockedTaxis}</p>
              </div>
              <Ban className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Oylik daromad</p>
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
              <SelectItem value="faol">Faol</SelectItem>
              <SelectItem value="band">Band</SelectItem>
              <SelectItem value="bloklangan">Bloklangan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Taxis Grid */}
      <div className="grid gap-6">
        {filteredTaxis.map((taxi) => (
          <Card key={taxi.id} className="bg-gradient-card border-0 shadow-card-custom hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6 flex-1">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{taxi.number}</h3>
                      <Badge variant={
                        taxi.status === "Faol" ? "default" : 
                        taxi.status === "Band" ? "secondary" : "destructive"
                      }>
                        {taxi.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Car Information */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Mashina haqida</h4>
                        <p className="font-medium">{taxi.model}</p>
                        <p className="text-sm text-muted-foreground">{taxi.year} • {taxi.color}</p>
                        <p className="text-xs text-muted-foreground">
                          Ro'yxatga olingan: {new Date(taxi.registeredAt).toLocaleDateString('uz-UZ')}
                        </p>
                      </div>

                      {/* Driver Information */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Haydovchi</h4>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{taxi.driver.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{taxi.driver.phone}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tajriba: {taxi.driver.experience} yil
                        </p>
                      </div>

                      {/* Performance */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Ko'rsatkichlar</h4>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{taxi.rating}/5.0</span>
                        </div>
                        <p className="text-sm">
                          Bu oy: <strong>{taxi.monthlyOrders}</strong> buyurtma
                        </p>
                        <p className="text-sm">
                          Jami: <strong>{taxi.orders}</strong> buyurtma
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-3 min-w-[200px]">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{taxi.monthlyRevenue.toLocaleString()} so'm</p>
                    <p className="text-sm text-muted-foreground">Bu oylik daromad</p>
                    <p className="text-sm text-muted-foreground">
                      Jami: {taxi.totalRevenue.toLocaleString()} so'm
                    </p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Oxirgi faoliyat: {taxi.lastActive}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Batafsil
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {taxi.status === "Bloklangan" ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleActivateTaxi(taxi.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleBlockTaxi(taxi.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTaxis.length === 0 && (
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-12 text-center">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Taksilar topilmadi</h3>
            <p className="text-muted-foreground">
              Hozircha bu filtrlar bo'yicha taksilar mavjud emas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxiParkOwnerTaxisPage;