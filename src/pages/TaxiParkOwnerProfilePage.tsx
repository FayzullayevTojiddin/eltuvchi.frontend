import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  Camera,
  Star,
  DollarSign,
  Car,
  Users,
  Clock,
  Award
} from "lucide-react";

const TaxiParkOwnerProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for taxi park owner profile
  const profile = {
    name: "Akmal Karimov",
    email: "akmal@tezkortaksi.uz",
    phone: "+998901234567",
    parkName: "Tezkor Taksi Park",
    address: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi 45",
    registeredAt: "2024-01-15",
    avatar: "/placeholder-avatar.jpg",
    regions: ["Toshkent", "Samarqand", "Buxoro"],
    status: "Faol",
    rating: 4.8,
    totalTaxis: 25,
    totalDrivers: 25,
    totalOrders: 1250,
    totalRevenue: 540000000,
    joinedDate: "2024-01-15"
  };

  const achievements = [
    { 
      title: "Eng yaxshi park", 
      description: "2024 yil eng yuqori reytingli park", 
      date: "2024-01-01",
      icon: Award 
    },
    { 
      title: "1000+ buyurtma", 
      description: "1000 dan ortiq buyurtma bajarildi", 
      date: "2024-01-10",
      icon: Star 
    },
    { 
      title: "Ishonchli hamkor", 
      description: "6 oydan beri faol faoliyat", 
      date: "2024-01-15",
      icon: Clock 
    }
  ];

  const recentActivity = [
    {
      action: "Yangi taksi qo'shildi",
      details: "01D123EF raqamli Chevrolet Cobalt",
      time: "2 soat oldin"
    },
    {
      action: "Haydovchi o'zgartirildi",
      details: "01A123BC taksi uchun",
      time: "1 kun oldin"
    },
    {
      action: "Narx yangilandi",
      details: "Toshkent-Samarqand yo'nalishi",
      time: "3 kun oldin"
    }
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profil yangilandi",
      description: "Profil ma'lumotlari muvaffaqiyatli saqlandi",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profil</h1>
          <p className="text-muted-foreground">
            Shaxsiy va taksi park ma'lumotlaringiz
          </p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Saqlash
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Tahrirlash
            </>
          )}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <Badge variant={profile.status === "Faol" ? "default" : "secondary"}>
                  {profile.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{profile.rating}/5.0</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{profile.parkName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>A'zo bo'lgan: {new Date(profile.joinedDate).toLocaleDateString('uz-UZ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 min-w-[200px]">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{profile.totalTaxis}</p>
                <p className="text-xs text-muted-foreground">Taksilar</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{profile.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Buyurtmalar</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{profile.totalDrivers}</p>
                <p className="text-xs text-muted-foreground">Haydovchilar</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-muted-foreground">{(profile.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Daromad (so'm)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Shaxsiy ma'lumotlar</TabsTrigger>
          <TabsTrigger value="park">Taksi park</TabsTrigger>
          <TabsTrigger value="achievements">Yutuqlar</TabsTrigger>
          <TabsTrigger value="activity">Faoliyat</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Shaxsiy ma'lumotlar
              </CardTitle>
              <CardDescription>
                Shaxsiy ma'lumotlaringizni yangilang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">To'liq ism</Label>
                  <Input 
                    id="name" 
                    defaultValue={profile.name}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email manzil</Label>
                  <Input 
                    id="email" 
                    type="email"
                    defaultValue={profile.email}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <Input 
                    id="phone" 
                    defaultValue={profile.phone}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="park-name">Taksi park nomi</Label>
                  <Input 
                    id="park-name" 
                    defaultValue={profile.parkName}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Manzil</Label>
                <Textarea 
                  id="address" 
                  defaultValue={profile.address}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="park" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Taksi park ma'lumotlari
              </CardTitle>
              <CardDescription>
                Taksi park sozlamalari va hududlar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Faoliyat hududlari</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.regions.map((region) => (
                      <Badge key={region} variant="outline">
                        {region}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Yangi hudud qo'shish" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andijon">Andijon</SelectItem>
                        <SelectItem value="fargona">Farg'ona</SelectItem>
                        <SelectItem value="namangan">Namangan</SelectItem>
                        <SelectItem value="qashqadaryo">Qashqadaryo</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Park statistikasi</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Jami taksilar:</span>
                      <span className="font-medium">{profile.totalTaxis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Haydovchilar:</span>
                      <span className="font-medium">{profile.totalDrivers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Jami buyurtmalar:</span>
                      <span className="font-medium">{profile.totalOrders}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Moliyaviy</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Jami daromad:</span>
                      <span className="font-medium">{(profile.totalRevenue / 1000000).toFixed(1)}M so'm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reyting:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{profile.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card-custom">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(achievement.date).toLocaleDateString('uz-UZ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                So'nggi faoliyatlar
              </CardTitle>
              <CardDescription>
                Oxirgi o'zgarishlar va harakatlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxiParkOwnerProfilePage;