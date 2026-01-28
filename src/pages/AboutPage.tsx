import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, MapPin, Award, Shield, Clock } from "lucide-react"

const AboutPage = () => {
  const features = [
    {
      icon: Car,
      title: "Xavfsiz transport",
      description: "Barcha haydovchilar tekshirilgan va litsenziyalangan"
    },
    {
      icon: Clock,
      title: "24/7 xizmat",
      description: "Kun bo'yi faol qo'llab-quvvatlash xizmati"
    },
    {
      icon: MapPin,
      title: "Keng marshrut tarmog'i",
      description: "O'zbekistonning barcha viloyatlari bo'ylab"
    },
    {
      icon: Shield,
      title: "Himoyalangan to'lovlar",
      description: "Xavfsiz va ishonchli to'lov tizimi"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Faol foydalanuvchi" },
    { number: "15", label: "Viloyat" },
    { number: "1,000+", label: "Haydovchi" },
    { number: "99.9%", label: "Ishonchlilik" }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-hero rounded-2xl text-white shadow-glow">
        <Car className="h-16 w-16 mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          O'rgimchak haqida
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          O'zbekistonda eng ishonchli shaharlararo taxi xizmati - xavfsiz, qulay va tejamkor
        </p>
      </div>

      {/* Mission */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Bizning maqsadimiz</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              O'rgimchak - bu O'zbekiston bo'ylab shaharlararo yo'lovchi tashish xizmatlarini 
              raqamlashtirish va zamoniylashtirish maqsadida yaratilgan platforma. Biz har bir 
              safar xavfsiz, qulay va arzon bo'lishini ta'minlaymiz.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-0 shadow-card-custom text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Nima uchun O'rgimchak?</CardTitle>
          <CardDescription className="text-center">
            Bizning afzalliklarimiz va xususiyatlarimiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Qanday ishlaydi?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Buyurtma bering</h3>
              <p className="text-sm text-muted-foreground">
                Qayerdan va qayerga bormoqchi ekanligingizni, sanani va yo'lovchilar sonini tanlang
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Haydovchi topiladi</h3>
              <p className="text-sm text-muted-foreground">
                Sizning marshrutingiz bo'yicha haydovchi buyurtmangizni qabul qiladi
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Xavfsiz safar</h3>
              <p className="text-sm text-muted-foreground">
                Haydovchi bilan bog'lanib, xavfsiz va qulay safar qiling
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-gradient-hero text-white border-0 shadow-glow">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Biz bilan bog'laning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Telefon</h3>
              <p className="opacity-90">+998 71 123 45 67</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="opacity-90">info@eltuvchi.uz</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Manzil</h3>
              <p className="opacity-90">Toshkent, O'zbekiston</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-primary">
            2024-yilda tashkil etilgan
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutPage