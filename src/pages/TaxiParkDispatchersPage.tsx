
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Search, Plus, Eye, UserCheck, Phone, Calendar } from 'lucide-react'
import { toast } from 'sonner'

const TaxiParkDispatchersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDispatcher, setNewDispatcher] = useState({
    name: '',
    phone: '',
    telegramId: ''
  })

  // Demo ma'lumotlar
  const [dispatchers, setDispatchers] = useState([
    {
      id: '001',
      name: 'Aziz Karimov',
      phone: '+998 90 123 45 67',
      telegramId: '@aziz_dispatcher',
      status: 'active',
      joinDate: '2024-01-10',
      ordersHandled: 156
    },
    {
      id: '002',
      name: 'Malika Rahimova', 
      phone: '+998 91 234 56 78',
      telegramId: '@malika_disp',
      status: 'active',
      joinDate: '2024-01-05',
      ordersHandled: 98
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Faol</Badge>
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Nofaol</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredDispatchers = useMemo(() => {
    return dispatchers.filter(dispatcher =>
      dispatcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatcher.phone.includes(searchTerm) ||
      dispatcher.telegramId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [dispatchers, searchTerm])

  const handleAddDispatcher = () => {
    if (newDispatcher.name && newDispatcher.phone && newDispatcher.telegramId) {
      const dispatcher = {
        id: String(dispatchers.length + 1).padStart(3, '0'),
        ...newDispatcher,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        ordersHandled: 0
      }
      setDispatchers([...dispatchers, dispatcher])
      setNewDispatcher({ name: '', phone: '', telegramId: '' })
      setIsAddDialogOpen(false)
      toast.success('Dispatcher muvaffaqiyatli qo\'shildi!')
    } else {
      toast.error('Barcha maydonlarni to\'ldiring!')
    }
  }

  const stats = {
    total: dispatchers.length,
    active: dispatchers.filter(d => d.status === 'active').length,
    totalOrders: dispatchers.reduce((sum, d) => sum + d.ordersHandled, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dispatcherlar</h1>
          <p className="text-muted-foreground">Dispatcherlaringizni boshqaring</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Yangi dispatcher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi dispatcher qo'shish</DialogTitle>
              <DialogDescription>
                Yangi dispatcher ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">To'liq ism</Label>
                <Input
                  id="name"
                  value={newDispatcher.name}
                  onChange={(e) => setNewDispatcher({...newDispatcher, name: e.target.value})}
                  placeholder="Ism familiya"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqam</Label>
                <Input
                  id="phone"
                  value={newDispatcher.phone}
                  onChange={(e) => setNewDispatcher({...newDispatcher, phone: e.target.value})}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram ID</Label>
                <Input
                  id="telegram"
                  value={newDispatcher.telegramId}
                  onChange={(e) => setNewDispatcher({...newDispatcher, telegramId: e.target.value})}
                  placeholder="@username"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddDispatcher} className="flex-1">
                  Qo'shish
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Bekor qilish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistika kartalar */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami dispatcherlar</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faol dispatcherlar</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami buyurtmalar</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Qidiruv va ro'yxat */}
      <Card>
        <CardHeader>
          <CardTitle>Dispatcherlar ro'yxati</CardTitle>
          <CardDescription>Barcha dispatcherlarni ko'ring va boshqaring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Dispatcher nomi, telefon yoki telegram ID bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ism</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Telegram</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Qo'shilgan sana</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDispatchers.map((dispatcher) => (
                <TableRow key={dispatcher.id}>
                  <TableCell className="font-medium">{dispatcher.id}</TableCell>
                  <TableCell>{dispatcher.name}</TableCell>
                  <TableCell>{dispatcher.phone}</TableCell>
                  <TableCell>{dispatcher.telegramId}</TableCell>
                  <TableCell>{getStatusBadge(dispatcher.status)}</TableCell>
                  <TableCell>{dispatcher.joinDate}</TableCell>
                  <TableCell>{dispatcher.ordersHandled}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaxiParkDispatchersPage
