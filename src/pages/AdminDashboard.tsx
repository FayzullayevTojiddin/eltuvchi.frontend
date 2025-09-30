
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Car, ShoppingBag, DollarSign, TrendingUp, Calendar, MapPin, UserCheck, Building2, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: "Jami foydalanuvchilar", value: "1,247", change: "+12%", icon: Users, trend: "up" },
    { title: "Faol taksilar", value: "89", change: "+5%", icon: Car, trend: "up" },
    { title: "Kunlik buyurtmalar", value: "156", change: "+23%", icon: ShoppingBag, trend: "up" },
    { title: "Jami daromad", value: "45,678,000", change: "+18%", icon: DollarSign, trend: "up" },
    { title: "Bu hafta buyurtmalar", value: "1,089", change: "+15%", icon: Calendar, trend: "up" },
    { title: "Dispatcherlar", value: "24", change: "+2%", icon: UserCheck, trend: "up" },
  ]

  return (
    <div className="space-y-6 animate-fade-in p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Tizimni boshqarish paneli</p>
        </div>
        <Button 
          onClick={() => navigate('/admin/taxi-parks')}
          className="flex items-center gap-2"
        >
          <Building2 className="h-4 w-4" />
          Taksi parklar
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => navigate('/admin/users')}
          variant="outline" 
          className="h-auto p-4 flex flex-col gap-2"
        >
          <Users className="h-6 w-6" />
          <span className="font-medium">Foydalanuvchilar</span>
          <span className="text-xs text-muted-foreground">Boshqarish va kuzatish</span>
        </Button>
        <Button 
          onClick={() => navigate('/admin/taxi-parks')}
          variant="outline" 
          className="h-auto p-4 flex flex-col gap-2"
        >
          <Building2 className="h-6 w-6" />
          <span className="font-medium">Taksi parklar</span>
          <span className="text-xs text-muted-foreground">Park boshqaruvi</span>
        </Button>
        <Button 
          onClick={() => navigate('/admin/orders')}
          variant="outline" 
          className="h-auto p-4 flex flex-col gap-2"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="font-medium">Buyurtmalar</span>
          <span className="text-xs text-muted-foreground">Barcha buyurtmalar</span>
        </Button>
        <Button 
          onClick={() => navigate('/admin/payments')}
          variant="outline" 
          className="h-auto p-4 flex flex-col gap-2"
        >
          <DollarSign className="h-6 w-6" />
          <span className="font-medium">To'lovlar</span>
          <span className="text-xs text-muted-foreground">Moliyaviy hisobotlar</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-0 shadow-card-custom hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold mb-3">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <p className="text-sm font-medium text-success">{stat.change}</p>
                  </div>
                </div>
                <div className="ml-4">
                  <stat.icon className="h-10 w-10 text-primary opacity-80" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardHeader>
            <CardTitle>Umumiy statistika</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Jami buyurtmalar:</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between">
                <span>Yakunlangan:</span>
                <span className="font-medium text-success">2,156</span>
              </div>
              <div className="flex justify-between">
                <span>Bekor qilingan:</span>
                <span className="font-medium text-warning">156</span>
              </div>
              <div className="flex justify-between">
                <span>Jami daromad:</span>
                <span className="font-medium">187,450,000 so'm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardHeader>
            <CardTitle>Oy statistikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Bu oy buyurtmalar:</span>
                <span className="font-medium">456</span>
              </div>
              <div className="flex justify-between">
                <span>O'sish:</span>
                <span className="font-medium text-success">+23%</span>
              </div>
              <div className="flex justify-between">
                <span>Faol haydovchilar:</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span>Yangi foydalanuvchilar:</span>
                <span className="font-medium">124</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
