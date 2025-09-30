import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, MoreVertical } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const AdminDiscountsPage = () => {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: "Yozgi chegirma",
      description: "Barcha mahsulotlarga 20% chegirma",
      percentage: 20,
      maxAmount: 50000,
      isActive: true,
    },
    {
      id: 2,
      name: "Talabalar uchun",
      description: "Talabalarga maxsus 15% chegirma",
      percentage: 15,
      maxAmount: 30000,
      isActive: false,
    },
    {
      id: 3,
      name: "Yangi mijozlarga",
      description: "Birinchi buyurtma uchun 10% chegirma",
      percentage: 10,
      maxAmount: 20000,
      isActive: true,
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newDiscount, setNewDiscount] = useState({
    name: "",
    description: "",
    percentage: 0,
    maxAmount: 0,
    isActive: true,
  })
  const [editingDiscount, setEditingDiscount] = useState({
    id: 0,
    name: "",
    description: "",
    percentage: 0,
    maxAmount: 0,
    isActive: true,
  })

  useEffect(() => {
    // API dan chegirmalarni yuklash
    // setDiscounts(loadedDiscounts)
  }, [])

  const toggleDiscountStatus = (id: number) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id ? { ...discount, isActive: !discount.isActive } : discount
      )
    )
  }

  const addDiscount = () => {
    // API ga yangi chegirma qo'shish
    const newId = discounts.length > 0 ? Math.max(...discounts.map(d => d.id)) + 1 : 1;
    const newDiscountWithId = { ...newDiscount, id: newId };
    setDiscounts([...discounts, newDiscountWithId])
    setShowAddDialog(false)
    setNewDiscount({ name: "", description: "", percentage: 0, maxAmount: 0, isActive: true })
  }

  const editDiscount = (discount: any) => {
    setEditingDiscount({ ...discount })
    setShowEditDialog(true)
  }

  const updateDiscount = () => {
    // API dagi chegirmani yangilash
    setDiscounts(
      discounts.map((discount) =>
        discount.id === editingDiscount.id ? { ...editingDiscount } : discount
      )
    )
    setShowEditDialog(false)
    setEditingDiscount({ id: 0, name: "", description: "", percentage: 0, maxAmount: 0, isActive: true })
  }

  const deleteDiscount = (id: number) => {
    // API dan chegirmani o'chirish
    setDiscounts(discounts.filter((discount) => discount.id !== id))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chegirmalarni boshqarish</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Chegirma qo'shish
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {discounts.map((discount) => (
          <Card key={discount.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{discount.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={discount.isActive}
                    onCheckedChange={() => toggleDiscountStatus(discount.id)}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => editDiscount(discount)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => deleteDiscount(discount.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>{discount.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chegirma:</span>
                  <span className="font-medium">{discount.percentage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maksimal:</span>
                  <span className="font-medium">{discount.maxAmount.toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Holat:</span>
                  <Badge variant={discount.isActive ? "default" : "secondary"}>
                    {discount.isActive ? "Faol" : "Nofaol"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Discount Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi chegirma qo'shish</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nomi</label>
              <Input
                value={newDiscount.name}
                onChange={(e) => setNewDiscount({...newDiscount, name: e.target.value})}
                placeholder="Chegirma nomi"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tavsif</label>
              <Textarea
                value={newDiscount.description}
                onChange={(e) => setNewDiscount({...newDiscount, description: e.target.value})}
                placeholder="Chegirma tavsifi"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Foiz (%)</label>
              <Input
                type="number"
                value={newDiscount.percentage}
                onChange={(e) => setNewDiscount({...newDiscount, percentage: Number(e.target.value)})}
                placeholder="0"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Maksimal miqdor (so'm)</label>
              <Input
                type="number"
                value={newDiscount.maxAmount}
                onChange={(e) => setNewDiscount({...newDiscount, maxAmount: Number(e.target.value)})}
                placeholder="0"
                min="1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Bekor qilish
            </Button>
            <Button onClick={addDiscount}>
              Qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Discount Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chegirmani tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nomi</label>
              <Input
                value={editingDiscount.name}
                onChange={(e) => setEditingDiscount({...editingDiscount, name: e.target.value})}
                placeholder="Chegirma nomi"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tavsif</label>
              <Textarea
                value={editingDiscount.description}
                onChange={(e) => setEditingDiscount({...editingDiscount, description: e.target.value})}
                placeholder="Chegirma tavsifi"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Foiz (%)</label>
              <Input
                type="number"
                value={editingDiscount.percentage}
                onChange={(e) => setEditingDiscount({...editingDiscount, percentage: Number(e.target.value)})}
                placeholder="0"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Maksimal miqdor (so'm)</label>
              <Input
                type="number"
                value={editingDiscount.maxAmount}
                onChange={(e) => setEditingDiscount({...editingDiscount, maxAmount: Number(e.target.value)})}
                placeholder="0"
                min="1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Bekor qilish
            </Button>
            <Button onClick={updateDiscount}>
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminDiscountsPage
