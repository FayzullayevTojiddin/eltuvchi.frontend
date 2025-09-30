
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  MapPin,
  Clock,
  Car,
  Plus,
  Edit,
  Trash2,
  Save
} from "lucide-react";
import { toast } from "sonner";

const TaxiParkPricingPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTariff, setNewTariff] = useState({
    name: "",
    basePrice: "",
    perKmPrice: "",
    perMinutePrice: "",
    region: ""
  });

  // Demo ma'lumotlar
  const [tariffs, setTariffs] = useState([
    {
      id: 1,
      name: "Shahar ichida",
      basePrice: 8000,
      perKmPrice: 2000,
      perMinutePrice: 500,
      region: "Toshkent shahri",
      isActive: true
    },
    {
      id: 2,
      name: "Shahar tashqarisiga",
      basePrice: 15000,
      perKmPrice: 3000,
      perMinutePrice: 700,
      region: "Toshkent viloyati",
      isActive: true
    },
    {
      id: 3,
      name: "Kunduzgi tarif",
      basePrice: 6000,
      perKmPrice: 1500,
      perMinutePrice: 400,
      region: "Toshkent shahri",
      isActive: false
    }
  ]);

  const handleSaveTariff = () => {
    if (!newTariff.name || !newTariff.basePrice || !newTariff.perKmPrice || !newTariff.perMinutePrice || !newTariff.region) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }

    const tariff = {
      id: tariffs.length + 1,
      name: newTariff.name,
      basePrice: parseInt(newTariff.basePrice),
      perKmPrice: parseInt(newTariff.perKmPrice),
      perMinutePrice: parseInt(newTariff.perMinutePrice),
      region: newTariff.region,
      isActive: true
    };

    setTariffs([...tariffs, tariff]);
    setNewTariff({
      name: "",
      basePrice: "",
      perKmPrice: "",
      perMinutePrice: "",
      region: ""
    });
    toast.success("Yangi tarif qo'shildi");
  };

  const handleToggleStatus = (id: number) => {
    setTariffs(tariffs.map(tariff => 
      tariff.id === id 
        ? { ...tariff, isActive: !tariff.isActive }
        : tariff
    ));
    toast.success("Tarif holati o'zgartirildi");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Narxlar Boshqaruvi</h1>
          <p className="text-muted-foreground">
            Takso park tariflari va narxlarini boshqaring
          </p>
        </div>
      </div>

      {/* Yangi tarif qo'shish */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Yangi Tarif Qo'shish
          </CardTitle>
          <CardDescription>
            Yangi tarif yaratish uchun quyidagi ma'lumotlarni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tariff-name">Tarif nomi</Label>
              <Input
                id="tariff-name"
                placeholder="Masalan: Shahar ichida"
                value={newTariff.name}
                onChange={(e) => setNewTariff({...newTariff, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="base-price">Boshlang'ich narx (so'm)</Label>
              <Input
                id="base-price"
                type="number"
                placeholder="8000"
                value={newTariff.basePrice}
                onChange={(e) => setNewTariff({...newTariff, basePrice: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="per-km-price">Km uchun narx (so'm)</Label>
              <Input
                id="per-km-price"
                type="number"
                placeholder="2000"
                value={newTariff.perKmPrice}
                onChange={(e) => setNewTariff({...newTariff, perKmPrice: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="per-minute-price">Daqiqa uchun narx (so'm)</Label>
              <Input
                id="per-minute-price"
                type="number"
                placeholder="500"
                value={newTariff.perMinutePrice}
                onChange={(e) => setNewTariff({...newTariff, perMinutePrice: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Hudud</Label>
              <Select value={newTariff.region} onValueChange={(value) => setNewTariff({...newTariff, region: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Hududni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Toshkent shahri">Toshkent shahri</SelectItem>
                  <SelectItem value="Toshkent viloyati">Toshkent viloyati</SelectItem>
                  <SelectItem value="Samarqand">Samarqand</SelectItem>
                  <SelectItem value="Buxoro">Buxoro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleSaveTariff} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Saqlash
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mavjud tariflar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Mavjud Tariflar
          </CardTitle>
          <CardDescription>
            Barcha tariflar va ularning narxlari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Takso park tariflari ro'yxati</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tarif nomi</TableHead>
                <TableHead>Boshlang'ich</TableHead>
                <TableHead>Km uchun</TableHead>
                <TableHead>Daqiqa uchun</TableHead>
                <TableHead>Hudud</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tariffs.map((tariff) => (
                <TableRow key={tariff.id}>
                  <TableCell className="font-medium">{tariff.name}</TableCell>
                  <TableCell>{formatPrice(tariff.basePrice)}</TableCell>
                  <TableCell>{formatPrice(tariff.perKmPrice)}</TableCell>
                  <TableCell>{formatPrice(tariff.perMinutePrice)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {tariff.region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tariff.isActive ? "default" : "secondary"}>
                      {tariff.isActive ? "Faol" : "Nofaol"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(tariff.id)}
                      >
                        {tariff.isActive ? "Nofaol qilish" : "Faollashtirish"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
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

      {/* Narx kalkulyatori */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Narx Kalkulyatori
          </CardTitle>
          <CardDescription>
            Yo'l va vaqt asosida narx hisoblash
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Masofa (km)</Label>
              <Input
                id="distance"
                type="number"
                placeholder="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Vaqt (daqiqa)</Label>
              <Input
                id="time"
                type="number"
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tariff-select">Tarif</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tarifni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {tariffs.filter(t => t.isActive).map(tariff => (
                    <SelectItem key={tariff.id} value={tariff.id.toString()}>
                      {tariff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-lg font-semibold">
              Jami narx: <span className="text-primary">25,000 so'm</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Boshlang'ich: 8,000 + Masofa: 10,000 + Vaqt: 7,000
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxiParkPricingPage;
