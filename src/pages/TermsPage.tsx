import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, Users, CreditCard, AlertTriangle, Phone } from "lucide-react"

const TermsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Ommaviy oferta shartlari</h1>
        <p className="text-muted-foreground">Eltuvchi xizmati foydalanish qoidalari</p>
      </div>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            1. Umumiy qoidalar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Ushbu ommaviy oferta (keyingi o'rinlarda "Oferta") "Eltuvchi" mobil ilovasi (keyingi o'rinlarda "Ilova") 
            orqali yo'lovchi tashish xizmatlaridan foydalanish shartlarini belgilaydi.
          </p>
          <p className="text-sm">
            Ilovadan foydalanish orqali siz ushbu shartlarni to'liq qabul qilasiz va rozi bo'lasiz.
          </p>
          <p className="text-sm">
            Xizmat "Eltuvchi" MChJ tomonidan taqdim etiladi.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            2. Foydalanuvchi huquq va majburiyatlari
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Foydalanuvchi huquqlari:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground ml-4">
              <li>• Yo'lovchi tashish xizmatlarini buyurtma qilish</li>
              <li>• Haydovchi va transport vositasi haqida ma'lumot olish</li>
              <li>• Xizmat sifatini baholash</li>
              <li>• Shikoyat va takliflar bildirish</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Foydalanuvchi majburiyatlari:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground ml-4">
              <li>• To'g'ri va aniq ma'lumotlar berish</li>
              <li>• Belgilangan vaqtda ko'rsatilgan joyda bo'lish</li>
              <li>• Transport vositasida tartib-qoidalarga rioya qilish</li>
              <li>• Xizmat uchun vaqtida to'lov qilish</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            3. To'lov shartlari
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Yo'lovchi tashish xizmati uchun to'lov naqd yoki bank kartalari orqali amalga oshiriladi.
          </p>
          <p className="text-sm">
            Safar narxi masofa, vaqt va transport vositasi turiga qarab hisoblanadi.
          </p>
          <p className="text-sm">
            Oldindan to'lov talab qilinadigan hollarda, bekor qilish 30 daqiqa oldin amalga oshirilishi kerak.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            4. Xavfsizlik va mas'uliyat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Kompaniya yo'lovchilar xavfsizligini ta'minlash uchun barcha zarur choralarni ko'radi.
          </p>
          <p className="text-sm">
            Barcha haydovchilar tekshiruvdan o'tgan va tegishli litsenziyalarga ega.
          </p>
          <p className="text-sm">
            Kompaniya fors-major holatlari uchun mas'uliyat olmaydi.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            5. Bekor qilish va qaytarish
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Buyurtmani bepul bekor qilish 30 daqiqa oldin amalga oshirilishi mumkin.
          </p>
          <p className="text-sm">
            30 daqiqadan kam vaqtda bekor qilish holatida jarima solinishi mumkin.
          </p>
          <p className="text-sm">
            Haydovchi tomonidan bekor qilingan buyurtmalar uchun to'lov qaytariladi.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            6. Aloqa ma'lumotlari
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Kompaniya ma'lumotlari:</h4>
              <p>Eltuvchi MChJ</p>
              <p>STIR: 123456789</p>
              <p>Manzil: Toshkent sh., Amir Temur ko'chasi 1-uy</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Aloqa:</h4>
              <p>Telefon: +998 71 123 45 67</p>
              <p>Email: info@eltuvchi.uz</p>
              <p>Qo'llab-quvvatlash: 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-hero text-white border-0 shadow-glow">
        <CardContent className="p-6 text-center">
          <p className="text-sm opacity-90">
            Ushbu oferta 2025-yil 1-yanvardan kuchga kiradi va keyingi e'lonlargacha amal qiladi.
          </p>
          <p className="text-xs opacity-75 mt-2">
            Oxirgi yangilanish: 2025-yil 1-yanvar
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default TermsPage