import { Home, MapPin, Car, CreditCard, MoreHorizontal, ShoppingBag, Share2, User, HelpCircle, Info, FileText, Percent } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function BottomNavigation() {
  const location = useLocation()
  const currentPath = location.pathname
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const userRole = localStorage.getItem('userRole') || 'client'

  const mainNavItems = [
    { title: "Bosh sahifa", url: "/dashboard", icon: Home },
    { title: "Buyurtma", url: "/order", icon: MapPin },
    { title: "Buyurtmalar", url: "/orders", icon: Car },
    { title: "Balans", url: "/balance", icon: CreditCard },
  ]

  const moreItems = [
    { title: "Market", url: "/market", icon: ShoppingBag },
    { title: "Chegirmalar", url: "/discounts", icon: Percent },
    { title: "Referal", url: "/referral", icon: Share2 },
    { title: "Profil", url: "/profile", icon: User },
    { title: "Yordam", url: "/help", icon: HelpCircle },
    { title: "Biz haqimizda", url: "/about", icon: Info },
    { title: "Shartlar", url: "/terms", icon: FileText },
  ]

  const isActive = (path: string) => currentPath === path

  const getNavClassName = (path: string) =>
    `flex flex-col items-center gap-1 p-2 transition-colors ${
      isActive(path) 
        ? "text-primary" 
        : "text-muted-foreground hover:text-foreground"
    }`

  // Only show for client role
  if (userRole !== 'client') {
    return null
  }

  return (
    <>
      {/* Bottom Navigation Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t md:hidden">
        <div className="flex h-16">
          {/* Main Navigation Items */}
          {mainNavItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex-1 ${getNavClassName(item.url)}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">{item.title}</span>
            </NavLink>
          ))}

          {/* More Menu Button */}
          <Sheet open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 flex flex-col items-center gap-1 h-full rounded-none text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal className="h-5 w-5" />
                <span className="text-xs font-medium">Ko'proq</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px] rounded-t-2xl">
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-6 text-center">Ko'proq menyular</h3>
                <div className="grid grid-cols-2 gap-4">
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.url}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                        isActive(item.url)
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}