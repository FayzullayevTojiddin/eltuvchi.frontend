import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {User, Phone, Mail, Car, Shield, Edit} from "lucide-react"
import {useEffect, useState} from "react";
import api from "@/lib/api.ts";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const userRole = localStorage.getItem('userRole') || 'client'
    const userName = localStorage.getItem('userName') || 'Foydalanuvchi'

    const [useInformation, setUseInformation] = useState<any>({})
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editData, setEditData] = useState({
        full_name: '',
        phone_number: '',
        telegram_id: ''
    })

    useEffect(() => {
        try {
            api.get('/client/me').then((res) => {
                console.log(res?.data)
                setUseInformation(res.data)
                setEditData({
                    full_name: res.data?.settings?.full_name || '',
                    phone_number: res.data?.settings?.phone_number || '',
                    telegram_id: res.data?.telegram_id || ''
                })
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi! Iltimos, qayta urinib ko'ring.")
            })
        } catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi! Iltimos, qayta urinib ko'ring.")
        }
    }, []);

    const handleSaveProfile = () => {
        // Mock save - in real app would call API
        // setUseInformation({
        //     ...useInformation,
        //     settings: {
        //         ...useInformation.settings,
        //         full_name: editData.full_name,
        //         phone_number: editData.phone_number
        //     },
        //     telegram_id: editData.telegram_id
        // })
        // setIsEditOpen(false)
        // toast.success("Profil muvaffaqiyatli yangilandi!")
        try{
            api.put(`/client/me`, editData).then((res) => {
                console.log(res?.data)
                setIsEditOpen(false)
                toast.success("Profil muvaffaqiyatli yangilandi!")
                window.location.reload()
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi! Iltimos, qayta urinib ko'ring.")
            })
        }catch (e) {
            console.log(e)
            toast.error("Xatolik yuz berdi!")
        }
    }

    // Mock data - real data would come from backend
    const userInfo = {
        name: userName,
        phone: "+998 90 123 45 67",
        telegramId: "@username",
        avatar: "/placeholder.svg"
    }

    // Driver specific data - only shown for taxi role
    const driverInfo = {
        carModel: "Chevrolet Lacetti",
        carNumber: "01 A 123 BC",
        carColor: "Oq",
        licenseNumber: "AA1234567"
    }

    return (
        <div className="space-y-6 p-4 max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Profil</h1>
                <p className="text-muted-foreground">Shaxsiy ma'lumotlaringiz</p>
            </div>

            {/* User Info Card */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader className="text-center pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex-1"></div>
                        <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                            <AvatarFallback
                                className="text-lg font-bold bg-gradient-to-br from-primary to-primary/80 text-white">
                                TF
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex justify-end">
                            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="rounded-full p-2">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Profilni tahrirlash</DialogTitle>
                                        <DialogDescription>
                                            Shaxsiy ma'lumotlaringizni yangilang
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                To'liq ism
                                            </Label>
                                            <Input
                                                id="name"
                                                value={editData.full_name}
                                                onChange={(e) => setEditData({...editData, full_name: e.target.value})}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="phone" className="text-right">
                                                Telefon
                                            </Label>
                                            <Input
                                                id="phone"
                                                value={editData.phone_number}
                                                onChange={(e) => setEditData({...editData, phone_number: e.target.value})}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="telegram" className="text-right">
                                                Telegram ID
                                            </Label>
                                            <Input
                                                id="telegram"
                                                disabled={true}
                                                value={editData.telegram_id}
                                                onChange={(e) => setEditData({...editData, telegram_id: e.target.value})}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleSaveProfile}>Saqlash</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <CardTitle className="text-xl">{useInformation?.settings?.full_name}</CardTitle>
                    <CardDescription>
                        <Badge variant="outline" className="mt-2">
                            {useInformation?.role === 'taxi' ? 'Haydovchi' :
                                useInformation?.role === 'client' ? 'Klint' :
                                    useInformation?.role === 'admin' ? 'Administrator' :
                                        useInformation?.role === 'dispatcher' ? 'Dispatcher' :
                                            useInformation?.role === 'super-admin' ? 'Super Admin' :
                                                useInformation?.role === 'taxi-park-admin' ? 'Takso Park Admin' : 'Mijoz'}
                        </Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">To'liq ism</p>
                                <p className="font-medium">{useInformation?.settings?.full_name || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Telefon raqam</p>
                                <p className="font-medium">{useInformation?.settings?.phone_number || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Telegram ID</p>
                                <p className="font-medium">{useInformation.telegram_id || '-'}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Driver Car Info - Only for taxi role */}
            {userRole === 'taxi' && (
                <Card className="bg-gradient-card border-0 shadow-card-custom">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-5 w-5"/>
                            Avtomobil ma'lumotlari
                        </CardTitle>
                        <CardDescription>
                            Bu ma'lumotlarni o'zgartirib bo'lmaydi. O'zgartirish uchun administratorga murojaat qiling.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Avtomobil modeli</p>
                                <p className="font-medium">{driverInfo.carModel}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Davlat raqami</p>
                                <p className="font-medium font-mono">{driverInfo.carNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Rang</p>
                                <p className="font-medium">{driverInfo.carColor}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Haydovchilik guvohnomasi</p>
                                <p className="font-medium font-mono">{driverInfo.licenseNumber}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-success"/>
                                <span className="text-sm text-success font-medium">Tasdiqlangan</span>
                                <Badge variant="outline"
                                       className="ml-auto bg-success/10 text-success border-success/20">
                                    Faol
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default ProfilePage
