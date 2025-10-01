import { LayoutDashboard, ShoppingBag, Wallet, Store } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

export function TaxiBottomNavigation() {
  const location = useLocation()
  const currentPath = location.pathname
  const userRole = localStorage.getItem('userRole') || 'client'

  // Sidebar dan olingan navigation items
  const navItems = [
    { title: "Dashboard", url: "/taxi", icon: LayoutDashboard },
    { title: "Buyurtmalar", url: "/taxi/orders", icon: ShoppingBag },
    { title: "Daromad", url: "/taxi/earnings", icon: Wallet },
    { title: "Market", url: "/taxi/market", icon: Store },
  ]

  const isActive = (path: string) => currentPath === path

  const getNavClassName = (path: string) =>
    `flex flex-col items-center gap-1 p-2 transition-colors ${
      isActive(path) 
        ? "text-primary" 
        : "text-muted-foreground hover:text-foreground"
    }`

  // Only show for taxi/driver role
  if (userRole !== 'taxi' && userRole !== 'driver') {
    return null
  }

  return (
    <>
      {/* Bottom Navigation Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t md:hidden">
        <div className="flex h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex-1 ${getNavClassName(item.url)}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}