
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLocation, useNavigate } from "react-router-dom"
import { 
  Home, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Award,
  User,
  HelpCircle,
  Info,
  FileText,
  MoreHorizontal
} from "lucide-react"

export const AdminBottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole')
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  if (userRole !== 'admin') return null

  const mainNavItems = [
    { icon: Home, label: "Bosh sahifa", path: "/" },
    { icon: Users, label: "Foydalanuvchilar", path: "/admin/users" },
    { icon: ShoppingBag, label: "Buyurtmalar", path: "/admin/orders" },
    { icon: MoreHorizontal, label: "Ko'proq", path: "/more" }
  ]

  const moreNavItems = [
    { icon: CreditCard, label: "To'lovlar", path: "/admin/payments" },
    { icon: Award, label: "Mukofotlar", path: "/admin/awards" },
    { icon: ShoppingBag, label: "Market", path: "/admin/market" },
    { icon: HelpCircle, label: "Yordam", path: "/help" },
    { icon: Info, label: "Biz haqimizda", path: "/about" },
    { icon: FileText, label: "Shartlar", path: "/terms" }
  ]

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const handleNavClick = (path: string) => {
    if (path === "/more") {
      setMoreMenuOpen(true)
      return
    }
    navigate(path)
  }

  const handleMoreItemClick = (path: string) => {
    navigate(path)
    setMoreMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {mainNavItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive(item.path) 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground"
              }`}
              onClick={() => handleNavClick(item.path)}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* More Menu Sheet */}
      <Sheet open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
        <SheetContent side="bottom" className="h-auto">
          <div className="grid grid-cols-2 gap-4 py-4">
            {moreNavItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`flex items-center gap-3 h-12 justify-start ${
                  isActive(item.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground"
                }`}
                onClick={() => handleMoreItemClick(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminBottomNavigation
