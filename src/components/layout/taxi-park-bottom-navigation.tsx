
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  UserCheck,
  ShoppingBag,
  DollarSign,
  BarChart3
} from "lucide-react";

export const TaxiParkBottomNavigation = () => {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  if (userRole !== 'taxi-park-admin') return null;

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/taxi-park",
      icon: LayoutDashboard,
    },
    {
      label: "Haydovchilar",
      href: "/taxi-park/drivers",
      icon: Car,
    },
    {
      label: "Dispatchers",
      href: "/taxi-park/dispatchers",
      icon: UserCheck,
    },
    {
      label: "Buyurtmalar",
      href: "/taxi-park/orders",
      icon: ShoppingBag,
    },
    {
      label: "Analitika",
      href: "/taxi-park/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <nav className="flex items-center justify-around p-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
