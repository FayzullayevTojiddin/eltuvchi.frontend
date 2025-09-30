import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  Building2, 
  Users, 
  Car, 
  Phone, 
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Eye,
  Star,
  Filter,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTaxiParkDetailPage = () => {
  const { parkId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter states
  const [driverSearch, setDriverSearch] = useState("");
  const [driverStatusFilter, setDriverStatusFilter] = useState("all");
  const [taxiSearch, setTaxiSearch] = useState("");
  const [taxiStatusFilter, setTaxiStatusFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // Dialog states
  const [isAddDriverDialogOpen, setIsAddDriverDialogOpen] = useState(false);
  const [isAddTaxiDialogOpen, setIsAddTaxiDialogOpen] = useState(false);

  // Mock taxi park data
  const taxiPark = {
    id: parseInt(parkId || "1"),
    name: "Tezkor Taksi Park",
    owner: "Akmal Karimov",
    email: "akmal@tezkortaksi.uz",
    phone: "+998901234567",
    address: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi 45",
    totalTaxis: 25,
    activeTaxis: 23,
    totalDrivers: 25,
    activeDrivers: 23,
    monthlyRevenue: 45000000,
    totalOrders: 1250,
    completedOrders: 1180,
    status: "Faol",
    createdAt: "2024-01-15",
    regions: ["Toshkent", "Samarqand", "Buxoro"]
  };

  // Mock drivers data
  const drivers = [
    {
      id: 1,
      name: "Akmal Karimov",
      phone: "+998901234567",
      license: "AA1234567",
      car: "Chevrolet Lacetti",
      carNumber: "01A123BC",
      rating: 4.9,
      totalOrders: 245,
      completedOrders: 230,
      status: "Faol",
      joinDate: "2024-01-15",
      isBlocked: false
    },
    {
      id: 2,
      name: "Bobur Aliyev",
      phone: "+998901234568",
      license: "BB2345678",
      car: "Chevrolet Nexia",
      carNumber: "01B456CD",
      rating: 4.7,
      totalOrders: 189,
      completedOrders: 175,
      status: "Faol",
      joinDate: "2024-02-10",
      isBlocked: false
    },
    {
      id: 3,
      name: "Sardor Usmonov",
      phone: "+998901234569",
      license: "CC3456789",
      car: "Chevrolet Cobalt",
      carNumber: "01C789EF",
      rating: 4.5,
      totalOrders: 156,
      completedOrders: 140,
      status: "Bloklangan",
      joinDate: "2024-03-05",
      isBlocked: true
    }
  ];

  // Mock taxis data
  const taxis = [
    {
      id: 1,
      model: "Chevrolet Lacetti",
      number: "01A123BC",
      year: 2018,
      color: "Oq",
      driver: "Akmal Karimov",
      status: "Faol",
      lastService: "2024-11-15"
    },
    {
      id: 2,
      model: "Chevrolet Nexia", 
      number: "01B456CD",
      year: 2019,
      color: "Kulrang",
      driver: "Bobur Aliyev",
      status: "Faol",
      lastService: "2024-11-10"
    },
    {
      id: 3,
      model: "Chevrolet Cobalt",
      number: "01C789EF",
      year: 2020,
      color: "Qora",
      driver: "Sardor Usmonov",
      status: "Texnik xizmat",
      lastService: "2024-12-01"
    }
  ];

  // Mock orders data
  const orders = [
    {
      id: "ORD001",
      driver: "Akmal Karimov",
      customer: "Javlon Rahimov",
      from: "Toshkent",
      to: "Samarqand",
      price: 120000,
      status: "Tugallangan",
      date: "2024-12-15",
      time: "14:30"
    },
    {
      id: "ORD002",
      driver: "Bobur Aliyev", 
      customer: "Malika Nazarova",
      from: "Andijon",
      to: "Farg'ona",
      price: 85000,
      status: "Jarayonda",
      date: "2024-12-15",
      time: "16:15"
    },
    {
      id: "ORD003",
      driver: "Sardor Usmonov",
      customer: "Dilshod Karimov",
      from: "Buxoro",
      to: "Navoi", 
      price: 95000,
      status: "Bekor qilingan",
      date: "2024-12-14",
      time: "10:20"
    }
  ];

  // Filter functions
  const filteredDrivers = drivers.filter(driver => {
    const nameMatch = driver.name.toLowerCase().includes(driverSearch.toLowerCase());
    const statusMatch = driverStatusFilter === "all" || 
      (driverStatusFilter === "active" && !driver.isBlocked) ||
      (driverStatusFilter === "blocked" && driver.isBlocked);
    return nameMatch && statusMatch;
  });

  const filteredTaxis = taxis.filter(taxi => {
    const modelMatch = taxi.model.toLowerCase().includes(taxiSearch.toLowerCase()) ||
      taxi.number.toLowerCase().includes(taxiSearch.toLowerCase());
    const statusMatch = taxiStatusFilter === "all" || taxi.status === taxiStatusFilter;
    return modelMatch && statusMatch;
  });

  const filteredOrders = orders.filter(order => {
    const searchMatch = order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.driver.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customer.toLowerCase().includes(orderSearch.toLowerCase());
    const statusMatch = orderStatusFilter === "all" || order.status === orderStatusFilter;
    return searchMatch && statusMatch;
  });

  const handleBlockDriver = (driverId: number, isBlocked: boolean) => {
    const action = isBlocked ? "faollashtirildi" : "bloklandi";
    toast({
      title: "Haydovchi holati o'zgartirildi",
      description: `Haydovchi ${action}`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Faol":
        return <Badge variant="default" className="bg-green-500">Faol</Badge>;
      case "Bloklangan":
        return <Badge variant="destructive">Bloklangan</Badge>;
      case "Texnik xizmat":
        return <Badge variant="secondary">Texnik xizmat</Badge>;
      case "Tugallangan":
        return <Badge variant="default" className="bg-green-500">Tugallangan</Badge>;
      case "Jarayonda":
        return <Badge variant="secondary" className="bg-blue-500">Jarayonda</Badge>;
      case "Bekor qilingan":
        return <Badge variant="destructive">Bekor qilingan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/taxi-parks")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Orqaga
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{taxiPark.name}</h1>
          <p className="text-muted-foreground">
            Taksi park haqida to'liq ma'lumot va boshqaruv
          </p>
        </div>
      </div>

      {/* Park Info Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">{taxiPark.name}</CardTitle>
                <Badge variant={taxiPark.status === "Faol" ? "default" : "secondary"}>
                  {taxiPark.status}
                </Badge>
              </div>
              <CardDescription>
                Egasi: {taxiPark.owner}
              </CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Tahrirlash
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Aloqa</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {taxiPark.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {taxiPark.email}
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{taxiPark.address}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Transport</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Jami taksilar:</span>
                  <span className="font-medium">{taxiPark.totalTaxis}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Faol:</span>
                  <span className="font-medium text-green-600">{taxiPark.activeTaxis}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Haydovchilar:</span>
                  <span className="font-medium">{taxiPark.totalDrivers}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Statistika</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Jami buyurtmalar:</span>
                  <span className="font-medium">{taxiPark.totalOrders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tugallangan:</span>
                  <span className="font-medium text-green-600">{taxiPark.completedOrders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Oylik daromad:</span>
                  <span className="font-medium">{taxiPark.monthlyRevenue.toLocaleString()} so'm</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Boshqa</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Yaratilgan: {new Date(taxiPark.createdAt).toLocaleDateString('uz-UZ')}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Hududlar:</p>
                  <div className="flex flex-wrap gap-1">
                    {taxiPark.regions.map((region) => (
                      <Badge key={region} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="drivers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="drivers">Haydovchilar</TabsTrigger>
          <TabsTrigger value="taxis">Taksilar</TabsTrigger>
          <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
        </TabsList>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Haydovchilar ({filteredDrivers.length})
                  </CardTitle>
                  <CardDescription>Taksi park haydovchilari ro'yxati</CardDescription>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Qidirish..."
                      value={driverSearch}
                      onChange={(e) => setDriverSearch(e.target.value)}
                      className="w-48"
                    />
                  </div>
                  <Select value={driverStatusFilter} onValueChange={setDriverStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Holat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hammasi</SelectItem>
                      <SelectItem value="active">Faol</SelectItem>
                      <SelectItem value="blocked">Bloklangan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Haydovchi qo'shish
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Haydovchi</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Mashina</TableHead>
                    <TableHead>Reyting</TableHead>
                    <TableHead>Buyurtmalar</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">{driver.license}</p>
                        </div>
                      </TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{driver.car}</p>
                          <p className="text-sm text-muted-foreground">{driver.carNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {driver.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{driver.totalOrders}</p>
                          <p className="text-sm text-muted-foreground">{driver.completedOrders} tugallangan</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant={driver.isBlocked ? "default" : "destructive"}
                            size="sm"
                            onClick={() => handleBlockDriver(driver.id, driver.isBlocked)}
                          >
                            {driver.isBlocked ? <CheckCircle className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Taxis Tab */}
        <TabsContent value="taxis" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Taksilar ({filteredTaxis.length})
                  </CardTitle>
                  <CardDescription>Taksi park transportlari ro'yxati</CardDescription>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Qidirish..."
                      value={taxiSearch}
                      onChange={(e) => setTaxiSearch(e.target.value)}
                      className="w-48"
                    />
                  </div>
                  <Select value={taxiStatusFilter} onValueChange={setTaxiStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Holat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hammasi</SelectItem>
                      <SelectItem value="Faol">Faol</SelectItem>
                      <SelectItem value="Texnik xizmat">Texnik xizmat</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Taksi qo'shish
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Raqam</TableHead>
                    <TableHead>Yil/Rang</TableHead>
                    <TableHead>Haydovchi</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Texnik ko'rik</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTaxis.map((taxi) => (
                    <TableRow key={taxi.id}>
                      <TableCell className="font-medium">{taxi.model}</TableCell>
                      <TableCell>{taxi.number}</TableCell>
                      <TableCell>
                        <div>
                          <p>{taxi.year} yil</p>
                          <p className="text-sm text-muted-foreground">{taxi.color}</p>
                        </div>
                      </TableCell>
                      <TableCell>{taxi.driver}</TableCell>
                      <TableCell>{getStatusBadge(taxi.status)}</TableCell>
                      <TableCell className="text-sm">{taxi.lastService}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Buyurtmalar ({filteredOrders.length})
                  </CardTitle>
                  <CardDescription>Taksi park buyurtmalari tarixi</CardDescription>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Qidirish..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-48"
                    />
                  </div>
                  <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Holat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hammasi</SelectItem>
                      <SelectItem value="Tugallangan">Tugallangan</SelectItem>
                      <SelectItem value="Jarayonda">Jarayonda</SelectItem>
                      <SelectItem value="Bekor qilingan">Bekor qilingan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyurtma ID</TableHead>
                    <TableHead>Haydovchi</TableHead>
                    <TableHead>Mijoz</TableHead>
                    <TableHead>Marshrut</TableHead>
                    <TableHead>Narx</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Sana</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.driver}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {order.from} → {order.to}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.price.toLocaleString()} so'm
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{order.date}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTaxiParkDetailPage;
