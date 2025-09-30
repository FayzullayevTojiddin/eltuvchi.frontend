import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Download, FileText, BarChart3, Users, DollarSign } from "lucide-react"

const ExportReports = () => {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [format, setFormat] = useState("excel")
  const [includeDetails, setIncludeDetails] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const reportTypes = [
    { value: "orders", label: "Buyurtmalar hisoboti", icon: FileText },
    { value: "users", label: "Foydalanuvchilar hisoboti", icon: Users },
    { value: "payments", label: "To'lovlar hisoboti", icon: DollarSign },
    { value: "analytics", label: "Analitika hisoboti", icon: BarChart3 }
  ]

  const handleExport = async () => {
    if (!reportType || !dateFrom || !dateTo) {
      toast({
        title: "Xato",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive"
      })
      return
    }

    setIsExporting(true)

    // Simulate export process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a mock CSV/Excel content
      const selectedReport = reportTypes.find(r => r.value === reportType)
      const content = generateMockReportContent(reportType, dateFrom, dateTo)
      
      // Create and download file
      const blob = new Blob([content], { 
        type: format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv' 
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportType}_hisobot_${dateFrom}_${dateTo}.${format === 'excel' ? 'xlsx' : 'csv'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Muvaffaqiyat!",
        description: `${selectedReport?.label} yuklab olindi`,
      })
    } catch (error) {
      toast({
        title: "Xato",
        description: "Hisobotni yuklashda xatolik yuz berdi",
        variant: "destructive"
      })
    } finally {
      setIsExporting(false)
    }
  }

  const generateMockReportContent = (type: string, from: string, to: string) => {
    const headers: { [key: string]: string } = {
      orders: "ID,Mijoz,Qayerdan,Qayerga,Sana,Summa,Status",
      users: "ID,Ism,Telefon,Email,Rol,Qo'shilgan sana,Status",
      payments: "ID,Buyurtma ID,Mijoz,Summa,To'lov turi,Sana,Status",
      analytics: "Sana,Buyurtmalar,Daromad,Faol foydalanuvchilar,O'rtacha safar"
    }

    const sampleData: { [key: string]: string[] } = {
      orders: [
        "1,Akmal Karimov,Toshkent,Samarqand,2025-01-15,150000,Yakunlandi",
        "2,Bobur Alimov,Buxoro,Toshkent,2025-01-16,200000,Yakunlandi",
        "3,Sardor Umarov,Andijon,Farg'ona,2025-01-17,120000,Bekor qilingan"
      ],
      users: [
        "1,Akmal Karimov,+998901234567,akmal@example.com,client,2025-01-01,Faol",
        "2,Bobur Alimov,+998907654321,bobur@example.com,taxi,2025-01-02,Faol",
        "3,Sardor Umarov,+998905678901,sardor@example.com,client,2025-01-03,Faol"
      ],
      payments: [
        "1,1,Akmal Karimov,150000,Naqd,2025-01-15,To'landi",
        "2,2,Bobur Alimov,200000,Karta,2025-01-16,To'landi",
        "3,3,Sardor Umarov,120000,Naqd,2025-01-17,Qaytarildi"
      ],
      analytics: [
        "2025-01-15,45,6750000,234,150000",
        "2025-01-16,52,7800000,267,149000",
        "2025-01-17,38,5700000,198,150000"
      ]
    }

    return headers[type] + "\n" + sampleData[type].join("\n")
  }

  return (
    <Card className="bg-gradient-card border-0 shadow-card-custom">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Hisobotlarni eksport qilish
        </CardTitle>
        <CardDescription>
          Tizim ma'lumotlarini turli formatda yuklab oling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reportType">Hisobot turi</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Hisobot turini tanlang" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Fayl formati</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV (.csv)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Boshlanish sanasi</Label>
            <Input
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateTo">Tugash sanasi</Label>
            <Input
              id="dateTo"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeDetails"
            checked={includeDetails}
            onCheckedChange={(checked) => setIncludeDetails(checked === true)}
          />
          <Label htmlFor="includeDetails" className="text-sm">
            Batafsil ma'lumotlarni kiritish
          </Label>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting || !reportType || !dateFrom || !dateTo}
          className="w-full"
          variant="hero"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Eksport qilinmoqda...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Hisobotni yuklab olish
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ExportReports