import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Car, MapPin, Phone, Mail, Calendar, Award, Clock, Shield } from "lucide-react"

interface DriverModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver: {
    id: string
    name: string
    phone: string
    email: string
    avatar: string
    rating: number
    totalTrips: number
    totalDistance: string
    carModel: string
    carNumber: string
    licenseNumber: string
    joinDate: string
    city: string
    status: "online" | "offline" | "busy"
    completedTrips: number
    awards: string[]
  } | null
}

export function DriverModal({ open, onOpenChange, driver }: DriverModalProps) {
  if (!driver) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Onlayn'
      case 'busy': return 'Band'
      case 'offline': return 'Offline'
      default: return 'Noma\'lum'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Haydovchi profili</DialogTitle>
          <DialogDescription>
            Haydovchi haqida to'liq ma'lumot
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Driver Header */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                <AvatarImage src={driver.avatar} />
                <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary to-primary/80 text-white">
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(driver.status)} rounded-full border-2 border-background`}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{driver.name}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{driver.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{driver.city}</span>
                </div>
                <Badge variant="secondary" className={`${getStatusColor(driver.status)} text-white`}>
                  {getStatusText(driver.status)}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${driver.phone}`} className="text-primary hover:underline">
                    {driver.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{driver.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Statistics */}
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Statistika</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jami safarlar:</span>
                  <span className="font-medium">{driver.totalTrips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yakunlangan safarlar:</span>
                  <span className="font-medium text-success">{driver.completedTrips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jami masofa:</span>
                  <span className="font-medium">{driver.totalDistance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Qo'shilgan sana:</span>
                  <span className="font-medium">{new Date(driver.joinDate).toLocaleDateString('uz-UZ')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Transport ma'lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avtomobil:</span>
                  <span className="font-medium">{driver.carModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Raqam:</span>
                  <span className="font-medium">{driver.carNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guvohnoma:</span>
                  <span className="font-medium">{driver.licenseNumber}</span>
                </div>
                <div className="pt-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <Shield className="h-3 w-3 mr-1" />
                    Tasdiqlangan
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Awards */}
          {driver.awards && driver.awards.length > 0 && (
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Mukofotlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {driver.awards.map((award, index) => (
                    <Badge key={index} variant="default" className="bg-primary/20 text-primary">
                      <Award className="h-3 w-3 mr-1" />
                      {award}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Driver Photos/Gallery */}
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Haydovchi rasmlari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Placeholder images - in real app these would be actual photos */}
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Car className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}