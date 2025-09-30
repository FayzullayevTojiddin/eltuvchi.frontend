
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, Eye, Car, Clock, CheckCircle, XCircle } from 'lucide-react'

const TaxiParkOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Demo ma'lumotlar
  const orders = [
    {
      id: '001',
      clientName: 'Ahmad Karimov',
      driverName: 'Bobur Umarov',
      from: 'Toshkent',
      to: 'Samarqand',
      status: 'completed',
      price: 150000,
      date: '2024-01-15',
      duration: '3 soat 45 min'
    },
    {
      id: '002',
      clientName: 'Fatima Rahimova',
      driverName: 'Aziz Karimov',
      from: 'Buxoro',
      to: 'Toshkent',
      status: 'active',
      price: 180000,
      date: '2024-01-15',
      duration: 'Davom etmoqda'
    },
    {
      id: '003',
      clientName: 'Rustam Abdullayev',
      driverName: 'Jamshid Rahimov',
      from: 'Namangan',
      to: 'Andijon',
      status: 'cancelled',
      price: 85000,
      date: '2024-01-14',
      duration: 'Bekor qilingan'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Tugatilgan</Badge>
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Faol</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Bekor qilingan</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.to.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    active: orders.filter(o => o.status === 'active').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Buyurtmalar</h1>
        <p className="text-muted-foreground">Takso parkingiz buyurtmalarini boshqaring</p>
      </div>

      {/* Statistika kartalar */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami buyurtmalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugatilgan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekor qilingan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter va qidiruv */}
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar ro'yxati</CardTitle>
          <CardDescription>Barcha buyurtmalarni ko'ring va boshqaring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Mijoz, haydovchi yoki yo'nalish bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barchasi</SelectItem>
                <SelectItem value="completed">Tugatilgan</SelectItem>
                <SelectItem value="active">Faol</SelectItem>
                <SelectItem value="cancelled">Bekor qilingan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Haydovchi</TableHead>
                <TableHead>Yo'nalish</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Narx</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.driverName}</TableCell>
                  <TableCell>{order.from} → {order.to}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.price.toLocaleString()} so'm</TableCell>
                  <TableCell>{order.date}</TableCell>
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

export default TaxiParkOrdersPage
