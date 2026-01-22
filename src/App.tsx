import { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { SiteHeader } from './components/layout/site-header'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/layout/app-sidebar'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import HelpPage from './pages/HelpPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './pages/Dashboard'
import { BottomNavigation } from './components/layout/bottom-navigation'
import { ScrollToTop } from './components/utils/scroll-to-top'
import MarketPage from './pages/MarketPage'
import ReferralPage from './pages/ReferralPage'
import BalancePage from './pages/BalancePage'
import DiscountsPage from './pages/DiscountsPage'
import TaxiDashboard from './pages/TaxiDashboard'
import { TaxiBottomNavigation } from './components/layout/taxi-bottom-navigation'
import TaxiOrdersPage from './pages/TaxiOrdersPage'
import TaxiEarningsPage from './pages/TaxiEarningsPage'
import TaxiMarketPage from './pages/TaxiMarketPage'
import OrderPage from './pages/OrderPage'
import OrdersPage from './pages/OrdersPage'
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import InactivePage from './pages/InActivePage'
import RequireRole from './components/RequireRole'
import BlockedPage from './pages/BlockedPage'
import api from './lib/api'

function AppContent() {
    const location = useLocation()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const tg = window.Telegram?.WebApp

                let attempts = 0
                while (!window.Telegram?.WebApp && attempts < 20) {
                    await new Promise(resolve => setTimeout(resolve, 100))
                    attempts++
                }

                if (!tg) {
                    toast.error('Telegram WebApp topilmadi')
                    setIsLoading(false)
                    return
                }

                tg.ready()
                tg.expand()

                const initData = (tg as any).initData

                if (!initData) {
                    toast.error('Autentifikatsiya ma\'lumotlari topilmadi')
                    setIsLoading(false)
                    return
                }

                const data = await api.post('/auth', { initData })

                if (!data.token || !data.user) {
                    toast.error('Autentifikatsiya ma\'lumotlari noto\'g\'ri')
                    setIsLoading(false)
                    return
                }

                api.setToken(data.token)
                localStorage.setItem('user', data.user);
                localStorage.setItem('userId', data.user.id)
                localStorage.setItem('userRole', data.role || 'client')

                setUserRole(data.role || 'client')
                setIsAuthenticated(true)

            } catch (error) {
                toast.error('Autentifikatsiya jarayonida xatolik yuz berdi')
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }

        authenticateUser()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Yuklanmoqda...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Autentifikatsiya xatosi</h2>
                    <p className="text-muted-foreground mb-6">Iltimos, botni qayta ishga tushiring</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Qayta urinish
                    </button>
                </div>
            </div>
        )
    }

    const isInactivePage = location.pathname === '/inactive'
    const isBlockedPage = location.pathname === '/blocked'

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    <SiteHeader />

                    <main className="flex-1 p-6 pb-20 md:pb-6">
                        <ScrollToTop />

                        <Routes>
                            <Route path="/" element={
                                <RequireRole allowed={['client']}>
                                    <Dashboard />
                                </RequireRole>
                            } />

                            <Route path="/profile" element={
                                <RequireRole allowed={['client']}>
                                    <ProfilePage />
                                </RequireRole>
                            } />

                            <Route path="/market" element={
                                <RequireRole allowed={['client']}>
                                    <MarketPage />
                                </RequireRole>
                            } />

                            <Route path="/order" element={
                                <RequireRole allowed={['client']}>
                                    <OrderPage />
                                </RequireRole>
                            } />

                            <Route path="/orders" element={
                                <RequireRole allowed={['client']}>
                                    <OrdersPage />
                                </RequireRole>
                            } />

                            <Route path="/discounts" element={
                                <RequireRole allowed={['client']}>
                                    <DiscountsPage />
                                </RequireRole>
                            } />

                            <Route path="/taxi" element={
                                <RequireRole allowed={['driver']}>
                                    <TaxiDashboard />
                                </RequireRole>
                            } />

                            <Route path="/taxi/orders" element={
                                <RequireRole allowed={['driver']}>
                                    <TaxiOrdersPage />
                                </RequireRole>
                            } />

                            <Route path="/taxi/earnings" element={
                                <RequireRole allowed={['driver']}>
                                    <TaxiEarningsPage />
                                </RequireRole>
                            } />

                            <Route path="/taxi/market" element={
                                <RequireRole allowed={['driver']}>
                                    <TaxiMarketPage />
                                </RequireRole>
                            } />

                            <Route path="/about" element={
                                <RequireRole allowed={['client', 'driver']}>
                                    <AboutPage />
                                </RequireRole>
                            } />

                            <Route path="/contact" element={
                                <RequireRole allowed={['client', 'driver']}>
                                    <ContactPage />
                                </RequireRole>
                            } />

                            <Route path="/help" element={
                                <RequireRole allowed={['client', 'driver']}>
                                    <HelpPage />
                                </RequireRole>
                            } />

                            <Route path="/terms" element={
                                <RequireRole allowed={['client', 'driver']}>
                                    <TermsPage />
                                </RequireRole>
                            } />

                            <Route path="/referral" element={
                                <RequireRole allowed={['client', 'driver']}>
                                    <ReferralPage />
                                </RequireRole>
                            } />

                            <Route path="/balance" element={
                                <RequireRole allowed={['client', 'driver']}>
                                    <BalancePage />
                                </RequireRole>
                            } />

                            <Route path="/inactive" element={<InactivePage />} />
                            <Route path="/blocked" element={<BlockedPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#363636',
                                    color: '#fff',
                                },
                                success: {
                                    duration: 3000,
                                    iconTheme: {
                                        primary: '#4ade80',
                                        secondary: '#fff',
                                    },
                                },
                                error: {
                                    duration: 4000,
                                    iconTheme: {
                                        primary: '#ef4444',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />
                    </main>
                </div>
            </div>

            {!isInactivePage && !isBlockedPage && userRole === 'client' && <BottomNavigation />}
            {!isInactivePage && !isBlockedPage && userRole === 'driver' && <TaxiBottomNavigation />}
        </SidebarProvider>
    )
}

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    )
}

export default App