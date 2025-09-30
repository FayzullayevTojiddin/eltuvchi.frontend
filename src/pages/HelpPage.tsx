import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { HelpCircle, Phone, Mail, MessageCircle } from "lucide-react"

const HelpPage = () => {
  const faqs = [
    {
      question: "Buyurtma qanday beriladi?",
      answer: "Buyurtma berish uchun 'Buyurtma berish' bo'limiga o'ting, marshrut tanlang, sana va yo'lovchilar sonini kiriting. Tizim avtomatik narxni hisoblab beradi."
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "Balansga oldindan pul qo'yishingiz kerak. Buyurtma yaratganingizda kerakli miqdor balansdan ushlab qolinadi."
    },
    {
      question: "Buyurtmani bekor qilsam nima bo'ladi?",
      answer: "Agar haydovchi hali buyurtmangizni olmagan bo'lsa, to'liq pul qaytariladi. Agar olgan bo'lsa, zalog puli kuyadi."
    },
    {
      question: "Ballarni qanday ishlatish mumkin?",
      answer: "Ballarni Market bo'limida turli sovg'alarga almashtirishingiz mumkin - chegirmalar, bepul safarlar va VIP xizmatlar."
    },
    {
      question: "Referal dasturi qanday ishlaydi?",
      answer: "Sizning referal kodingiz orqali yangi foydalanuvchi ro'yxatdan o'tganda siz ball olasiz. Har bir faol referal uchun qo'shimcha mukofotlar ham mavjud."
    },
    {
      question: "Haydovchi bilan qanday aloqa qilish mumkin?",
      answer: "Buyurtmangiz qabul qilinganidan so'ng haydovchining telefon raqami va boshqa ma'lumotlari 'Buyurtmalar' bo'limida ko'rsatiladi."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Yordam markazi</h1>
        <p className="text-muted-foreground">Sizning savollaringizga javob topish uchun</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card-custom text-center">
          <CardContent className="p-6">
            <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Telefon</h3>
            <p className="text-sm text-muted-foreground mb-4">24/7 qo'llab-quvvatlash</p>
            <Button variant="outline" size="sm">
              +998 71 123 45 67
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom text-center">
          <CardContent className="p-6">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-4">Yozma murojaat</p>
            <Button variant="outline" size="sm">
              support@eltuvchi.uz
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-custom text-center">
          <CardContent className="p-6">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">Tezkor javob</p>
            <Button variant="hero" size="sm">
              Chat ochish
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Ko'p so'raladigan savollar
          </CardTitle>
          <CardDescription>
            Eng ommabop savollar va javoblar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="bg-gradient-card border-0 shadow-card-custom">
        <CardHeader>
          <CardTitle>Murojaat yuborish</CardTitle>
          <CardDescription>
            Sizning savolingizga javob topmadingiz? Biz bilan bog'laning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Ism</Label>
              <Input id="name" placeholder="Ismingizni kiriting" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="subject">Mavzu</Label>
            <Input id="subject" placeholder="Murojaat mavzusi" />
          </div>
          
          <div>
            <Label htmlFor="message">Xabar</Label>
            <Textarea 
              id="message" 
              placeholder="Sizning savolingizni batafsil yozing..."
              className="min-h-[120px]"
            />
          </div>
          
          <Button size="lg" variant="hero" className="w-full">
            Xabar yuborish
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default HelpPage