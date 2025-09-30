
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Ro'yxatdan o'tish</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">To'liq ism</label>
            <Input placeholder="Ismingizni kiriting" />
          </div>
          <div>
            <label className="text-sm font-medium">Telefon raqam</label>
            <Input placeholder="+998 90 123 45 67" />
          </div>
          <Button className="w-full">Ro'yxatdan o'tish</Button>
          <div className="text-center text-sm">
            Hisobingiz bormi?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Kirish
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage
