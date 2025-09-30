
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Users, Ban, Check, Eye, Filter } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const SuperAdminUsersPage = () => {
  const [userFilter, setUserFilter] = useState("")
  const [userStatusFilter, setUserStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const users = [
    { id: 1, name: "Akmal Karimov", email: "akmal@example.com", phone: "+998901234567", status: "active", joinDate: "2025-01-15", orders: 15, balance: "45,000", region: "Toshkent" },
    { id: 2, name: "Gulnora Ahmadova", email: "gulnora@example.com", phone: "+998907654321", status: "active", joinDate: "2025-01-10", orders: 28, balance: "75,000", region: "Samarqand" },
    { id: 3, name: "Dilshod Rahimov", email: "dilshod@example.com", phone: "+998909876543", status: "blocked", joinDate: "2025-01-08", orders: 3, balance: "0", region: "Buxoro" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Faol</Badge>
      case "blocked":
        return <Badge variant="destructive">Bloklangan</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(userFilter.toLowerCase())
    const emailMatch = user.email.toLowerCase().includes(userFilter.toLowerCase())
    const statusMatch = userStatusFilter === "all" || user.status === userStatusFilter
    return (nameMatch || emailMatch) && statusMatch
  })

  const handleToggleUserStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active"
    const action = newStatus === "blocked" ? "bloklandi" : "faollashtirildi"
    
    toast.success(`Foydalanuvchi ${action}`)
  }

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setViewDialogOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Foydalanuvchilarni boshqarish</h1>
        <p className="text-muted-foreground">Barcha mijozlar ro'yxati va boshqaruv</p>
      </div>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Foydalanuvchilar
              </CardTitle>
              <CardDescription>Jami {filteredUsers.length} ta foydalanuvchi</CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Input
                  placeholder="Qidirish..."
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="w-40"
                />
              </div>
              <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Holat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Hammasi</SelectItem>
                  <SelectItem value="active">Faol</SelectItem>
                  <SelectItem value="blocked">Bloklangan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ism</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Viloyat</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Qo'shilgan</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.region}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {user.status === "active" ? (
                            <Button size="sm" variant="destructive">
                              <Ban className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="default" className="bg-green-500">
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tasdiqlash</AlertDialogTitle>
                            <AlertDialogDescription>
                              {user.status === "active" 
                                ? `${user.name} foydalanuvchisini bloklashni xohlaysizmi?`
                                : `${user.name} foydalanuvchisini faollashtirshni xohlaysizmi?`
                              }
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleToggleUserStatus(user.id, user.status)}>
                              Tasdiqlash
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Foydalanuvchi ma'lumotlari</DialogTitle>
            <DialogDescription>
              {selectedUser?.name} ning to'liq ma'lumotlari
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Ism</h3>
                <p>{selectedUser.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Telefon</h3>
                <p>{selectedUser.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Viloyat</h3>
                <p>{selectedUser.region}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Holat</h3>
                <p>{getStatusBadge(selectedUser.status)}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Qo'shilgan sana</h3>
                <p>{selectedUser.joinDate}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Jami buyurtmalar</h3>
                <p>{selectedUser.orders}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Balans</h3>
                <p>{selectedUser.balance} so'm</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SuperAdminUsersPage
