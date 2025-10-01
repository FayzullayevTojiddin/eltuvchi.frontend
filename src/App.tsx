import {useEffect} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import {ThemeProvider} from './components/theme-provider'
import {SiteHeader} from './components/layout/site-header'
import {SiteFooter} from './components/layout/site-footer'
import {SidebarProvider} from './components/ui/sidebar'
import {AppSidebar} from './components/layout/app-sidebar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
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
import TaxiParkAdminDashboard from './pages/TaxiParkAdminDashboard'
import TaxiParkDriversPage from './pages/TaxiParkDriversPage'
import TaxiParkDispatchersPage from './pages/TaxiParkDispatchersPage'
import TaxiParkDispatcherDetailPage from './pages/TaxiParkDispatcherDetailPage'
import TaxiParkOwnerDashboard from './pages/TaxiParkOwnerDashboard'
import TaxiParkDriversManagement from './pages/TaxiParkDriversManagement'
import TaxiParkDriverDetail from './pages/TaxiParkDriverDetail'
import TaxiParkDispatchersManagement from './pages/TaxiParkDispatchersManagement'
import TaxiParkPriceManagement from './pages/TaxiParkPriceManagement'
import TaxiParkOrdersPage from './pages/TaxiParkOrdersPage'
import TaxiParkAnalyticsPage from './pages/TaxiParkAnalyticsPage'
import TaxiParkPricingPage from './pages/TaxiParkPricingPage'
import {AdminBottomNavigation} from './components/layout/admin-bottom-navigation'
import {DispatcherBottomNavigation} from './components/layout/dispatcher-bottom-navigation'
import {TaxiParkBottomNavigation} from './components/layout/taxi-park-bottom-navigation'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import SuperAdminUsersPage from './pages/SuperAdminUsersPage'
import SuperAdminDriversPage from './pages/SuperAdminDriversPage'
import OrderPage from './pages/OrderPage'
import OrdersPage from './pages/OrdersPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminDispatchersPage from './pages/AdminDispatchersPage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import AdminPaymentsPage from './pages/AdminPaymentsPage'
import AdminMarketPage from './pages/AdminMarketPage'
import AdminTaxiParksPage from './pages/AdminTaxiParksPage'
import AdminTaxiParkDetailPage from './pages/AdminTaxiParkDetailPage'
import DispatcherDashboard from './pages/DispatcherDashboard'
import DispatcherOrdersPage from './pages/DispatcherOrdersPage'
import DispatcherUsersPage from './pages/DispatcherUsersPage'
import {Toaster} from "react-hot-toast";

function AppContent() {
    const location = useLocation()
    const userRole = localStorage.getItem('userRole') || 'client'

    useEffect(() => {
        // Set default role if not already set
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
                            <Route path="/" element={<LoginPage/>}/>
                            <Route path="/home" element={<Dashboard/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
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

                            {/* Admin Routes */}
                            <Route path="/admin" element={<AdminDashboard/>}/>
                            <Route path="/admin/users" element={<AdminUsersPage/>}/>
                            <Route path="/admin/dispatchers" element={<AdminDispatchersPage/>}/>
                            <Route path="/admin/taxi-parks" element={<AdminTaxiParksPage/>}/>
                            <Route path="/admin/taxi-parks/:parkId" element={<AdminTaxiParkDetailPage/>}/>
                            <Route path="/admin/orders" element={<AdminOrdersPage/>}/>
                            <Route path="/admin/payments" element={<AdminPaymentsPage/>}/>
                            <Route path="/admin/market" element={<AdminMarketPage/>}/>

                            {/* Dispatcher Routes */}
                            <Route path="/dispatcher" element={<DispatcherDashboard/>}/>
                            <Route path="/dispatcher/orders" element={<DispatcherOrdersPage/>}/>
                            <Route path="/dispatcher/users" element={<DispatcherUsersPage/>}/>

                            {/* Taxi Routes */}
                            <Route path="/taxi" element={<TaxiDashboard/>}/>
                            <Route path="/taxi/orders" element={<TaxiOrdersPage/>}/>
                            <Route path="/taxi/earnings" element={<TaxiEarningsPage/>}/>
                            <Route path="/taxi/market" element={<TaxiMarketPage/>}/>

                            {/* Taxi Park Admin Routes */}
                            <Route path="/taxi-park" element={<TaxiParkAdminDashboard/>}/>
                            <Route path="/taxi-park/orders" element={<TaxiParkOrdersPage/>}/>
                            <Route path="/taxi-park/drivers" element={<TaxiParkDriversPage/>}/>
                            <Route path="/taxi-park/dispatchers" element={<TaxiParkDispatchersPage/>}/>
                            <Route path="/taxi-park/pricing" element={<TaxiParkPricingPage/>}/>
                            <Route path="/taxi-park/analytics" element={<TaxiParkAnalyticsPage/>}/>
                            <Route path="/taxi-park/dispatchers/:id" element={<TaxiParkDispatcherDetailPage/>}/>

                            {/* Taxi Park Owner Routes */}
                            <Route path="/taxi-park-owner" element={<TaxiParkOwnerDashboard/>}/>
                            <Route path="/taxi-park-owner/drivers" element={<TaxiParkDriversManagement/>}/>
                            <Route path="/taxi-park-owner/drivers/:driverId" element={<TaxiParkDriverDetail/>}/>
                            <Route path="/taxi-park-owner/dispatchers" element={<TaxiParkDispatchersManagement/>}/>
                            <Route path="/taxi-park-owner/prices" element={<TaxiParkPriceManagement/>}/>

                            {/* Super Admin Routes */}
                            <Route path="/super-admin" element={<SuperAdminDashboard/>}/>
                            <Route path="/super-admin/users" element={<SuperAdminUsersPage/>}/>
                            <Route path="/super-admin/drivers" element={<SuperAdminDriversPage/>}/>

                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>

                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                        />

                    </main>

                    {/*{!isLoginPage && !isRegisterPage && <SiteFooter/>}*/}
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
