
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Car, Ban, Check, Eye, Filter } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const SuperAdminDriversPage = () => {
  const [driverFilter, setDriverFilter] = useState("")
  const [driverStatusFilter, setDriverStatusFilter] = useState("all")
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const drivers = [
    { id: 1, name: "Bobur Umarov", phone: "+998907654321", carNumber: "01A234BC", carModel: "Cobalt", status: "active", joinDate: "2025-01-10", orders: 89, rating: 4.8, taxiPark: "Yangi Avlod Takso" },
    { id: 2, name: "Aziz Mahmudov", phone: "+998901112233", carNumber: "01B345CD", carModel: "Nexia", status: "active", joinDate: "2025-01-05", orders: 156, rating: 4.9, taxiPark: "Toshkent Takso" },
    { id: 3, name: "Sardor Karimov", phone: "+998909876543", carNumber: "01C456DE", carModel: "Lacetti", status: "blocked", joinDate: "2024-12-20", orders: 23, rating: 3.2, taxiPark: "Speed Taxi" },
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

  const filteredDrivers = drivers.filter(driver => {
    const nameMatch = driver.name.toLowerCase().includes(driverFilter.toLowerCase())
    const phoneMatch = driver.phone.toLowerCase().includes(driverFilter.toLowerCase())
    const statusMatch = driverStatusFilter === "all" || driver.status === driverStatusFilter
    return (nameMatch || phoneMatch) && statusMatch
  })

  const handleToggleDriverStatus = (driverId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active"
    const action = newStatus === "blocked" ? "bloklandi" : "faollashtirildi"
    
    toast.success(`Haydovchi ${action}`)
  }

  const handleViewDriver = (driver: any) => {
    setSelectedDriver(driver)
    setViewDialogOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Haydovchilarni boshqarish</h1>
        <p className="text-muted-foreground">Barcha haydovchilar ro'yxati va boshqaruv</p>
      </div>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Haydovchilar
              </CardTitle>
              <CardDescription>Jami {filteredDrivers.length} ta haydovchi</CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Input
                  placeholder="Qidirish..."
                  value={driverFilter}
                  onChange={(e) => setDriverFilter(e.target.value)}
                  className="w-40"
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
                <TableHead>Takso Park</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Reyting</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{driver.carNumber}</p>
                      <p className="text-sm text-muted-foreground">{driver.carModel}</p>
                    </div>
                  </TableCell>
                  <TableCell>{driver.taxiPark}</TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{driver.rating} ⭐</Badge>
                  </TableCell>
                  <TableCell>{driver.orders}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDriver(driver)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {driver.status === "active" ? (
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
                              {driver.status === "active" 
                                ? `${driver.name} haydovchisini bloklashni xohlaysizmi?`
                                : `${driver.name} haydovchisini faollashtirshni xohlaysizmi?`
                              }
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleToggleDriverStatus(driver.id, driver.status)}>
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

      {/* Driver Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Haydovchi ma'lumotlari</DialogTitle>
            <DialogDescription>
              {selectedDriver?.name} ning to'liq ma'lumotlari
            </DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Ism</h3>
                <p>{selectedDriver.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Telefon</h3>
                <p>{selectedDriver.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Mashina raqami</h3>
                <p>{selectedDriver.carNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Mashina modeli</h3>
                <p>{selectedDriver.carModel}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Takso Park</h3>
                <p>{selectedDriver.taxiPark}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Holat</h3>
                <p>{getStatusBadge(selectedDriver.status)}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Reyting</h3>
                <p>{selectedDriver.rating} ⭐</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Jami buyurtmalar</h3>
                <p>{selectedDriver.orders}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SuperAdminDriversPage
