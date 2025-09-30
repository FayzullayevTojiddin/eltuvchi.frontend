import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  Route,
  TrendingUp,
  Clock
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TaxiParkPriceManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const regions = [
    "Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg'ona", 
    "Namangan", "Qashqadaryo", "Surxondaryo", "Navoiy", "Jizzax",
    "Sirdaryo", "Xorazm", "Qoraqalpog'iston"
  ];

  // Mock price routes data
  const [priceRoutes, setPriceRoutes] = useState([
    {
      id: 1,
      from: "Toshkent",
      to: "Samarqand",
      basePrice: 120000,
      discountPrice: 110000,
      distance: 270,
      duration: "3.5 soat",
      isActive: true,
      lastUpdated: "2024-12-20",
      totalBookings: 145
    },
    {
      id: 2,
      from: "Toshkent",
      to: "Buxoro",
      basePrice: 150000,
      discountPrice: 140000,
      distance: 380,
      duration: "4.5 soat",
      isActive: true,
      lastUpdated: "2024-12-19",
      totalBookings: 89
    },
    {
      id: 3,
      from: "Andijon",
      to: "Farg'ona",
      basePrice: 85000,
      discountPrice: 80000,
      distance: 180,
      duration: "2.5 soat",
      isActive: true,
      lastUpdated: "2024-12-18",
      totalBookings: 234
    },
    {
      id: 4,
      from: "Samarqand",
      to: "Buxoro",
      basePrice: 95000,
      discountPrice: 90000,
      distance: 220,
      duration: "3 soat",
      isActive: true,
      lastUpdated: "2024-12-17",
      totalBookings: 67
    },
    {
      id: 5,
      from: "Namangan",
      to: "Toshkent",
      basePrice: 110000,
      discountPrice: 105000,
      distance: 250,
      duration: "3 soat",
      isActive: false,
      lastUpdated: "2024-12-15",
      totalBookings: 23
    }
  ]);

  const [newRoute, setNewRoute] = useState({
    from: "",
    to: "",
    basePrice: "",
    discountPrice: "",
    distance: "",
    duration: ""
  });

  const filteredRoutes = priceRoutes.filter(route => {
    const searchLower = searchTerm.toLowerCase();
    return route.from.toLowerCase().includes(searchLower) ||
           route.to.toLowerCase().includes(searchLower) ||
           `${route.from} - ${route.to}`.toLowerCase().includes(searchLower);
  });

  const handleAddRoute = () => {
    if (!newRoute.from || !newRoute.to || !newRoute.basePrice || !newRoute.discountPrice || !newRoute.distance || !newRoute.duration) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    if (newRoute.from === newRoute.to) {
      toast({
        title: "Xatolik",
        description: "Boshlang'ich va yakuniy shahar bir xil bo'lishi mumkin emas",
        variant: "destructive"
      });
      return;
    }

    const route = {
      id: priceRoutes.length + 1,
      from: newRoute.from,
      to: newRoute.to,
      basePrice: parseFloat(newRoute.basePrice),
      discountPrice: parseFloat(newRoute.discountPrice),
      distance: parseFloat(newRoute.distance),
      duration: newRoute.duration,
      isActive: true,
      lastUpdated: new Date().toISOString().split('T')[0],
      totalBookings: 0
    };

    setPriceRoutes([...priceRoutes, route]);
    setNewRoute({ from: "", to: "", basePrice: "", discountPrice: "", distance: "", duration: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Muvaffaqiyat",
      description: "Yangi marshrut narxi qo'shildi"
    });
  };

  const handleEditRoute = () => {
    if (!selectedRoute) return;

    setPriceRoutes(priceRoutes.map(route => 
      route.id === selectedRoute.id 
        ? { ...selectedRoute, lastUpdated: new Date().toISOString().split('T')[0] }
        : route
    ));
    
    setIsEditDialogOpen(false);
    setSelectedRoute(null);
    
    toast({
      title: "Muvaffaqiyat",
      description: "Marshrut narxi yangilandi"
    });
  };

  const handleToggleRouteStatus = (routeId: number) => {
    setPriceRoutes(priceRoutes.map(route => 
      route.id === routeId 
        ? { ...route, isActive: !route.isActive, lastUpdated: new Date().toISOString().split('T')[0] }
        : route
    ));
    
    const route = priceRoutes.find(r => r.id === routeId);
    toast({
      title: route?.isActive ? "Marshrut o'chirildi" : "Marshrut yoqildi",
      description: route?.isActive ? `${route.from} - ${route.to} marshruti nofaol qilindi` : `${route?.from} - ${route?.to} marshruti faollashtirildi`
    });
  };

  const handleDeleteRoute = (routeId: number) => {
    setPriceRoutes(priceRoutes.filter(route => route.id !== routeId));
    toast({
      title: "Marshrut o'chirildi",
      description: "Marshrut muvaffaqiyatli o'chirildi"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Narxlar boshqaruvi</h1>
          <p className="text-muted-foreground">
            Marshrut narxlarini belgilash va boshqarish
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Yangi marshrut qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Marshrut narxi qo'shish</DialogTitle>
              <DialogDescription>
                Yangi marshrut uchun narx belgilang
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qayerdan</Label>
                  <Select value={newRoute.from} onValueChange={(value) => setNewRoute({...newRoute, from: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Shaharni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Qayerga</Label>
                  <Select value={newRoute.to} onValueChange={(value) => setNewRoute({...newRoute, to: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Shaharni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.filter(region => region !== newRoute.from).map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Asosiy narx (so'm)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={newRoute.basePrice}
                    onChange={(e) => setNewRoute({...newRoute, basePrice: e.target.value})}
                    placeholder="120000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">Chegirmali narx (so'm)</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    value={newRoute.discountPrice}
                    onChange={(e) => setNewRoute({...newRoute, discountPrice: e.target.value})}
                    placeholder="110000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Masofa (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={newRoute.distance}
                    onChange={(e) => setNewRoute({...newRoute, distance: e.target.value})}
                    placeholder="270"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Vaqt</Label>
                  <Input
                    id="duration"
                    value={newRoute.duration}
                    onChange={(e) => setNewRoute({...newRoute, duration: e.target.value})}
                    placeholder="3.5 soat"
                  />
                </div>
              </div>
              <Button onClick={handleAddRoute} className="w-full">
                Qo'shish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Marshrut bo'yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Jami marshrutlar</p>
                <p className="text-2xl font-bold">{priceRoutes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Faol marshrutlar</p>
                <p className="text-2xl font-bold text-green-600">
                  {priceRoutes.filter(r => r.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">O'rtacha narx</p>
                <p className="text-2xl font-bold">
                  {Math.round(priceRoutes.reduce((acc, r) => acc + r.basePrice, 0) / priceRoutes.length).toLocaleString()} so'm
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
                <p className="text-2xl font-bold">
                  {priceRoutes.reduce((acc, r) => acc + r.totalBookings, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routes List */}
      <div className="grid gap-4">
        {filteredRoutes.map((route) => (
          <Card key={route.id} className={!route.isActive ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Route className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{route.from} → {route.to}</h3>
                      {route.isActive ? <Badge variant="default">Faol</Badge> : <Badge variant="secondary">Nofaol</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {route.distance} km
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {route.duration}
                      </div>
                      <span>{route.totalBookings} buyurtma</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Oxirgi yangilanish: {route.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right space-y-1">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground line-through">
                        {route.basePrice.toLocaleString()} so'm
                      </p>
                      <p className="text-xl font-bold text-green-600">
                        {route.discountPrice.toLocaleString()} so'm
                      </p>
                    </div>
                    <p className="text-xs text-green-600">
                      -{Math.round(((route.basePrice - route.discountPrice) / route.basePrice) * 100)}% chegirma
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoute({...route});
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={route.isActive ? "secondary" : "default"}
                      size="sm"
                      onClick={() => handleToggleRouteStatus(route.id)}
                    >
                      {route.isActive ? "O'chirish" : "Yoqish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRoute(route.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Marshrutlar topilmadi</h3>
            <p className="text-muted-foreground">
              Qidiruv so'zingizni o'zgartiring yoki yangi marshrut qo'shing
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Marshrut narxini tahrirlash</DialogTitle>
            <DialogDescription>
              Marshrut narxlarini yangilang
            </DialogDescription>
          </DialogHeader>
          {selectedRoute && (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg">{selectedRoute.from} → {selectedRoute.to}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editBasePrice">Asosiy narx (so'm)</Label>
                  <Input
                    id="editBasePrice"
                    type="number"
                    value={selectedRoute.basePrice}
                    onChange={(e) => setSelectedRoute({...selectedRoute, basePrice: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDiscountPrice">Chegirmali narx (so'm)</Label>
                  <Input
                    id="editDiscountPrice"
                    type="number"
                    value={selectedRoute.discountPrice}
                    onChange={(e) => setSelectedRoute({...selectedRoute, discountPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editDistance">Masofa (km)</Label>
                  <Input
                    id="editDistance"
                    type="number"
                    value={selectedRoute.distance}
                    onChange={(e) => setSelectedRoute({...selectedRoute, distance: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDuration">Vaqt</Label>
                  <Input
                    id="editDuration"
                    value={selectedRoute.duration}
                    onChange={(e) => setSelectedRoute({...selectedRoute, duration: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleEditRoute} className="w-full">
                Yangilash
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaxiParkPriceManagement;