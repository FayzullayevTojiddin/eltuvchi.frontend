
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, MapPin, Users, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center py-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Eltuvchi bilan xavfsiz safar
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          O'zbekiston bo'ylab shaharlararo yo'lovchi tashish xizmati - 
          qulay, ishonchli va tejamkor
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-3">
          <Link to="/order">Buyurtma berish</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Car className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Xavfsiz transport</h3>
            <p className="text-sm text-muted-foreground">
              Barcha haydovchilar tekshirilgan
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Keng tarmoq</h3>
            <p className="text-sm text-muted-foreground">
              Butun O'zbekiston bo'ylab
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">24/7 qo'llab-quvvatlash</h3>
            <p className="text-sm text-muted-foreground">
              Har doim yordam berishga tayyormiz
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Ishonchli to'lovlar</h3>
            <p className="text-sm text-muted-foreground">
              Xavfsiz to'lov tizimlari
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default HomePage
