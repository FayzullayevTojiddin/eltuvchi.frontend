import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Award, Plus, Star, Trophy, Medal, Gift, Users, Calendar } from "lucide-react"

const AdminAwardsPage = () => {
  const [awardDialogOpen, setAwardDialogOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState("")
  const [awardData, setAwardData] = useState({
    title: "",
    description: "",
    type: "",
    points: 0
  })

  // Mock data
  const drivers = [
    { id: "1", name: "Akmal Karimov", avatar: "", totalTrips: 156, rating: 4.9 },
    { id: "2", name: "Bobur Rahimov", avatar: "", totalTrips: 203, rating: 4.8 },
    { id: "3", name: "Sardor Nazarov", avatar: "", totalTrips: 89, rating: 4.7 },
    { id: "4", name: "Dilshod Toshmatov", avatar: "", totalTrips: 45, rating: 4.6 }
  ]

  const awardedDrivers = [
    { 
      id: "1", 
      name: "Akmal Karimov", 
      avatar: "", 
      awards: [
        { title: "5 Yulduzli Haydovchi", type: "excellence", awardedDate: "2025-01-25" },
        { title: "Tezkor Xizmat", type: "speed", awardedDate: "2025-01-20" }
      ]
    },
    { 
      id: "2", 
      name: "Bobur Rahimov", 
      avatar: "", 
      awards: [
        { title: "Eng Faol Haydovchi", type: "activity", awardedDate: "2025-01-22" }
      ]
    }
  ]

  const awardTypes = [
    { value: "excellence", label: "A'lolik mukofoti", icon: Star, color: "bg-yellow-500" },
    { value: "speed", label: "Tezkorlik mukofoti", icon: Trophy, color: "bg-blue-500" },
    { value: "activity", label: "Faollik mukofoti", icon: Medal, color: "bg-green-500" },
    { value: "special", label: "Maxsus mukofot", icon: Gift, color: "bg-purple-500" }
  ]

  const handleAwardDriver = () => {
    if (!selectedDriver || !awardData.title || !awardData.type) {
      alert("Barcha maydonlarni to'ldiring!")
      return
    }

    // Here would be the actual award logic
    alert(`${drivers.find(d => d.id === selectedDriver)?.name} ga "${awardData.title}" mukofoti berildi!`)
    
    // Reset form
    setAwardDialogOpen(false)
    setSelectedDriver("")
    setAwardData({ title: "", description: "", type: "", points: 0 })
  }

  const getAwardIcon = (type: string) => {
    const awardType = awardTypes.find(at => at.value === type)
    return awardType ? awardType.icon : Award
  }

  const getAwardColor = (type: string) => {
    const awardType = awardTypes.find(at => at.value === type)
    return awardType ? awardType.color : "bg-gray-500"
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mukofotlar boshqaruvi</h1>
          <p className="text-muted-foreground">Haydovchilarga mukofotlar bering va kuzatib boring</p>
        </div>
        
        <Dialog open={awardDialogOpen} onOpenChange={setAwardDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Mukofot berish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi mukofot berish</DialogTitle>
              <DialogDescription>
                Haydovchini tanlang va mukofot berish uchun ma'lumotlarni kiriting
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Haydovchini tanlang</Label>
                <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Haydovchini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{driver.name}</span>
                          <span className="text-xs text-muted-foreground">({driver.totalTrips} safar)</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mukofot turi</Label>
                <Select value={awardData.type} onValueChange={(value) => setAwardData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mukofot turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {awardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Mukofot nomi</Label>
                <Input
                  id="title"
                  value={awardData.title}
                  onChange={(e) => setAwardData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masalan: Eng yaxshi haydovchi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={awardData.description}
                  onChange={(e) => setAwardData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Mukofot uchun sabab..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">Ball (ixtiyoriy)</Label>
                <Input
                  id="points"
                  type="number"
                  value={awardData.points}
                  onChange={(e) => setAwardData(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAwardDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAwardDriver}>
                Mukofot berish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Award Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {awardTypes.map((type, index) => (
          <Card key={index} className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${type.color} text-white`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{type.label}</p>
                  <p className="text-2xl font-bold">
                    {awardedDrivers.reduce((total, driver) => 
                      total + driver.awards.filter(award => award.type === type.value).length, 0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Awarded Drivers */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Mukofotlangan haydovchilar
          </CardTitle>
          <CardDescription>Mukofot olgan haydovchilar ro'yxati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {awardedDrivers.map((driver) => (
              <div key={driver.id} className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={driver.avatar} />
                    <AvatarFallback>
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{driver.name}</h3>
                    <p className="text-sm text-muted-foreground">{driver.awards.length} mukofot</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {driver.awards.map((award, awardIndex) => {
                    const AwardIcon = getAwardIcon(award.type)
                    return (
                      <Badge 
                        key={awardIndex} 
                        variant="secondary" 
                        className={`${getAwardColor(award.type)} text-white gap-1`}
                      >
                        <AwardIcon className="h-3 w-3" />
                        {award.title}
                        <span className="text-xs opacity-75">
                          {new Date(award.awardedDate).toLocaleDateString('uz-UZ')}
                        </span>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Drivers (candidates for awards) */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Mukofot nomzodlari
          </CardTitle>
          <CardDescription>Mukofot berish uchun mavjud haydovchilar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={driver.avatar} />
                    <AvatarFallback>
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{driver.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{driver.totalTrips} safar</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{driver.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedDriver(driver.id)
                      setAwardDialogOpen(true)
                    }}
                  >
                    Mukofot berish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminAwardsPage