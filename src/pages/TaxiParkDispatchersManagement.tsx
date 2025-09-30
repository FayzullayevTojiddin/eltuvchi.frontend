import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Phone, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Users,
  MessageSquare,
  Clock
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TaxiParkDispatchersManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDispatcher, setSelectedDispatcher] = useState<any>(null);

  // Mock dispatchers data
  const [dispatchers, setDispatchers] = useState([
    {
      id: 1,
      name: "Aziz Karimov",
      phone: "+998901234567",
      region: "Toshkent", 
      isActive: true,
      isBlocked: false,
      joinDate: "2024-01-15",
      totalOrders: 450,
      activeChats: 12,
      workingHours: "09:00-18:00",
      experience: "2 yil"
    },
    {
      id: 2,
      name: "Nodira Umarova", 
      phone: "+998901234568",
      region: "Samarqand",
      isActive: true,
      isBlocked: false,
      joinDate: "2024-02-20",
      totalOrders: 320,
      activeChats: 8,
      workingHours: "08:00-17:00",
      experience: "1.5 yil"
    },
    {
      id: 3,
      name: "Jasur Rahmonov",
      phone: "+998901234569", 
      region: "Andijon",
      isActive: false,
      isBlocked: true,
      joinDate: "2024-03-10",
      totalOrders: 180,
      activeChats: 0,
      workingHours: "10:00-19:00",
      experience: "1 yil"
    }
  ]);

  const [newDispatcher, setNewDispatcher] = useState({
    name: "",
    phone: "",
    region: "",
    workingHours: ""
  });

  const regions = [
    "Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg'ona", 
    "Namangan", "Qashqadaryo", "Surxondaryo", "Navoiy", "Jizzax",
    "Sirdaryo", "Xorazm", "Qoraqalpog'iston"
  ];

  const filteredDispatchers = dispatchers.filter(dispatcher => {
    const matchesSearch = dispatcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispatcher.phone.includes(searchTerm) ||
                         dispatcher.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "active" && dispatcher.isActive && !dispatcher.isBlocked) ||
                         (selectedStatus === "inactive" && !dispatcher.isActive) ||
                         (selectedStatus === "blocked" && dispatcher.isBlocked);
    return matchesSearch && matchesStatus;
  });

  const handleAddDispatcher = () => {
    if (!newDispatcher.name || !newDispatcher.phone || !newDispatcher.region || !newDispatcher.workingHours) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    const dispatcher = {
      id: dispatchers.length + 1,
      ...newDispatcher,
      isActive: true,
      isBlocked: false,
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      activeChats: 0,
      experience: "Yangi"
    };

    setDispatchers([...dispatchers, dispatcher]);
    setNewDispatcher({ name: "", phone: "", region: "", workingHours: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Muvaffaqiyat",
      description: "Dispatcher muvaffaqiyatli qo'shildi"
    });
  };

  const handleEditDispatcher = () => {
    if (!selectedDispatcher) return;

    setDispatchers(dispatchers.map(dispatcher => 
      dispatcher.id === selectedDispatcher.id 
        ? { ...dispatcher, ...selectedDispatcher }
        : dispatcher
    ));
    
    setIsEditDialogOpen(false);
    setSelectedDispatcher(null);
    
    toast({
      title: "Muvaffaqiyat",
      description: "Dispatcher ma'lumotlari yangilandi"
    });
  };

  const handleBlockDispatcher = (dispatcherId: number) => {
    setDispatchers(dispatchers.map(dispatcher => 
      dispatcher.id === dispatcherId 
        ? { ...dispatcher, isBlocked: !dispatcher.isBlocked, isActive: dispatcher.isBlocked }
        : dispatcher
    ));
    
    const dispatcher = dispatchers.find(d => d.id === dispatcherId);
    toast({
      title: dispatcher?.isBlocked ? "Dispatcher blokdan chiqarildi" : "Dispatcher bloklandi",
      description: dispatcher?.isBlocked ? `${dispatcher.name} faollashtirildi` : `${dispatcher?.name} bloklandi`
    });
  };

  const handleDeleteDispatcher = (dispatcherId: number) => {
    setDispatchers(dispatchers.filter(dispatcher => dispatcher.id !== dispatcherId));
    toast({
      title: "Dispatcher o'chirildi",
      description: "Dispatcher muvaffaqiyatli o'chirildi"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dispatcherlar boshqaruvi</h1>
          <p className="text-muted-foreground">
            Park dispatcherlarini boshqarish va kuzatish
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Dispatcher qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi dispatcher qo'shish</DialogTitle>
              <DialogDescription>
                Yangi dispatcher ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">F.I.Sh</Label>
                <Input
                  id="name"
                  value={newDispatcher.name}
                  onChange={(e) => setNewDispatcher({...newDispatcher, name: e.target.value})}
                  placeholder="Dispatcher ismi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqami</Label>
                <Input
                  id="phone"
                  value={newDispatcher.phone}
                  onChange={(e) => setNewDispatcher({...newDispatcher, phone: e.target.value})}
                  placeholder="+998901234567"
                />
              </div>
              <div className="space-y-2">
                <Label>Hudud</Label>
                <Select value={newDispatcher.region} onValueChange={(value) => setNewDispatcher({...newDispatcher, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hududni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours">Ish vaqti</Label>
                <Input
                  id="workingHours"
                  value={newDispatcher.workingHours}
                  onChange={(e) => setNewDispatcher({...newDispatcher, workingHours: e.target.value})}
                  placeholder="09:00-18:00"
                />
              </div>
              <Button onClick={handleAddDispatcher} className="w-full">
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
            placeholder="Dispatcher, telefon yoki hudud bo'yicha qidirish..."
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
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Jami dispatcherlar</p>
                <p className="text-2xl font-bold">{dispatchers.length}</p>
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
                  {dispatchers.filter(d => d.isActive && !d.isBlocked).length}
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
                  {dispatchers.filter(d => d.isBlocked).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Faol chatlar</p>
                <p className="text-2xl font-bold">
                  {dispatchers.reduce((acc, d) => acc + d.activeChats, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dispatchers List */}
      <div className="grid gap-4">
        {filteredDispatchers.map((dispatcher) => (
          <Card key={dispatcher.id} className={dispatcher.isBlocked ? "border-red-200 bg-red-50/50" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{dispatcher.name}</h3>
                      {dispatcher.isBlocked && <Badge variant="destructive">Bloklangan</Badge>}
                      {dispatcher.isActive && !dispatcher.isBlocked && <Badge variant="default">Faol</Badge>}
                      {!dispatcher.isActive && !dispatcher.isBlocked && <Badge variant="secondary">Nofaol</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {dispatcher.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {dispatcher.region}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dispatcher.workingHours}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{dispatcher.totalOrders} buyurtma</span>
                      <span>{dispatcher.activeChats} faol chat</span>
                      <span>Tajriba: {dispatcher.experience}</span>
                      <span>Qo'shilgan: {dispatcher.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDispatcher({...dispatcher});
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={dispatcher.isBlocked ? "default" : "destructive"}
                    size="sm"
                    onClick={() => handleBlockDispatcher(dispatcher.id)}
                  >
                    {dispatcher.isBlocked ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDispatcher(dispatcher.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDispatchers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dispatcherlar topilmadi</h3>
            <p className="text-muted-foreground">
              Qidiruv so'zingizni o'zgartiring yoki yangi dispatcher qo'shing
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Dispatcher ma'lumotlarini tahrirlash</DialogTitle>
            <DialogDescription>
              Dispatcher ma'lumotlarini yangilang
            </DialogDescription>
          </DialogHeader>
          {selectedDispatcher && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editName">F.I.Sh</Label>
                <Input
                  id="editName"
                  value={selectedDispatcher.name}
                  onChange={(e) => setSelectedDispatcher({...selectedDispatcher, name: e.target.value})}
                  placeholder="Dispatcher ismi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPhone">Telefon raqami</Label>
                <Input
                  id="editPhone"
                  value={selectedDispatcher.phone}
                  onChange={(e) => setSelectedDispatcher({...selectedDispatcher, phone: e.target.value})}
                  placeholder="+998901234567"
                />
              </div>
              <div className="space-y-2">
                <Label>Hudud</Label>
                <Select value={selectedDispatcher.region} onValueChange={(value) => setSelectedDispatcher({...selectedDispatcher, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hududni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editWorkingHours">Ish vaqti</Label>
                <Input
                  id="editWorkingHours"
                  value={selectedDispatcher.workingHours}
                  onChange={(e) => setSelectedDispatcher({...selectedDispatcher, workingHours: e.target.value})}
                  placeholder="09:00-18:00"
                />
              </div>
              <Button onClick={handleEditDispatcher} className="w-full">
                Yangilash
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaxiParkDispatchersManagement;