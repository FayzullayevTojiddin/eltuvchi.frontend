import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  User,
  Phone,
  MapPin,
  Calendar,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface UserType {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  userType: string;
  isActive: boolean;
  totalOrders: number;
  rating: number;
  registeredAt: string;
  avatar?: string;
}

const DispatcherUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [viewUserDialog, setViewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    userType: "taxi" // Avtomatik taksi turiga o'rnatilgan
  });
  const [editingUser, setEditingUser] = useState<UserType>({
    id: 0,
    name: "",
    phone: "",
    email: "",
    address: "",
    userType: "taxi",
    isActive: true,
    totalOrders: 0,
    rating: 5.0,
    registeredAt: ""
  });

  const [users, setUsers] = useState<UserType[]>([
    {
      id: 1,
      name: "Akmal Karimov",
      phone: "+998 90 123 45 67",
      email: "akmal@example.com",
      address: "Toshkent, Yunusobod",
      userType: "taxi",
      isActive: true,
      totalOrders: 156,
      rating: 4.9,
      registeredAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Malika Saidova",
      phone: "+998 91 234 56 78",
      email: "malika@example.com",
      address: "Samarqand, Markaz",
      userType: "user",
      isActive: true,
      totalOrders: 23,
      rating: 4.7,
      registeredAt: "2024-01-20"
    },
    {
      id: 3,
      name: "Sardor Toshev",
      phone: "+998 93 345 67 89",
      email: "sardor@example.com",
      address: "Buxoro, Kogon",
      userType: "taxi",
      isActive: false,
      totalOrders: 89,
      rating: 4.6,
      registeredAt: "2024-01-10"
    },
  ]);

  const getUserTypeBadge = (userType: string) => {
    switch (userType) {
      case "taxi":
        return <Badge className="bg-blue-100 text-blue-800">Taksi haydovchi</Badge>;
      case "user":
        return <Badge className="bg-green-100 text-green-800">Oddiy foydalanuvchi</Badge>;
      default:
        return <Badge variant="outline">{userType}</Badge>;
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800">Faol</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Nofaol</Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "taxi" && user.userType === "taxi") ||
                         (selectedFilter === "user" && user.userType === "user") ||
                         (selectedFilter === "active" && user.isActive) ||
                         (selectedFilter === "inactive" && !user.isActive);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    taxi: users.filter(u => u.userType === "taxi").length,
    regular: users.filter(u => u.userType === "user").length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.phone) {
      toast.error("Ism va telefon raqamini kiriting!");
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd: UserType = {
      ...newUser,
      id: newId,
      isActive: true,
      totalOrders: 0,
      rating: 5.0,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, userToAdd]);
    toast.success("Yangi foydalanuvchi qo'shildi!");
    setAddUserDialog(false);
    setNewUser({ name: "", phone: "", email: "", address: "", userType: "taxi" });
  };

  const handleEditUser = (user: UserType) => {
    setEditingUser({ ...user });
    setEditUserDialog(true);
  };

  const handleUpdateUser = () => {
    setUsers(prev =>
      prev.map(user =>
        user.id === editingUser.id ? { ...editingUser } : user
      )
    );
    toast.success("Foydalanuvchi ma'lumotlari yangilandi!");
    setEditUserDialog(false);
  };

  const handleViewUser = (user: UserType) => {
    setSelectedUser(user);
    setViewUserDialog(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success("Foydalanuvchi o'chirildi!");
  };

  const handleToggleStatus = (id: number) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
    toast.success("Foydalanuvchi holati o'zgartirildi!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Foydalanuvchilar boshqaruvi</h1>
          <p className="text-muted-foreground">Barcha foydalanuvchilarni kuzatib boring va boshqaring</p>
        </div>
        
        <Button onClick={() => setAddUserDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Foydalanuvchi qo'shish
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Jami</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.taxi}</p>
              <p className="text-xs text-muted-foreground">Taksi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.regular}</p>
              <p className="text-xs text-muted-foreground">Oddiy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Faol</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              <p className="text-xs text-muted-foreground">Nofaol</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Ism, telefon yoki email qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtr" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha foydalanuvchilar</SelectItem>
            <SelectItem value="taxi">Taksi haydovchilar</SelectItem>
            <SelectItem value="user">Oddiy foydalanuvchilar</SelectItem>
            <SelectItem value="active">Faol</SelectItem>
            <SelectItem value="inactive">Nofaol</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Foydalanuvchilar ro'yxati</CardTitle>
          <CardDescription>
            Barcha foydalanuvchilar va ularning ma'lumotlari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foydalanuvchi</TableHead>
                <TableHead>Aloqa</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Turi</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {user.address}
                    </div>
                  </TableCell>
                  <TableCell>{getUserTypeBadge(user.userType)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.totalOrders} buyurtma</div>
                      <div className="text-muted-foreground">
                        ⭐ {user.rating}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                          Ko'rish
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                          Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          <User className="h-4 w-4" />
                          {user.isActive ? "Nofaol qilish" : "Faol qilish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          O'chirish
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addUserDialog} onOpenChange={setAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi foydalanuvchi qo'shish</DialogTitle>
            <DialogDescription>
              Taksi haydovchi qo'shish uchun ma'lumotlarni kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ism-familiya</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                placeholder="To'liq ism-familiya"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon raqami</Label>
              <Input
                id="phone"
                value={newUser.phone}
                onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Manzil</Label>
              <Input
                id="address"
                value={newUser.address}
                onChange={(e) => setNewUser(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Shahar, tuman"
              />
            </div>
            <div className="space-y-2">
              <Label>Foydalanuvchi turi</Label>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium text-blue-600">Taksi haydovchi</p>
                <p className="text-xs text-muted-foreground">
                  Dispatcher faqat taksi haydovchi yarata oladi
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserDialog(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleAddUser}>
              Qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Foydalanuvchi ma'lumotlarini tahrirlash</DialogTitle>
            <DialogDescription>
              Foydalanuvchi ma'lumotlarini yangilang
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Ism-familiya</Label>
              <Input
                id="editName"
                value={editingUser.name}
                onChange={(e) => setEditingUser(prev => ({ ...prev, name: e.target.value }))}
                placeholder="To'liq ism-familiya"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Telefon raqami</Label>
              <Input
                id="editPhone"
                value={editingUser.phone}
                onChange={(e) => setEditingUser(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editAddress">Manzil</Label>
              <Input
                id="editAddress"
                value={editingUser.address}
                onChange={(e) => setEditingUser(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Shahar, tuman"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialog(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleUpdateUser}>
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewUserDialog} onOpenChange={setViewUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Foydalanuvchi ma'lumotlari</DialogTitle>
            <DialogDescription>
              {selectedUser?.name} ning to'liq ma'lumoti
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <div className="flex gap-2">
                    {getUserTypeBadge(selectedUser.userType)}
                    {getStatusBadge(selectedUser.isActive)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Telefon</Label>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Manzil</Label>
                  <p className="font-medium">{selectedUser.address}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ro'yxatdan o'tgan</Label>
                  <p className="font-medium">{new Date(selectedUser.registeredAt).toLocaleDateString('uz-UZ')}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Jami buyurtmalar</Label>
                  <p className="font-medium">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Reyting</Label>
                  <p className="font-medium">⭐ {selectedUser.rating}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewUserDialog(false)}>
              Yopish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DispatcherUsersPage;
