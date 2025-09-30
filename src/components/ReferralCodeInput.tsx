import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Badge} from "@/components/ui/badge"
import {CheckCircle, Lock, Key} from "lucide-react"
import {toast} from "react-hot-toast"
import api from "@/lib/api.ts";

export function ReferralCodeInput() {
    const [referralCode, setReferralCode] = useState("")
    const [isCodeEntered, setIsCodeEntered] = useState(false)
    const [enteredCode, setEnteredCode] = useState("")

    // Check if code was already entered
    useEffect(() => {
        const savedCode = localStorage.getItem('enteredReferralCode')
        if (savedCode) {
            setEnteredCode(savedCode)
            setIsCodeEntered(true)
        }
    }, [])
    const handleSubmitCode = () => {
        if (!referralCode.trim()) {
            toast.error("Referal kodini kiriting")
            return
        }

        if (referralCode.length < 6) {
            toast.error("Referal kodi kamida 6 ta belgidan iborat bo'lishi kerak")
            return
        }

        const requestData = {
            promo_code: referralCode,
        }

        api.post('/referrals', requestData).then((response) => {
            console.log(response?.data)
            toast.success("Muvaffaqiyatli referal kodini saqlandi!")

            // Clear input
            setReferralCode("")
        }).catch((error) => {
            console.log(error)
            toast.error("Xato promo kod kiritildi, iltimos tekshirib qayta kiriting!")
            return
        })

        // Save to localStorage
        // localStorage.setItem('enteredReferralCode', referralCode)
        // setEnteredCode(referralCode)
        // setIsCodeEntered(true)


    }

    if (isCodeEntered) {
        return (
            <Card className="border-success/20 bg-success/5">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-success">
                        <CheckCircle className="h-5 w-5"/>
                        Referal kodi kiritilgan
                    </CardTitle>
                    <CardDescription>
                        Sizning referal kodingiz muvaffaqiyatli saqlandi
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Kiritilgan kod:</p>
                            <Badge variant="secondary" className="font-mono">
                                {enteredCode}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Lock className="h-4 w-4"/>
                            <span className="text-sm">O'zgartirib bo'lmaydi</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5"/>
                    Referal kodi kiriting
                </CardTitle>
                <CardDescription>
                    Referal kodini bir marta kiritishingiz mumkin. Keyinchalik uni o'zgartirib bo'lmaydi.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="referralCode">Referal kodi</Label>
                    <Input
                        id="referralCode"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                        placeholder="Masalan: REF123"
                        className="font-mono"
                        maxLength={20}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Kamida 6 ta belgi kiritish kerak
                    </p>
                </div>

                <Button
                    onClick={handleSubmitCode}
                    className="w-full"
                    disabled={!referralCode.trim() || referralCode.length < 6}
                >
                    Kodini saqlash
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                    ⚠️ Diqqat: Kod saqlanganidan keyin uni o'zgartirib bo'lmaydi
                </div>
            </CardContent>
        </Card>
    )
}