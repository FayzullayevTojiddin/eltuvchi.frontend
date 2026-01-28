import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Copy, Users, Gift, Star, TrendingUp, Share2, Phone, Mail } from "lucide-react"

const ReferralSystemPage = () => {
  const { toast } = useToast()
  const [referralCode] = useState("ELTUV2025")
  const [friendPhone, setFriendPhone] = useState("")
  const [friendEmail, setFriendEmail] = useState("")
  
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: 1200,
    thisMonth: 300
  }

  const referralHistory = [
    { id: 1, name: "Akmal Karimov", phone: "+998901234567", status: "active", joinDate: "2025-01-15", earned: 100 },
    { id: 2, name: "Bobur Alimov", phone: "+998907654321", status: "active", joinDate: "2025-01-12", earned: 100 },
    { id: 3, name: "Sardor Umarov", phone: "+998905678901", status: "pending", joinDate: "2025-01-25", earned: 0 },
    { id: 4, name: "Jasur Rahimov", phone: "+998903456789", status: "active", joinDate: "2025-01-08", earned: 100 },
  ]

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast({
      title: "Nusxalandi!",
      description: "Referal kodi buferga nusxalandi",
    })
  }

  const copyReferralLink = () => {
    const link = `https://eltuvchi.uz/register?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    toast({
      title: "Havola nusxalandi!",
      description: "Referal havolasi buferga nusxalandi",
    })
  }

  const shareViaWhatsApp = () => {
    const message = `O'rgimchak ilovasidan foydalaning va bepul safarlar qiling! Mening referal kodim: ${referralCode}\nIlovani yuklab olish: https://eltuvchi.uz/register?ref=${referralCode}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const sendInvitation = () => {
    if (!friendPhone && !friendEmail) {
      toast({
        title: "Xato",
        description: "Telefon raqam yoki email kiriting",
        variant: "destructive"
      })
      return
    }

    // Simulate sending invitation
    toast({
      title: "Taklif yuborildi!",
      description: "Do'stingizga taklif muvaffaqiyatli yuborildi",
    })
    setFriendPhone("")
    setFriendEmail("")
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Referal tizimi</h1>
        <p className="text-muted-foreground">Do'stlaringizni taklif qiling va ball to'plang</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
            <p className="text-xs text-muted-eferground">Jami takliflar</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold">{referralStats.activeReferrals}</p>
            <p className="text-xs text-muted-foreground">Faol foydalanuvchilar</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-4 text-center">
            <Gift className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{referralStats.totalEarned}</p>
            <p className="text-xs text-muted-foreground">Jami ball</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card-custom">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold">{referralStats.thisMonth}</p>
            <p className="text-xs text-muted-foreground">Bu oy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="share" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="share">Ulashish</TabsTrigger>
          <TabsTrigger value="invite">Taklif qilish</TabsTrigger>
          <TabsTrigger value="history">Tarix</TabsTrigger>
        </TabsList>

        <TabsContent value="share" className="space-y-4">
          {/* Referral Code */}
          <Card className="bg-gradient-hero text-white border-0 shadow-glow">
            <CardHeader>
              <CardTitle className="text-center">Sizning referal kodingiz</CardTitle>
              <CardDescription className="text-center text-white/80">
                Bu kodni do'stlaringiz bilan bo'lishing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={referralCode} 
                  readOnly 
                  className="bg-white/20 border-white/30 text-white text-center text-xl font-bold"
                />
                <Button onClick={copyReferralCode} variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={copyReferralLink} variant="outline" className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Share2 className="h-4 w-4 mr-2" />
                  Havolani nusxalash
                </Button>
                <Button onClick={shareViaWhatsApp} variant="outline" className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp orqali
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle>Qanday ishlaydi?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-medium">Do'stingizni taklif qiling</h4>
                    <p className="text-sm text-muted-foreground">Referal kodingizni yoki havolangizni ulashing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-medium">Do'stingiz ro'yxatdan o'tadi</h4>
                    <p className="text-sm text-muted-foreground">Sizning kodingiz bilan ro'yxatdan o'tishi kerak</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-medium">Ball oling</h4>
                    <p className="text-sm text-muted-foreground">Do'stingiz birinchi buyurtma berganda 100 ball oling</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invite" className="space-y-4">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle>Do'stingizni taklif qiling</CardTitle>
              <CardDescription>Telefon raqam yoki email orqali to'g'ridan-to'g'ri taklif yuboring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="friendPhone">Do'stingizning telefon raqami</Label>
                <Input 
                  id="friendPhone"
                  type="tel"
                  value={friendPhone}
                  onChange={(e) => setFriendPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              
              <div className="text-center text-sm text-muted-foreground">yoki</div>
              
              <div>
                <Label htmlFor="friendEmail">Do'stingizning email manzili</Label>
                <Input 
                  id="friendEmail"
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="friend@example.com"
                />
              </div>
              
              <Button onClick={sendInvitation} className="w-full" variant="hero">
                <Mail className="h-4 w-4 mr-2" />
                Taklif yuborish
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle>Referal tarixi</CardTitle>
              <CardDescription>Sizning takliflaringiz tarixi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-muted-foreground">{referral.phone}</p>
                        <p className="text-xs text-muted-foreground">Qo'shildi: {referral.joinDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={referral.status === 'active' ? 'default' : 'secondary'}>
                        {referral.status === 'active' ? 'Faol' : 'Kutilmoqda'}
                      </Badge>
                      <p className="text-sm font-bold text-primary mt-1">
                        {referral.earned} ball
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReferralSystemPage