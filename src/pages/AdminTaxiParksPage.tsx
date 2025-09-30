
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  MapPin, 
  Users, 
  Car, 
  Phone, 
  Mail,
  Calendar,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTaxiParksPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for taxi parks
  const taxiParks = [
    {
      id: 1,
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
      status: "Faol",
      createdAt: "2024-01-15",
      regions: ["Toshkent", "Samarqand", "Buxoro"]
    },
    {
      id: 2,
      name: "Shodmon Taxi",
      owner: "Bobur Aliyev",
      email: "bobur@shodmon.uz",
      phone: "+998901234568",
      address: "Samarqand sh., Registon t., Gur Amir ko'chasi 12",
      totalTaxis: 18,
      activeTaxis: 16,
      totalDrivers: 18,
      activeDrivers: 16,
      monthlyRevenue: 32000000,
      status: "Faol",
      createdAt: "2024-02-10",
      regions: ["Samarqand", "Qashqadaryo", "Surxondaryo"]
    },
    {
      id: 3,
      name: "Buxoro Express",
      owner: "Sardor Usmonov",
      email: "sardor@buxoroexpress.uz",
      phone: "+998901234569",
      address: "Buxoro sh., Mirobod t., Lyabi Havuz ko'chasi 8",
      totalTaxis: 12,
      activeTaxis: 10,
      totalDrivers: 12,
      activeDrivers: 10,
      monthlyRevenue: 18000000,
      status: "Tekshiruvda",
      createdAt: "2024-03-05",
      regions: ["Buxoro", "Navoiy", "Xorazm"]
    }
  ];

  const handleAddPark = () => {
    toast({
      title: "Taksi park qo'shildi",
      description: "Yangi taksi park muvaffaqiyatli ro'yxatga olindi",
    });
    setIsAddDialogOpen(false);
  };

  const handleDeletePark = (parkId: number) => {
    toast({
      title: "Taksi park o'chirildi",
      description: "Taksi park tizimdan o'chirildi",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Taksi parklar</h1>
          <p className="text-muted-foreground">
            Tizimdagi barcha taksi parklarni boshqarish
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Yangi park qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yangi taksi park qo'shish</DialogTitle>
              <DialogDescription>
                Yangi taksi park ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="park-name">Park nomi</Label>
                  <Input id="park-name" placeholder="Taksi park nomini kiriting" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Egasi ismi</Label>
                  <Input id="owner-name" placeholder="Egasi ismini kiriting" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email manzilini kiriting" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" placeholder="+998901234567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Manzil</Label>
                <Textarea id="address" placeholder="To'liq manzilni kiriting" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regions">Faoliyat hududlari</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Hududlarni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toshkent">Toshkent</SelectItem>
                    <SelectItem value="samarqand">Samarqand</SelectItem>
                    <SelectItem value="buxoro">Buxoro</SelectItem>
                    <SelectItem value="andijon">Andijon</SelectItem>
                    <SelectItem value="fargona">Farg'ona</SelectItem>
                    <SelectItem value="namangan">Namangan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddPark}>
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
                <p className="text-sm font-medium text-muted-foreground">Jami parklar</p>
                <p className="text-2xl font-bold">{taxiParks.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami taksilar</p>
                <p className="text-2xl font-bold">
                  {taxiParks.reduce((sum, park) => sum + park.totalTaxis, 0)}
                </p>
              </div>
              <Car className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami haydovchilar</p>
                <p className="text-2xl font-bold">
                  {taxiParks.reduce((sum, park) => sum + park.totalDrivers, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Oylik daromad</p>
                <p className="text-2xl font-bold">
                  {(taxiParks.reduce((sum, park) => sum + park.monthlyRevenue, 0)).toLocaleString()} so'm
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Taxi Parks List */}
      <div className="grid gap-6">
        {taxiParks.map((park) => (
          <Card key={park.id} className="bg-gradient-card border-0 shadow-card-custom hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{park.name}</CardTitle>
                    <Badge variant={park.status === "Faol" ? "default" : "secondary"}>
                      {park.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Egasi: {park.owner}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/taxi-parks/${park.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Batafsil
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Tahrirlash
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePark(park.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    O'chirish
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Aloqa ma'lumotlari</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {park.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {park.email}
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="line-clamp-2">{park.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Transport</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Jami taksilar:</span>
                      <span className="font-medium">{park.totalTaxis}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Faol:</span>
                      <span className="font-medium text-success">{park.activeTaxis}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Haydovchilar:</span>
                      <span className="font-medium">{park.totalDrivers}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Moliyaviy</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Oylik daromad:</span>
                      <span className="font-medium">{park.monthlyRevenue.toLocaleString()} so'm</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Ro'yxatga olingan: {new Date(park.createdAt).toLocaleDateString('uz-UZ')}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Faoliyat hududlari</h4>
                  <div className="flex flex-wrap gap-1">
                    {park.regions.map((region) => (
                      <Badge key={region} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTaxiParksPage;
