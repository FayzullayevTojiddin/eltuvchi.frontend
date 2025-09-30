
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
    switch (userRole) {
      case 'super-admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', href: '/super-admin' },
          { icon: Users, label: 'Foydalanuvchilar', href: '/super-admin/users' },
          { icon: Car, label: 'Haydovchilar', href: '/super-admin/drivers' },
          { icon: Building2, label: 'Takso Parklar', href: '/super-admin/taxi-parks' },
          { icon: ShoppingBag, label: 'Buyurtmalar', href: '/super-admin/orders' },
          { icon: Store, label: 'Market', href: '/super-admin/market' },
        ]
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
          { icon: Users, label: 'Foydalanuvchilar', href: '/admin/users' },
          { icon: UserCheck, label: 'Dispatcherlar', href: '/admin/dispatchers' },
          { icon: Building2, label: 'Takso parklar', href: '/admin/taxi-parks' },
          { icon: ShoppingBag, label: 'Buyurtmalar', href: '/admin/orders' },
          { icon: CreditCard, label: "To'lovlar", href: '/admin/payments' },
          { icon: Store, label: 'Market', href: '/admin/market' },
        ]
      case 'dispatcher':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', href: '/dispatcher' },
          { icon: ShoppingBag, label: 'Buyurtmalar', href: '/dispatcher/orders' },
          { icon: Users, label: 'Foydalanuvchilar', href: '/dispatcher/users' },
        ]
      // case 'taxi':
      case 'driver':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', href: '/taxi' },
          { icon: ShoppingBag, label: 'Buyurtmalar', href: '/taxi/orders' },
          { icon: Wallet, label: 'Daromad', href: '/taxi/earnings' },
          { icon: Store, label: 'Market', href: '/taxi/market' },
          // { icon: User, label: 'Profil', href: '/profile' },
        ]
      case 'taxiParkOwner':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', href: '/taxi-park' },
          { icon: Car, label: 'Haydovchilar', href: '/taxi-park/drivers' },
          { icon: UserCheck, label: 'Dispatcherlar', href: '/taxi-park/dispatchers' },
          { icon: ShoppingBag, label: 'Buyurtmalar', href: '/taxi-park/orders' },
          { icon: DollarSign, label: 'Narxlar', href: '/taxi-park/pricing' },
          { icon: BarChart3, label: 'Analitika', href: '/taxi-park/analytics' },
        ]
      case 'taxi-park-owner':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', href: '/taxi-park-owner' },
          { icon: Car, label: 'Haydovchilar', href: '/taxi-park-owner/drivers' },
          { icon: UserCheck, label: 'Dispatcherlar', href: '/taxi-park-owner/dispatchers' },
          { icon: DollarSign, label: 'Narxlar', href: '/taxi-park-owner/prices' },
        ]
      default:
        return [
          { icon: LayoutDashboard, label: 'Bosh sahifa', href: '/home' },
          { icon: ShoppingBag, label: 'Buyurtma berish', href: '/order' },
          { icon: Car, label: 'Buyurtmalarim', href: '/orders' },
          { icon: CreditCard, label: 'Balans', href: '/balance' },
          { icon: Percent, label: 'Chegirmalar', href: '/discounts' },
          { icon: Gift, label: 'Referal', href: '/referral' },
          { icon: Store, label: 'Market', href: '/market' },
          { icon: User, label: 'Profil', href: '/profile' },
          // { icon: HelpCircle, label: 'Yordam', href: '/help' },
        ]
    }
  }

  const getSidebarTitle = () => {
      console.log('user role:', userRole)
    switch (userRole) {
      case 'super-admin': return 'SuperAdmin Panel'
      case 'admin': return 'Admin Panel'
      case 'dispatcher': return 'Dispatcher Panel'
      case 'driver': return 'Haydovchi Panel'
      case 'taxiParkOwner': return 'Takso Park Panel'
      case 'taxi-park-owner': return 'Takso Park Egasi Panel'
      default: return 'Eltuvchi'
    }
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
