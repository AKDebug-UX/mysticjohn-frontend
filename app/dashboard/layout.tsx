'use client';

import { useState } from 'react';
import { Navigation } from '@/components/dashboard/nav-dashboard';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { MobileBottomNav } from '@/components/dashboard/bottom-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background font-sans">
                <Navigation />

                <div className="flex pt-0 relative">
                    {/* Desktop Sidebar */}
                    <DashboardSidebar />

                    <main className="flex-1 lg:ml-64 min-h-[calc(100vh-73px)]">
                        {/* Mobile Header / Sidebar Toggle */}
                        <div className="lg:hidden sticky top-[73px] z-20 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
                            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                        <Menu className="h-5 w-5 text-foreground" />
                                        <span className="sr-only">Toggle Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-72 border-r-border/50 bg-card/95 backdrop-blur-xl">
                                    <div className="h-full overflow-y-auto">
                                        <DashboardSidebar
                                            className="block lg:hidden w-full h-full relative top-0 border-none bg-transparent"
                                            onLinkClick={() => setIsSidebarOpen(false)}
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <span className="font-semibold text-foreground">My Dashboard</span>
                        </div>

                        <div className="p-4 md:p-6 lg:p-8 animate-in fade-in-50 slide-in-from-bottom-5 duration-500 pb-24 lg:pb-8">
                            {children}
                        </div>
                    </main>
                </div>
                <MobileBottomNav />
            </div>
        </ProtectedRoute>
    );
}
