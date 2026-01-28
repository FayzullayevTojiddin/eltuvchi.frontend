
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  LayoutDashboard,
  Users,
  Car,
  ShoppingBag,
  CreditCard,
  MessageCircle,
  Settings,
  HelpCircle,
  User,
  Gift,
  Percent,
  Award,
  BarChart3,
  UserCheck,
  Store,
  LogOut,
  Building2,
  Wallet,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || 'client'
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogoutConfirm = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userName')
    localStorage.removeItem('userRegion')
    localStorage.removeItem('userData')
    toast.success('Muvaffaqiyatli chiqib ketdingiz')
    navigate('/login')
    setShowLogoutDialog(false)
  }

  const getNavigationItems = () => {
    if (userRole === 'driver') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/taxi' },
        { icon: ShoppingBag, label: 'Buyurtmalar', href: '/taxi/orders' },
        { icon: Wallet, label: 'Daromad', href: '/taxi/earnings' },
        { icon: Store, label: 'Market', href: '/taxi/market' },
        { icon: User, label: 'Profil', href: '/profile' },
      ]
    }

    return [
      { icon: LayoutDashboard, label: 'Bosh sahifa', href: '/' },
      { icon: ShoppingBag, label: 'Buyurtma berish', href: '/order' },
      { icon: Car, label: 'Buyurtmalarim', href: '/orders' },
      { icon: CreditCard, label: 'Balans', href: '/balance' },
      { icon: Percent, label: 'Chegirmalar', href: '/discounts' },
      { icon: Gift, label: 'Referal', href: '/referral' },
      { icon: Store, label: 'Market', href: '/market' },
      { icon: User, label: 'Profil', href: '/profile' },
    ]
  }

  const getSidebarTitle = () => {
    return userRole === 'driver' ? 'Haydovchi Panel' : "O'rgimchak"
  }

  const navigationItems = getNavigationItems()

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">
            {getSidebarTitle()}
          </h2>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarMenu className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link to={item.href} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-4 w-4" />
            <span>Chiqish</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tizimdan chiqish</AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham tizimdan chiqmoqchimisiz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm}>
              Chiqish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
