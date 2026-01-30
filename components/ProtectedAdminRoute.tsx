'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * ProtectedAdminRoute Component
 * Protects routes that require admin role
 *
 * @param children - Content to render if user is admin
 * @param redirectTo - Path to redirect if not admin (default: '/admin/login')
 */
export function ProtectedAdminRoute({
  children,
  redirectTo = '/admin/login',
}: ProtectedAdminRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not logged in, redirect to admin login
        router.push(redirectTo);
      } else if (user?.role !== 'admin') {
        // Logged in but not admin, redirect to regular dashboard
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, user, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or not admin, don't render children
  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}

