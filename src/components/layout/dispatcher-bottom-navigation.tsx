import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Activity,
  Users,
  ShoppingBag,
  MessageCircle,
  BarChart3
} from "lucide-react";

export const DispatcherBottomNavigation = () => {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  if (userRole !== 'dispatcher') return null;

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/dispatcher",
      icon: Activity,
    },
    {
      label: "Buyurtmalar",
      href: "/dispatcher/orders",
      icon: ShoppingBag,
    },
    {
      label: "Foydalanuvchilar",
      href: "/dispatcher/users",
      icon: Users,
    },
    {
      label: "Chat",
      href: "/dispatcher/chat",
      icon: MessageCircle,
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