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
    DialogTrigger,
} from '@/components/ui/dialog'
import {MapPin, Clock, Car, CreditCard, MessageSquare, CalendarIcon, Phone, Percent, CheckCircle} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import {cn} from '@/lib/utils'
import api from "@/lib/api.ts";
import {formatCurrency} from "@/utils/numberFormat.ts";
import {Toaster, toast} from "react-hot-toast";

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
        client_deposit: undefined,
        route_id: undefined,
    })
    const [selectedDiscount, setSelectedDiscount] = useState<any>(null)
    const [showDiscountModal, setShowDiscountModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [regionDatas, setRegionDatas] = useState([])
    const [formDistrictDatas, setFromDistrictDatas] = useState([])
    const [toDistrictDatas, setToDistrictDatas] = useState([])
    const [routesData, setRoutesData] = useState(null)
    const [discountDatas, setDiscountDatas] = useState([])

    useEffect(() => {
        if (orderData?.fromRegion && orderData?.fromDistrict && orderData?.toRegion && orderData?.toDistrict) {
            try {
                api.get(`/routes/check/${orderData?.fromDistrict}/${orderData?.toDistrict}`).then(res => {
                    console.log(res.data)
                    setRoutesData(res.data)
                }).catch(error => {
                    console.log(error)
                    toast.error("Xatolik yuz berdi!")
                    window.location.reload()
                })
            } catch (e) {
                console.log(e)
                toast.error(e)
                window.location.reload()
            }
        }
    }, [orderData]);


    useEffect(() => {
        try {
            api.get('/client/my_discounts').then((res) => {
                console.log('discount', res.data)
                setDiscountDatas(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi!")
                window.location.reload()
            })
        } catch (e) {
            console.log(e)
            toast.error(e)
        }
    }, []);

    // get regions data from API
    useEffect(() => {
        api.get('/regions/').then(response => {
            console.log(response?.data)
            setRegionDatas(response?.data)
        }).catch(error => {
            toast.error(error.message)
        })
    }, []);

    // get districts data from API by region
    useEffect(() => {
        if (orderData?.fromRegion) {
            api.get(`/regions/${orderData?.fromRegion}`).then((res) => {
                console.log(res.data?.taxoparks)
                setFromDistrictDatas(res.data?.taxoparks)
            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
        }

        if (orderData?.toRegion) {
            api.get(`/regions/${orderData?.toRegion}`).then((res) => {
                console.log(res.data?.taxoparks)
                setToDistrictDatas(res.data?.taxoparks)
            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
        }
    }, [orderData]);

    // Mock payment cards
    const paymentCards = [
        {
            id: "1",
            number: "**** **** **** 1234",
            type: "Visa",
            bank: "Ipoteka Bank"
        },
        {
            id: "2",
            number: "**** **** **** 5678",
            type: "UzCard",
            bank: "NBU"
        },
        {
            id: "3",
            number: "**** **** **** 9012",
            type: "Humo",
            bank: "Agrobank"
        }
    ]

    const [selectedCard, setSelectedCard] = useState<any>(null)


    const handleInputChange = (field: string, value: string | Date | undefined) => {
        setOrderData(prev => ({
            ...prev,
            [field]: field === "date" && value instanceof Date
                ? format(value, "yyyy-MM-dd")
                : value
        }))
    }

    const calculatePrice = () => {
        const basePrice = 50000
        const discountAmount = selectedDiscount ? (basePrice * selectedDiscount.percentage / 100) : 0
        const finalPrice = basePrice - discountAmount
        const prepayment = finalPrice * 0.3 // 30% oldindan to'lov

        return {
            basePrice,
            discountAmount,
            finalPrice,
            prepayment
        }
    }

    const handleDiscountSelect = (discount: any) => {
        setSelectedDiscount(discount)
        setShowDiscountModal(false)
    }

    const handleOrderSubmit = () => {
        try {
            if (!orderData.fromRegion || !orderData.fromDistrict || !orderData.toRegion || !orderData.toDistrict || !orderData.date || !orderData.time || !orderData.phone) {
                toast.error("Barcha maydonlar to'ldirilishi shart!")
                return
            }
            orderData.route_id = routesData?.id
            orderData.client_deposit = 0
            api.post('/client/orders', orderData).then((res) => {
                if (res && res?.success) {
                    toast.success("Buyurtma yaratildi!")
                    navigate('/orders')
                } else {
                    toast.error("Xatolik yuz berdi!")
                }
            }).catch((err) => {
                console.log(err)
                toast.error("Xatolik yuz berdi!")
            })
            console.log(orderData)
            // setShowPaymentModal(true)
        } catch (e) {
            console.log(e)
            toast.error(e)
            window.location.reload()
        }
    }

    const handlePaymentConfirm = () => {
        if (!selectedCard) {
            toast.error('Karta tanlang!')
            return
        }
        toast.success('Buyurtma muvaffaqiyatli berildi!')
        navigate('/orders')
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
                                <Select value={orderData.fromRegion}
                                        onValueChange={(value) => handleInputChange('fromRegion', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Viloyatni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regionDatas.map((region) => (
                                            <SelectItem key={region?.id} value={region?.id}>
                                                {region?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Tuman/Shahar</Label>
                                <Select value={orderData.fromDistrict}
                                        onValueChange={(value) => handleInputChange('fromDistrict', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tumanni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formDistrictDatas.map((district) => (
                                            <SelectItem key={district?.id} value={district?.id}>
                                                {district?.name}
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
                                <Select value={orderData.toRegion}
                                        onValueChange={(value) => handleInputChange('toRegion', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Viloyatni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regionDatas.map((region) => (
                                            <SelectItem key={region?.id} value={region?.id}>
                                                {region?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Tuman/Shahar</Label>
                                <Select value={orderData.toDistrict}
                                        onValueChange={(value) => handleInputChange('toDistrict', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tumanni tanlang"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {toDistrictDatas.map((district) => (
                                            <SelectItem key={district?.id} value={district?.id}>
                                                {district?.name}
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
                                {orderData.date ? format(orderData.date, "yyyy-MM-dd") : "Sanani tanlang"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={orderData.date}
                                onSelect={(date) => handleInputChange('date', date)}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="pointer-events-auto"
                            />
                        </PopoverContent>
                    </Popover>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Yo'lovchilar soni</Label>
                            <Select value={orderData.passengers}
                                    onValueChange={(value) => handleInputChange('passengers', value)}>
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 kishi</SelectItem>
                                    <SelectItem value="2">2 kishi</SelectItem>
                                    <SelectItem value="3">3 kishi</SelectItem>
                                    <SelectItem value="4">4 kishi</SelectItem>
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
                                    <div
                                        className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Percent className="h-5 w-5 text-primary"/>
                                    </div>
                                    <div>
                                        <p className="font-medium">{selectedDiscount.title}</p>
                                        <p className="text-sm text-muted-foreground">{selectedDiscount.description}</p>
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

            {/* Narx hisoblash */}
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
                            <span className="text-muted-foreground">Asosiy narx:</span>
                            <span className="font-medium">
                                {routesData?.price_in
                                    ? formatCurrency(routesData.price_in)
                                    : "-"}
                            </span>
                        </div>

                        {selectedDiscount && (
                            <div className="flex justify-between items-center text-green-600">
                                <span>Chegirma (-{selectedDiscount.percentage}%):</span>
                                <span className="font-medium">-{priceInfo.discountAmount.toLocaleString()} so'm</span>
                            </div>
                        )}

                        <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Jami narx:</span>
                                <span
                                    className="font-semibold text-lg">
                                    {routesData?.price_in
                                        ? formatCurrency(routesData.price_in)
                                        : "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Qayerdan:</span>
                                <span
                                    className="font-semibold text-lg">{routesData?.from.name || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Qayerga:</span>
                                <span
                                    className="font-semibold text-lg">{routesData?.to.name || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Jami masofa:</span>
                                <span
                                    className="font-semibold text-lg">
                                     {routesData?.distance_km
                                         ? formatCurrency(routesData.distance_km, 'km')
                                         : "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-primary font-medium">Hozir to'lash kerak:</span>
                                <span className="font-bold text-primary text-xl">
                                  {routesData?.deposit_client
                                      ? formatCurrency(routesData.deposit_client)
                                      : "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={handleOrderSubmit} className="w-full" size="lg">
                Buyurtma berish
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
                            discountDatas.map((discount) => (
                                <Card
                                    key={discount.id}
                                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                                    onClick={() => handleDiscountSelect(discount?.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
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

            {/* Payment Card Selection Modal */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5"/>
                            To'lov kartasini tanlang
                        </DialogTitle>
                        <DialogDescription>
                            Ulangan kartalardan birini tanlang
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        {paymentCards.map((card) => (
                            <Card
                                key={card.id}
                                className={cn(
                                    "cursor-pointer transition-colors",
                                    selectedCard?.id === card.id
                                        ? "border-primary bg-primary/5"
                                        : "hover:bg-accent/50"
                                )}
                                onClick={() => setSelectedCard(card)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                                <CreditCard className="h-5 w-5 text-primary"/>
                                            </div>
                                            <div>
                                                <p className="font-medium">{card.number}</p>
                                                <p className="text-sm text-muted-foreground">{card.bank} • {card.type}</p>
                                            </div>
                                        </div>
                                        {selectedCard?.id === card.id && (
                                            <CheckCircle className="h-5 w-5 text-primary"/>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-medium">To'lanadigan summa:</span>
                            <span className="font-bold text-primary text-lg">
                {priceInfo.prepayment.toLocaleString()} so'm
              </span>
                        </div>
                        <Button
                            onClick={handlePaymentConfirm}
                            className="w-full"
                            size="lg"
                            disabled={!selectedCard}
                        >
                            To'lovni tasdiqlash
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OrderPage
