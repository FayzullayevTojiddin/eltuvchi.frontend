
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Home } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Sahifa topilmadi</h2>
        <p className="text-muted-foreground mb-8">
          Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Bosh sahifaga qaytish
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
