import React, {useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Calendar} from '@/components/ui/calendar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {MapPin, Clock, CreditCard, Calendar as CalendarIcon, Percent, CheckCircle} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import {cn} from '@/lib/utils'
import api from "@/lib/api.ts"
import {formatCurrency} from "@/utils/numberFormat.ts"
import {toast} from "react-hot-toast"

const OrderPage = () => {
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState({
        fromRegion: '',
        fromDistrict: '',
        toRegion: '',
        toDistrict: '',
        date: undefined as Date | undefined,
        time: '',
        passengers: '1',
        phone: '',
        optional_phone: '',
        note: '',
        client_deposit: 0,
        route_id: undefined,
    })
    const [selectedDiscount, setSelectedDiscount] = useState<any>(null)
    const [showDiscountModal, setShowDiscountModal] = useState(false)
    const [regionDatas, setRegionDatas] = useState([])
    const [fromDistrictDatas, setFromDistrictDatas] = useState([])
    const [toDistrictDatas, setToDistrictDatas] = useState([])
    const [routesData, setRoutesData] = useState<any>(null)
    const [discountDatas, setDiscountDatas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        api.setToken(token)

        const fetchRegions = async () => {
            try {
                const response = await api.get('/regions')
                setRegionDatas(response?.data)
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    "Regionlarni yuklashda xatolik"
                )
            }
        }

        fetchRegions()
    }, [])

    useEffect(() => {
        const fetchFromDistricts = async () => {
            if (orderData.fromRegion) {
                try {
                    const res = await api.get(`/regions/${orderData.fromRegion}`)
                    setFromDistrictDatas(res.data?.taxoparks || [])
                } catch (err: any) {
                    toast.error("Tumanlarni yuklashda xatolik")
                }
            } else {
                setFromDistrictDatas([])
            }
        }
        fetchFromDistricts()
    }, [orderData.fromRegion])

    // To region tanlanganda uning taxoparklarini yuklash
    useEffect(() => {
        const fetchToDistricts = async () => {
            if (orderData.toRegion) {
                try {
                    const res = await api.get(`/regions/${orderData.toRegion}`)
                    setToDistrictDatas(res.data?.taxoparks || [])
                } catch (err: any) {
                    toast.error("Tumanlarni yuklashda xatolik")
                }
            } else {
                setToDistrictDatas([])
            }
        }
        fetchToDistricts()
    }, [orderData.toRegion])

    // From va To taxopark tanlanganda route ma'lumotlarini yuklash
    useEffect(() => {
        const fetchRouteData = async () => {
            if (orderData.fromDistrict && orderData.toDistrict) {
                try {
                    setLoading(true)
                    const res = await api.get(`/routes/check/${orderData.fromDistrict}/${orderData.toDistrict}`)
                    setRoutesData(res.data)
                } catch (error: any) {
                    toast.error("Marshrut ma'lumotlarini yuklashda xatolik")
                    setRoutesData(null)
                } finally {
                    setLoading(false)
                }
            } else {
                setRoutesData(null)
            }
        }
        fetchRouteData()
    }, [orderData.fromDistrict, orderData.toDistrict])

    // Chegirmalarni yuklash
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const res = await api.get('/client/my_discounts')
                setDiscountDatas(res.data)
            } catch (err: any) {
                console.log("Chegirmalarni yuklashda xatolik:", err)
            }
        }
        fetchDiscounts()
    }, [])

    const handleInputChange = (field: string, value: string | Date | undefined) => {
        setOrderData(prev => ({
            ...prev,
            [field]: field === "date" && value instanceof Date
                ? format(value, "yyyy-MM-dd")
                : value
        }))
    }

    // Narxlarni hisoblash
    const calculatePrice = () => {
        if (!routesData) {
            return {
                basePrice: 0,
                discountAmount: 0,
                finalPrice: 0,
                prepayment: 0,
                totalPrice: 0
            }
        }

        const passengers = parseFloat(orderData.passengers)
        const basePrice = routesData.price_in || 0
        const depositPerPerson = routesData.deposit_client || 0

        // Umumiy narx (yo'lovchilar soni * asosiy narx)
        const totalPrice = basePrice * passengers

        // Chegirma miqdori
        const discountAmount = selectedDiscount 
            ? (totalPrice * selectedDiscount.value / 100) 
            : 0

        // Yakuniy narx (chegirma qo'llangandan keyin)
        const finalPrice = totalPrice - discountAmount

        // Oldindan to'lov (yo'lovchilar soni * har bir yo'lovchi uchun depozit)
        const prepayment = depositPerPerson * passengers

        return {
            basePrice,
            discountAmount,
            finalPrice,
            prepayment,
            totalPrice
        }
    }

    const handleDiscountSelect = (discount: any) => {
        setSelectedDiscount(discount)
        setShowDiscountModal(false)
    }

    const handleOrderSubmit = async () => {
        try {
            // Validatsiya
            if (!orderData.fromRegion || !orderData.fromDistrict || 
                !orderData.toRegion || !orderData.toDistrict || 
                !orderData.date || !orderData.time || !orderData.phone) {
                toast.error("Barcha majburiy maydonlarni to'ldiring!")
                return
            }

            if (!routesData) {
                toast.error("Marshrut ma'lumotlari topilmadi!")
                return
            }

            const priceInfo = calculatePrice()

            // Buyurtma ma'lumotlarini tayyorlash
            const orderPayload = {
                ...orderData,
                route_id: routesData.id,
                client_deposit: priceInfo.prepayment,
                discount_id: selectedDiscount?.id || null
            }

            setLoading(true)
            const res = await api.post('/client/orders', orderPayload)
            
            if (res && res.data) {
                toast.success("Buyurtma muvaffaqiyatli yaratildi!")
                navigate('/orders')
            } else {
                toast.error("Buyurtma yaratishda xatolik!")
            }
        } catch (err: any) {
            console.error(err)
            // Backend'dan kelgan xatolik xabarini ko'rsatish
            const errorMessage = err?.response?.data?.data || err?.response?.data?.message || "Xatolik yuz berdi!"
            
            // Maxsus xatolik xabarlari
            if (errorMessage.includes("Balance is insufficient")) {
                toast.error("Balansingizda yetarli mablag' mavjud emas!")
            } else {
                toast.error(errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    const priceInfo = calculatePrice()

    return (
        <div className="space-y-6 p-4 max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Buyurtma berish</h1>
                <p className="text-muted-foreground">Shaharlaro safar uchun buyurtma yarating</p>
            </div>

            {/* Marshrutni tanlang */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5"/>
                        Marshrutni tanlang
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Qayerdan */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium">Qayerdan</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Viloyat</Label>
                                <Select 
                                    value={orderData.fromRegion}
                                    onValueChange={(value) => {
                                        handleInputChange('fromRegion', value)
                                        setOrderData(prev => ({...prev, fromDistrict: ''}))
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Viloyatni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regionDatas.map((region: any) => (
                                            <SelectItem key={region.id} value={region.id.toString()}>
                                                {region.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Tuman/Shahar</Label>
                                <Select 
                                    value={orderData.fromDistrict}
                                    onValueChange={(value) => handleInputChange('fromDistrict', value)}
                                    disabled={!orderData.fromRegion}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tumanni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fromDistrictDatas.map((district: any) => (
                                            <SelectItem key={district.id} value={district.id.toString()}>
                                                {district.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Qayerga */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium">Qayerga</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Viloyat</Label>
                                <Select 
                                    value={orderData.toRegion}
                                    onValueChange={(value) => {
                                        handleInputChange('toRegion', value)
                                        setOrderData(prev => ({...prev, toDistrict: ''}))
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Viloyatni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regionDatas.map((region: any) => (
                                            <SelectItem key={region.id} value={region.id.toString()}>
                                                {region.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Tuman/Shahar</Label>
                                <Select 
                                    value={orderData.toDistrict}
                                    onValueChange={(value) => handleInputChange('toDistrict', value)}
                                    disabled={!orderData.toRegion}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tumanni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {toDistrictDatas.map((district: any) => (
                                            <SelectItem key={district.id} value={district.id.toString()}>
                                                {district.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Sana va yo'lovchilar */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5"/>
                        Sana va yo'lovchilar
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label className="text-base font-medium">Sana tanlang</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !orderData.date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {orderData.date ? format(new Date(orderData.date), "yyyy-MM-dd") : "Sanani tanlang"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={orderData.date ? new Date(orderData.date) : undefined}
                                onSelect={(date) => handleInputChange('date', date)}
                                disabled={(date) => date < new Date()}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Yo'lovchilar soni</Label>
                            <Select 
                                value={orderData.passengers}
                                onValueChange={(value) => handleInputChange('passengers', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 kishi</SelectItem>
                                    <SelectItem value="2">2 kishi</SelectItem>
                                    <SelectItem value="3">3 kishi</SelectItem>
                                    <SelectItem value="4">4 kishi</SelectItem>
                                    <SelectItem value="0.25">Pochta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Vaqt</Label>
                            <Input
                                type="time"
                                value={orderData.time}
                                onChange={(e) => handleInputChange('time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Telefon raqam *</Label>
                        <Input
                            type="tel"
                            placeholder="+998 90 123 45 67"
                            value={orderData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Qo'shimcha telefon (ixtiyoriy)</Label>
                        <Input
                            type="tel"
                            placeholder="+998 90 123 45 67"
                            value={orderData.optional_phone}
                            onChange={(e) => handleInputChange('optional_phone', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Qo'shimcha ma'lumot</Label>
                        <Textarea
                            placeholder="Qo'shimcha izohlar..."
                            value={orderData.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Chegirmadan foydalanish */}
            {discountDatas.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Percent className="h-5 w-5"/>
                            Chegirmadan foydalanish
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedDiscount ? (
                            <div className="border border-primary/20 bg-primary/5 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Percent className="h-5 w-5 text-primary"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">{selectedDiscount.title}</p>
                                            <p className="text-sm text-muted-foreground">-{selectedDiscount.value}%</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedDiscount(null)}
                                    >
                                        Bekor qilish
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                className="w-full gap-2"
                                onClick={() => setShowDiscountModal(true)}
                            >
                                <Percent className="h-4 w-4"/>
                                Chegirma tanlash
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Narx hisoblash */}
            {routesData && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5"/>
                            Narx ma'lumotlari
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Qayerdan:</span>
                                <span className="font-medium">{routesData.from?.name || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Qayerga:</span>
                                <span className="font-medium">{routesData.to?.name || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Masofa:</span>
                                <span className="font-medium">
                                    {routesData.distance_km ? `${routesData.distance_km} km` : "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Bir kishi narxi:</span>
                                <span className="font-medium">{formatCurrency(priceInfo.basePrice)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Yo'lovchilar soni:</span>
                                <span className="font-medium">
                                    {orderData.passengers === '0.25' ? 'Pochta' : `${orderData.passengers} kishi`}
                                </span>
                            </div>

                            {selectedDiscount && (
                                <div className="flex justify-between items-center text-green-600">
                                    <span>Chegirma (-{selectedDiscount.value}%):</span>
                                    <span className="font-medium">-{formatCurrency(priceInfo.discountAmount)}</span>
                                </div>
                            )}

                            <div className="border-t pt-3 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Umumiy narx:</span>
                                    <span className="font-semibold text-lg">
                                        {formatCurrency(priceInfo.finalPrice)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary font-medium">Oldindan to'lov:</span>
                                    <span className="font-bold text-primary text-xl">
                                        {formatCurrency(priceInfo.prepayment)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Button 
                onClick={handleOrderSubmit} 
                className="w-full" 
                size="lg"
                disabled={loading || !routesData}
            >
                {loading ? "Yuklanmoqda..." : "Buyurtma berish"}
            </Button>

            {/* Discount Selection Modal */}
            <Dialog open={showDiscountModal} onOpenChange={setShowDiscountModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Percent className="h-5 w-5"/>
                            Chegirmalaringiz
                        </DialogTitle>
                        <DialogDescription>
                            Mavjud chegirmalardan birini tanlang
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        {discountDatas.length > 0 ? (
                            discountDatas.map((discount: any) => (
                                <Card
                                    key={discount.id}
                                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                                    onClick={() => handleDiscountSelect(discount)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <Percent className="h-4 w-4 text-primary"/>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{discount.title}</p>
                                                    <p className="text-xs text-muted-foreground">{discount.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-primary font-bold">
                                                -{discount.percentage}%
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-6">
                                <Percent className="h-12 w-12 text-muted-foreground mx-auto mb-3"/>
                                <p className="text-muted-foreground">Hozircha chegirmalaringiz yo'q</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OrderPage