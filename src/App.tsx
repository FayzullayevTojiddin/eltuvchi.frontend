import {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import {ThemeProvider} from './components/theme-provider'
import {SiteHeader} from './components/layout/site-header'
import {SidebarProvider} from './components/ui/sidebar'
import {AppSidebar} from './components/layout/app-sidebar'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import HelpPage from './pages/HelpPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './pages/Dashboard'
import {BottomNavigation} from './components/layout/bottom-navigation'
import {ScrollToTop} from './components/utils/scroll-to-top'
import MarketPage from './pages/MarketPage'
import ReferralPage from './pages/ReferralPage'
import BalancePage from './pages/BalancePage'
import DiscountsPage from './pages/DiscountsPage'
import TaxiDashboard from './pages/TaxiDashboard'
import {TaxiBottomNavigation} from './components/layout/taxi-bottom-navigation'
import TaxiOrdersPage from './pages/TaxiOrdersPage'
import TaxiEarningsPage from './pages/TaxiEarningsPage'
import TaxiMarketPage from './pages/TaxiMarketPage'
import OrderPage from './pages/OrderPage'
import OrdersPage from './pages/OrdersPage'
import {Toaster} from "react-hot-toast";
import InactivePage from './pages/InActivePage'
import RequireRole from './components/RequireRole'
import BlockedPage from './pages/BlockedPage'
import { BASE_URL } from '../env'

function AppContent() {
    const location = useLocation()

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const userRole = localStorage.getItem('userRole')

    useEffect(() => {
        if (import.meta.env.DEV) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/eruda';
            document.body.appendChild(script);
            
            script.onload = () => {
            (window as any).eruda.init();
            };
        }
        }, []);

    useEffect(() => {
        if (!localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', 'client')
        }

        const authenticateUser = async () => {
            try {
                const tg = window.Telegram?.WebApp

                if (!tg) {
                    console.error('Telegram WebApp topilmadi')
                    setIsLoading(false)
                    return
                }

                (tg as any).ready()
                (tg as any).expand()

                const initData = (tg as any).initData

                if (!initData) {
                    console.error('InitData topilmadi')
                    setIsLoading(false)
                    return
                }

                const response = await fetch(`${BASE_URL}/api/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        initData: initData,
                    })
                })

                const data = await response.json()

                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.user.id)
                localStorage.setItem('userRole', data.user.role || 'client')

                setIsAuthenticated(true)

            } catch (error) {
                console.error('Auth xatolik:', error)
                if (!localStorage.getItem('userRole')) {
                    localStorage.setItem('userRole', 'client')
                }
                setIsAuthenticated(true)
            } finally {
                setIsLoading(false)
            }
        }

        authenticateUser();
    }, [])

    const isInactivePage = location.pathname === '/inactive'

    return (
        <SidebarProvider>

            <div className="min-h-screen flex w-full">
                <AppSidebar/>

                <div className="flex-1 flex flex-col">
                    <SiteHeader/>

                    <main className="flex-1 p-6 pb-20 md:pb-6">
                        <ScrollToTop/>

                            <Routes>
                                <Route path="/" element={
                                    <RequireRole allowed={['client']}>
                                        <Dashboard/>
                                    </RequireRole>
                                }/>

                                <Route path="/profile" element={
                                    <RequireRole allowed={['client']}>
                                        <ProfilePage/>
                                    </RequireRole>
                                }/>

                                <Route path="/market" element={
                                    <RequireRole allowed={['client']}>
                                        <MarketPage/>
                                    </RequireRole>
                                }/>

                                <Route path="/order" element={
                                    <RequireRole allowed={['client']}>
                                        <OrderPage/>
                                    </RequireRole>
                                }/>

                                <Route path="/orders" element={
                                    <RequireRole allowed={['client']}>
                                        <OrdersPage/>
                                    </RequireRole>
                                }/>

                                <Route path="/discounts" element={
                                    <RequireRole allowed={['client']}>
                                        <DiscountsPage/>
                                    </RequireRole>
                                }/>

                                <Route path="/taxi" element={
                                    <RequireRole allowed={['driver']}>
                                        <TaxiDashboard/>
                                    </RequireRole>
                                }/>

                                <Route path="/taxi/orders" element={
                                    <RequireRole allowed={['driver']}>
                                        <TaxiOrdersPage/>
                                    </RequireRole>
                                }/>

                                <Route path="/taxi/earnings" element={
                                    <RequireRole allowed={['driver']}>
                                        <TaxiEarningsPage/>
                                    </RequireRole>
                                }/>

                                <Route path="/taxi/market" element={
                                    <RequireRole allowed={['driver']}>
                                        <TaxiMarketPage/>
                                    </RequireRole>
                                }/>

                                {[
                                    '/about',
                                    '/contact',
                                    '/help',
                                    '/terms',
                                    '/referral',
                                    '/balance',
                                ].map(path => (
                                    <Route key={path} path={path} element={
                                        <RequireRole allowed={['client','driver']}>
                                            {path === '/about' && <AboutPage/>}
                                            {path === '/contact' && <ContactPage/>}
                                            {path === '/help' && <HelpPage/>}
                                            {path === '/terms' && <TermsPage/>}
                                            {path === '/referral' && <ReferralPage/>}
                                            {path === '/balance' && <BalancePage/>}
                                        </RequireRole>
                                    }/>
                                ))}

                                <Route path="/inactive" element={<InactivePage/>}/>

                                <Route path="/blocked" element={<BlockedPage/>}/>

                                <Route path="*" element={<NotFoundPage/>}/>

                            </Routes>

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                    </main>

                </div>
            </div>

            {!isInactivePage && userRole === 'client' && <BottomNavigation/>}
            {!isInactivePage && (userRole === 'driver') && <TaxiBottomNavigation/>}
        </SidebarProvider>
    )
}

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Router>
                <AppContent/>
            </Router>
        </ThemeProvider>
    )
}

export default App