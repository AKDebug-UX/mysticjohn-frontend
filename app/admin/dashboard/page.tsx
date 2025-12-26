'use client';

import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, CreditCard, Calendar, BookOpen, MessageSquare, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Welcome, {user?.name || user?.email}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Stats Cards */}
            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Members</CardTitle>
                </div>
                <CardDescription>Total registered members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">-</div>
                <p className="text-sm text-muted-foreground mt-2">Coming soon</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle>Bookings</CardTitle>
                </div>
                <CardDescription>Upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">-</div>
                <p className="text-sm text-muted-foreground mt-2">Coming soon</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle>Questions</CardTitle>
                </div>
                <CardDescription>Pending quick questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">-</div>
                <p className="text-sm text-muted-foreground mt-2">Coming soon</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Credit Packs</CardTitle>
                </div>
                <CardDescription>Manage credit packs</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/credit-packs">
                  <Button variant="outline" className="w-full">
                    Manage Credit Packs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle>Courses</CardTitle>
                </div>
                <CardDescription>Manage courses and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Create and edit courses</p>
              </CardContent>
            </Card>
          </div>

          {/* Admin Actions Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors">
                    <h3 className="font-semibold mb-2">Manage Credit Packs</h3>
                    <p className="text-sm text-muted-foreground">Create, edit, or deactivate credit packs</p>
                  </div>
                  <div className="p-4 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors">
                    <h3 className="font-semibold mb-2">Answer Questions</h3>
                    <p className="text-sm text-muted-foreground">View and reply to member questions</p>
                  </div>
                  <div className="p-4 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors">
                    <h3 className="font-semibold mb-2">View All Members</h3>
                    <p className="text-sm text-muted-foreground">Browse and manage member accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedAdminRoute>
  );
}

