
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Biz bilan bog'laning</h1>
        <p className="text-muted-foreground">
          Savollaringiz bormi? Biz sizga yordam berishga tayyormiz
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Aloqa ma'lumotlari</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Telefon</p>
                <p className="text-muted-foreground">+998 71 123 45 67</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">info@eltuvchi.uz</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Manzil</p>
                <p className="text-muted-foreground">Toshkent, O'zbekiston</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Ish vaqti</p>
                <p className="text-muted-foreground">24/7</p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Xabar yuborish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Ism</label>
              <Input placeholder="Ismingizni kiriting" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Xabar</label>
              <Textarea placeholder="Xabaringizni yozing..." rows={4} />
            </div>
            <Button className="w-full">Yuborish</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContactPage
