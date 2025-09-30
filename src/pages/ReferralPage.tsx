import {useEffect, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Copy, Users, Gift, Star, Trophy, CheckCircle} from "lucide-react"
import {toast} from "react-hot-toast"
import {ReferralCodeInput} from "@/components/ReferralCodeInput"
import api from "@/lib/api.ts";

const ReferralPage = () => {
    const [referralCode] = useState("REF" + Math.random().toString(36).substr(2, 6).toUpperCase())

    const [referralsData, setReferralsData] = useState([])

    useEffect(() => {
        try {
            api.get('/referrals').then((res) => {
                setReferralsData(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi!")
            })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi!")
        }
    }, []);
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Referal kodi nusxalandi!")
    }

    const referralStats = {
        totalReferrals: 12,
        activeReferrals: 8,
        totalEarned: 24000,
        pendingReward: 5000
    }

    const recentReferrals = [
        {name: "Sardor O.", date: "2024-01-15", status: "active", reward: 2000},
        {name: "Aziza K.", date: "2024-01-10", status: "active", reward: 2000},
        {name: "Bobur S.", date: "2024-01-05", status: "pending", reward: 2000},
    ]

    return (
        <div className="space-y-6 p-4 max-w-6xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Referal tizimi</h1>
                <p className="text-muted-foreground text-sm md:text-base">Do'stlaringizni taklif qiling va mukofot
                    oling</p>
            </div>

            {/* Referral Code Card */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Gift className="h-5 w-5"/>
                        Sizning referal kodingiz
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Bu kodni do'stlaringiz bilan baham ko'ring
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <Input
                                value={referralCode}
                                readOnly
                                className="font-mono text-lg text-center sm:text-left bg-muted"
                            />
                        </div>
                        <Button
                            onClick={() => copyToClipboard(referralCode)}
                            className="w-full sm:w-auto"
                        >
                            <Copy className="h-4 w-4 mr-2"/>
                            Nusxalash
                        </Button>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            Har bir faol referal uchun <strong className="text-primary">2,000 so'm</strong> mukofot
                            oling!
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <Card className="bg-gradient-card border-0 shadow-card-custom">
                    <CardContent className="p-4 md:p-6 text-center">
                        <Users className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-primary"/>
                        <div className="text-2xl font-bold text-primary">{referralsData?.length || 0}</div>
                        <p className="text-xs md:text-sm text-muted-foreground">Jami taklif</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-card border-0 shadow-card-custom">
                    <CardContent className="p-4 md:p-6 text-center">
                        <CheckCircle className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-success"/>
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <p className="text-xs md:text-sm text-muted-foreground">Pointlar</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-card border-0 shadow-card-custom">
                    <CardContent className="p-4 md:p-6 text-center">
                        <Trophy className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-yellow-500"/>
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <p className="text-xs md:text-sm text-muted-foreground">Haftalik referallar</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-card border-0 shadow-card-custom">
                    <CardContent className="p-4 md:p-6 text-center">
                        <Star className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-orange-500"/>
                        <div className="text-2xl font-bold text-orange-600">0</div>
                        <p className="text-xs md:text-sm text-muted-foreground">Oylik referallar</p>
                    </CardContent>
                </Card>
            </div>

            {/* Referral Code Input */}
            <div className="max-w-2xl mx-auto">
                <ReferralCodeInput/>
            </div>

            {/* Recent Referrals */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">So'nggi takliflar</CardTitle>
                    <CardDescription>Sizning oxirgi referal faoliyatingiz</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {referralsData && Array.isArray(referralsData) && referralsData.length > 0 ? (
                            referralsData.map((referral: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background rounded-lg border gap-2"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">{referral.full_name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(referral.created_at).toLocaleDateString("uz-UZ")}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <Badge
                                            variant={referral.status === "active" ? "default" : "secondary"}
                                        >
                                            {referral.status === "active" ? "Faol" : "Kutilmoqda"}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">
                                Hech qanday referal topilmadi
                            </p>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default ReferralPage
