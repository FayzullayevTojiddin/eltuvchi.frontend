import {useEffect} from 'react'
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
import {AdminBottomNavigation} from './components/layout/admin-bottom-navigation'
import {DispatcherBottomNavigation} from './components/layout/dispatcher-bottom-navigation'
import {TaxiParkBottomNavigation} from './components/layout/taxi-park-bottom-navigation'
import OrderPage from './pages/OrderPage'
import OrdersPage from './pages/OrdersPage'
import {Toaster} from "react-hot-toast";

function AppContent() {
    const location = useLocation()
    const userRole = localStorage.getItem('userRole') || 'client'

    useEffect(() => {
        if (!localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', 'client')
        }
    }, [])

    const isLoginPage = location.pathname === '/login' || location.pathname === '/'
    const isRegisterPage = location.pathname === '/register'

    return (
        <SidebarProvider>

            <div className="min-h-screen flex w-full">
                {!isLoginPage && !isRegisterPage && <AppSidebar/>}

                <div className="flex-1 flex flex-col">
                    {!isLoginPage && !isRegisterPage && <SiteHeader/>}

                    <main className="flex-1 p-6 pb-20 md:pb-6">
                        <ScrollToTop/>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/home" element={<Dashboard/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="/help" element={<HelpPage/>}/>
                            <Route path="/terms" element={<TermsPage/>}/>
                            <Route path="/market" element={<MarketPage/>}/>
                            <Route path="/referral" element={<ReferralPage/>}/>
                            <Route path="/balance" element={<BalancePage/>}/>
                            <Route path="/discounts" element={<DiscountsPage/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/order" element={<OrderPage/>}/>
                            <Route path="/orders" element={<OrdersPage/>}/>

                            <Route path="/taxi" element={<TaxiDashboard/>}/>
                            <Route path="/taxi/orders" element={<TaxiOrdersPage/>}/>
                            <Route path="/taxi/earnings" element={<TaxiEarningsPage/>}/>
                            <Route path="/taxi/market" element={<TaxiMarketPage/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                    </main>

                </div>
            </div>

            {/* Bottom Navigation for Mobile */}
            {userRole === 'client' && <BottomNavigation/>}
            {(userRole === 'taxi' || userRole === 'driver') && <TaxiBottomNavigation/>}
            {userRole === 'admin' && <AdminBottomNavigation/>}
            {userRole === 'dispatcher' && <DispatcherBottomNavigation/>}
            {userRole === 'taxi-park-admin' && <TaxiParkBottomNavigation/>}
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
