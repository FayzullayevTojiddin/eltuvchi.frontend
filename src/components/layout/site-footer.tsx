import {Link} from "react-router-dom"

export function SiteFooter() {
    return (
        <footer
            className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <h3 className="font-semibold mb-4">Eltuvchi</h3>
                        <p className="text-sm text-muted-foreground">
                            O'zbekistonda eng ishonchli shaharlararo taxi xizmati
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-3">Xizmatlar</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/order" className="hover:text-foreground">Buyurtma berish</Link></li>
                            <li><Link to="/market" className="hover:text-foreground">Market</Link></li>
                            <li><Link to="/referral" className="hover:text-foreground">Referal</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-3">Ma'lumot</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/about" className="hover:text-foreground">Biz haqimizda</Link></li>
                            <li><Link to="/help" className="hover:text-foreground">Yordam</Link></li>
                            <li><Link to="/terms" className="hover:text-foreground">Shartlar</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-3">Aloqa</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>+998 71 123 45 67</li>
                            <li>info@eltuvchi.uz</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Eltuvchi. Barcha huquqlar himoyalangan.
                </div>
            </div>
        </footer>
    )
}
