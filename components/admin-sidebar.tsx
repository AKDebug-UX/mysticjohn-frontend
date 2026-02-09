import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, Percent, MessageSquare, Settings, BookOpen, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },

    { name: 'Credit Packs', href: '/admin/credit-packs', icon: Percent },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    // { name: 'Settings', href: '/admin/settings', icon: Settings }, // Future
]

interface AdminSidebarProps {
    className?: string
    onLinkClick?: () => void
}

export function AdminSidebar({ className, onLinkClick }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={cn("hidden lg:block fixed left-0 top-0 h-screen w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl z-30 transition-all duration-300", className)}>
            <div className="flex flex-col h-full">
                <div className="h-16 flex items-center px-6 border-b border-border/50 bg-background/50 backdrop-blur-md">
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Mystic Admin</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {adminNavigation.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onLinkClick}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                    isActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                                )}
                            >
                                <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                <span>{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
                                )}
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-border/50 bg-background/30">
                    <div className="px-4 py-2">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">System</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
