
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Link } from "react-router-dom"

export function SiteHeader() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-primary">
            O'rgimchak
          </Link>
          {/*<div className="relative hidden md:block">*/}
          {/*  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />*/}
          {/*  <Input*/}
          {/*    placeholder="Qidirish..."*/}
          {/*    className="w-64 pl-8"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
