import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Phone, 
  Car, 
  Star, 
  Plus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Eye,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const TaxiParkDriversManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  // Mock drivers data
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Akmal Karimov",
      phone: "+998901234567",
      license: "AA1234567", 
      car: "Chevrolet Lacetti",
      carNumber: "01A123BC",
      rating: 4.9,
      totalOrders: 245,
      completedOrders: 240,
      status: "active",
      joinDate: "2024-01-15",
      totalEarnings: 5400000,
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
      completedOrders: 185,
      status: "active",
      joinDate: "2024-02-20",
      totalEarnings: 3890000,
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
      completedOrders: 150,
      status: "inactive",
      joinDate: "2024-03-10",
      totalEarnings: 2750000,
      isBlocked: true
    }
  ]);

  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    license: "",
    car: "",
    carNumber: ""
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm) ||
                         driver.carNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "active" && driver.status === "active") ||
                         (selectedStatus === "inactive" && driver.status === "inactive") ||
                         (selectedStatus === "blocked" && driver.isBlocked);
    return matchesSearch && matchesStatus;
  });

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.license || !newDriver.car || !newDriver.carNumber) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    const driver = {
      id: drivers.length + 1,
      ...newDriver,
      rating: 0,
      totalOrders: 0,
      completedOrders: 0,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
      totalEarnings: 0,
      isBlocked: false
    };

    setDrivers([...drivers, driver]);
    setNewDriver({ name: "", phone: "", license: "", car: "", carNumber: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Muvaffaqiyat",
      description: "Haydovchi muvaffaqiyatli qo'shildi"
    });
  };

  const handleBlockDriver = (driverId: number) => {
    setDrivers(drivers.map(driver => 
      driver.id === driverId 
        ? { ...driver, isBlocked: !driver.isBlocked, status: driver.isBlocked ? "active" : "inactive" }
        : driver
    ));
    
    const driver = drivers.find(d => d.id === driverId);
    toast({
      title: driver?.isBlocked ? "Haydovchi blokdan chiqarildi" : "Haydovchi bloklandi",
      description: driver?.isBlocked ? `${driver.name} faollashtirildi` : `${driver?.name} bloklandi`
    });
  };

  const handleDeleteDriver = (driverId: number) => {
    setDrivers(drivers.filter(driver => driver.id !== driverId));
    toast({
      title: "Haydovchi o'chirildi",
      description: "Haydovchi muvaffaqiyatli o'chirildi"
    });
  };

  const handleViewDriver = (driverId: number) => {
    navigate(`/taxi-park-owner/drivers/${driverId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Haydovchilar boshqaruvi</h1>
          <p className="text-muted-foreground">
            Park haydovchilarini boshqarish va kuzatish
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Haydovchi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi haydovchi qo'shish</DialogTitle>
              <DialogDescription>
                Yangi haydovchi ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">F.I.Sh</Label>
                <Input
                  id="name"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                  placeholder="Haydovchi ismi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqami</Label>
                <Input
                  id="phone"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                  placeholder="+998901234567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Guvohnoma raqami</Label>
                <Input
                  id="license"
                  value={newDriver.license}
                  onChange={(e) => setNewDriver({...newDriver, license: e.target.value})}
                  placeholder="AA1234567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car">Mashina modeli</Label>
                <Input
                  id="car"
                  value={newDriver.car}
                  onChange={(e) => setNewDriver({...newDriver, car: e.target.value})}
                  placeholder="Chevrolet Lacetti"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carNumber">Mashina raqami</Label>
                <Input
                  id="carNumber"
                  value={newDriver.carNumber}
                  onChange={(e) => setNewDriver({...newDriver, carNumber: e.target.value})}
                  placeholder="01A123BC"
                />
              </div>
              <Button onClick={handleAddDriver} className="w-full">
                Qo'shish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64">
          <Input
            placeholder="Haydovchi, telefon yoki mashina raqami bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Holat bo'yicha filtr" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barchasi</SelectItem>
            <SelectItem value="active">Faol</SelectItem>
            <SelectItem value="inactive">Nofaol</SelectItem>
            <SelectItem value="blocked">Bloklangan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Jami haydovchilar</p>
                <p className="text-2xl font-bold">{drivers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Faol</p>
                <p className="text-2xl font-bold text-green-600">
                  {drivers.filter(d => d.status === "active" && !d.isBlocked).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Ban className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Bloklangan</p>
                <p className="text-2xl font-bold text-red-600">
                  {drivers.filter(d => d.isBlocked).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">O'rtacha reyting</p>
                <p className="text-2xl font-bold">
                  {(drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers List */}
      <div className="grid gap-4">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className={driver.isBlocked ? "border-red-200 bg-red-50/50" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{driver.name}</h3>
                      {driver.isBlocked && <Badge variant="destructive">Bloklangan</Badge>}
                      {driver.status === "active" && !driver.isBlocked && <Badge variant="default">Faol</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {driver.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="h-3 w-3" />
                        {driver.car} ({driver.carNumber})
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {driver.rating}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{driver.totalOrders} buyurtma</span>
                      <span>{driver.totalEarnings.toLocaleString()} so'm daromad</span>
                      <span>Qo'shilgan: {driver.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDriver(driver.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDriver(driver);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={driver.isBlocked ? "default" : "destructive"}
                    size="sm"
                    onClick={() => handleBlockDriver(driver.id)}
                  >
                    {driver.isBlocked ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDriver(driver.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Haydovchilar topilmadi</h3>
            <p className="text-muted-foreground">
              Qidiruv so'zingizni o'zgartiring yoki yangi haydovchi qo'shing
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxiParkDriversManagement;