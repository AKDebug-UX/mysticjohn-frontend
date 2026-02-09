'use client';

import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, CreditCard, Calendar, BookOpen, MessageSquare, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { bookingsApi } from '@/lib/api/bookings.api';
import { adminApi } from '@/lib/api/admin.api';
import { messagesApi } from '@/lib/api/messages.api';
import { formatCurrency } from '@/lib/utils'; // Assuming this helper exists, or I will use Intl.NumberFormat

// ... existing imports

export default function AdminDashboardPage() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    membersCount: 0,
    bookingsCount: 0,
    questionsCount: 0,
    revenue: 0,
    bookingsChange: 0, // We might not be able to calculate change easily without historical data, so we might zero it or estimate
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookings, users, questions] = await Promise.all([
          bookingsApi.getAllBookings().catch(() => []),
          adminApi.getUsers().catch(() => []),
          messagesApi.getAllQuestions().catch(() => [])
        ]);

        // Calculate Revenue (sum of price from bookings)
        // Assuming booking.service.price covers it, or if paymentStatus is PAID
        const totalRevenue = bookings.reduce((acc, booking) => {
          // Check if booking has service and price
          const price = booking.service?.price || 0;
          return acc + price;
        }, 0);

        // Calculate upcoming bookings for the week
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcomingBookings = bookings.filter(b => {
          const date = new Date(b.startDateTime);
          return date >= now && date <= nextWeek;
        }).length;

        setStatsData({
          membersCount: users.length,
          bookingsCount: upcomingBookings,
          questionsCount: questions.filter(q => q.status === 'PENDING').length,
          revenue: totalRevenue,
          bookingsChange: 0 // Placeholder as we don't have historical data store in frontend
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Members",
      value: loading ? "..." : statsData.membersCount.toString(),
      change: "+0%", // Static for now
      icon: Users,
      description: "Total registered users",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Bookings",
      value: loading ? "..." : statsData.bookingsCount.toString(),
      change: "", // Removed change if we can't calc it
      icon: Calendar,
      description: "Upcoming this week",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Questions",
      value: loading ? "..." : statsData.questionsCount.toString(),
      change: "",
      icon: MessageSquare,
      description: "Pending responses",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Revenue",
      value: loading ? "..." : new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(statsData.revenue),
      change: "",
      icon: CreditCard,
      description: "Total estimated revenue",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}. Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hidden sm:flex">
            Download Report
          </Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            Create New Item
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Sections */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions & Recent Activity */}
        <div className="col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/admin/bookings" className="group">
                  <div className="p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-300 hover:shadow-md flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Manage Bookings</h3>
                      <p className="text-sm text-muted-foreground">View schedule & services</p>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/courses" className="group">
                  <div className="p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-300 hover:shadow-md flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Manage Courses</h3>
                      <p className="text-sm text-muted-foreground">Edit content & pricing</p>
                    </div>
                  </div>
                </Link>


                <Link href="/admin/credit-packs" className="group">
                  <div className="p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-300 hover:shadow-md flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Credit Packs</h3>
                      <p className="text-sm text-muted-foreground">Update credit options</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications / System Status */}
        <div className="col-span-3 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Platform health and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium text-sm">API Status</span>
                  </div>
                  <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full font-medium">Operational</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium text-sm">Database</span>
                  </div>
                  <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full font-medium">Connected</span>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="text-sm font-semibold mb-3">Pending Tasks</h4>
                  <div className="space-y-2">

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Respond to 2 booking inquiries</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

