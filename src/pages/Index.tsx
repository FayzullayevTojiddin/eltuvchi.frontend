import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Car, CreditCard, Gift, Users, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-hero rounded-2xl text-white shadow-glow relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Eltuvchi
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Shaharlararo Taxi Xizmati
          </p>
          <Link to="/order">
            <Button size="xl" variant="secondary" className="animate-pulse-glow hover:scale-105 transition-all duration-300">
              🚗 Buyurtma berish
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Umumiy buyurtmalar</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% o'tgan oydan
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125,000 so'm</div>
            <p className="text-xs text-muted-foreground">
              To'lov uchun tayyor
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ballar</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">
              Marketda ishlatish mumkin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/order">
          <Card className="hover:shadow-primary transition-all duration-200 hover:scale-105 cursor-pointer bg-gradient-card border-0">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Buyurtma berish</h3>
            </CardContent>
          </Card>
        </Link>

        <Link to="/balance">
          <Card className="hover:shadow-primary transition-all duration-200 hover:scale-105 cursor-pointer bg-gradient-card border-0">
            <CardContent className="p-6 text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Balans to'ldirish</h3>
            </CardContent>
          </Card>
        </Link>

        <Link to="/market">
          <Card className="hover:shadow-primary transition-all duration-200 hover:scale-105 cursor-pointer bg-gradient-card border-0">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Market</h3>
            </CardContent>
          </Card>
        </Link>

        <Link to="/referral">
          <Card className="hover:shadow-primary transition-all duration-200 hover:scale-105 cursor-pointer bg-gradient-card border-0">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Do'stlarni taklif qilish</h3>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Index