import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Eye, EyeOff, Users} from "lucide-react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import api from "@/lib/api.ts";
import toast from "react-hot-toast"

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [selectedRole, setSelectedRole] = useState("client")
    const navigate = useNavigate()

    const demoAccounts = {
        client: {
            email: "client@demo.uz",
            password: "demo123",
            name: "Akmal Karimov"
        },
        taxi: {
            email: "taxi@demo.uz",
            password: "demo123",
            name: "Bobur Umarov",
            car: "Chevrolet Lacetti",
            license: "01A123BC"
        },
        dispatcher: {
            email: "dispatcher@demo.uz",
            password: "demo123",
            name: "Aziz Karimov",
            region: "Toshkent"
        },
        taxiParkOwner: {
            email: "parkowner@demo.uz",
            password: "demo123",
            name: "Jamshid Rahimov",
            parkName: "Tezkor Taksi"
        },
        admin: {
            email: "admin@demo.uz",
            password: "admin123",
            name: "Super Admin"
        }
    }

    const handleLogin = () => {
        try {
            axios.post(api.apiUrl + "/auth", {
                initData: "query_id=AAHs9QY3AwAAAOz1BjcIcR5F&user=%7B%22id%22%3A7365653994%2C%22first_name%22%3A%22Tojiddin1%22%2C%22last_name%22%3A%22Fayzullaev%22%2C%22username%22%3A%22Azamat_akoooo%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F5SM6uSRMAo5wYgVYHpj2nefym3PrJayQGjr54-XcEE1WIk7Oym0qPaW4NhHZxIfx.svg%22%7D&auth_date=1754389322&signature=gE_DFjG4awAWY6CC-qoH7KTSiGbjAvwzhcjcajGSrlLlLh_07DLdtyHL4Q3TkIewRjij3RnyVu7GAn7emUG-DA&hash=ee49e391e0774fc96dad457492cc1321549864cd72de4bba2aca1ad0a462ee3b"
            }).then((res) => {
                console.log(res, res?.data)
                if (res?.status === 200) {
                    if (res?.data?.role == 'client') {
                        localStorage.clear()
                        localStorage.setItem('userRole', 'client')
                        localStorage.setItem('token', res?.data?.token)
                        toast.success("Muvaffaqiyatli kirdingiz!")
                        navigate('/home')
                    } else if (res?.data?.role == "driver") {
                        localStorage.clear()
                        localStorage.setItem('userRole', 'driver')
                        localStorage.setItem('token', res?.data?.token)
                        navigate('/taxi')
                        toast.success("Muvaffaqiyatli kirdingiz!")
                    } else {
                        toast.error("Kirishda xatolik yuz berdi!")
                        navigate('/login')
                    }
                }
            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }
        // // Demo login - in real app this would authenticate with Supabase
        // localStorage.setItem('userRole', selectedRole)
        // localStorage.setItem('isAuthenticated', 'true')
        // localStorage.setItem('userData', JSON.stringify(demoAccounts[selectedRole as keyof typeof demoAccounts]))
        //
        // // Dispatcher uchun qo'shimcha ma'lumotlar
        // if (selectedRole === 'dispatcher') {
        //     localStorage.setItem('userName', demoAccounts.dispatcher.name)
        //     localStorage.setItem('userRegion', demoAccounts.dispatcher.region)
        // }
        //
        // // Taxi Park Owner uchun qo'shimcha ma'lumotlar
        // if (selectedRole === 'taxiParkOwner') {
        //     localStorage.setItem('userName', demoAccounts.taxiParkOwner.name)
        //     localStorage.setItem('parkName', demoAccounts.taxiParkOwner.parkName)
        // }
        //
        // // Route to appropriate dashboard based on role
        // if (selectedRole === 'taxiParkOwner') {
        //     navigate('/taxi-park-owner')
        // } else if (selectedRole === 'admin') {
        //     navigate('/admin')
        // } else if (selectedRole === 'dispatcher') {
        //     navigate('/dispatcher')
        // } else if (selectedRole === 'taxi') {
        //     navigate('/taxi')
        // } else {
        //     navigate('/dashboard')
        // }
        //
        // window.location.reload() // Force reload to update sidebar
    }

    const fillDemoData = () => {
        const demo = demoAccounts[selectedRole as keyof typeof demoAccounts]
        const emailInput = document.getElementById('email') as HTMLInputElement
        const passwordInput = document.getElementById('password') as HTMLInputElement

        if (emailInput) emailInput.value = demo.email
        if (passwordInput) passwordInput.value = demo.password
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md bg-gradient-card border-0 shadow-card-custom">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        Eltuvchi
                    </CardTitle>
                    <CardDescription>
                        Shaharlararo taxi xizmatiga xush kelibsiz
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="client">Mijoz</TabsTrigger>
                            <TabsTrigger value="taxi">Taksi</TabsTrigger>
                            <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
                            <TabsTrigger value="taxiParkOwner">Park egasi</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>

                        <TabsContent value="client" className="space-y-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium">Demo Mijoz</p>
                                <p className="text-xs text-muted-foreground">Buyurtma berish va kuzatish</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="taxi" className="space-y-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium">Demo Haydovchi</p>
                                <p className="text-xs text-muted-foreground">Buyurtma qabul qilish va boshqarish</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="dispatcher" className="space-y-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium">Demo Dispatcher</p>
                                <p className="text-xs text-muted-foreground">Buyurtmalarni boshqarish va chat</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="taxiParkOwner" className="space-y-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium">Taksi Park Egasi</p>
                                <p className="text-xs text-muted-foreground">Park statistikasi va boshqaruv</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="admin" className="space-y-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium">Super Admin</p>
                                <p className="text-xs text-muted-foreground">Tizimni to'liq boshqarish</p>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Email manzilingizni kiriting"
                                type="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Parol</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Parolingizni kiriting"
                                    type={showPassword ? "text" : "password"}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4"/>
                                    ) : (
                                        <Eye className="h-4 w-4"/>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button onClick={fillDemoData} variant="outline" className="w-full">
                            Demo ma'lumotlarni to'ldirish
                        </Button>
                        <Button onClick={handleLogin} className="w-full">
                            Kirish
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link to="/register" className="text-sm text-primary hover:underline">
                            Hisob ochish
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage
