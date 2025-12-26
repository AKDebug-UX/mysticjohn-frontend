'use client';

import { useEffect, useState } from 'react';
import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute';
import { useAdminCredits } from '@/lib/hooks';
import { useAuthContext } from '@/contexts/AuthContext';
import { CreditPack } from '@/lib/api/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Plus, Edit, Trash2, Loader2, Coins, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminCreditPacksPage() {
  const {
    creditPacks,
    isLoading,
    error,
    fetchAllCreditPacks,
    createCreditPack,
    updateCreditPack,
    deleteCreditPack,
  } = useAdminCredits();
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPack, setEditingPack] = useState<CreditPack | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  useEffect(() => {
    fetchAllCreditPacks();
  }, [fetchAllCreditPacks]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this credit pack?')) {
      return;
    }

    setIsDeleting(id);
    const success = await deleteCreditPack(id);
    if (success) {
      toast.success('Credit pack deleted successfully');
    } else {
      toast.error('Failed to delete credit pack');
    }
    setIsDeleting(null);
  };

  const formatPrice = (price: number, currency: string = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="sm">
                    ← Back
                  </Button>
                </Link>
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Credit Packs</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground hidden md:block">
                  {user?.name || user?.email}
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
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Pack
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {isLoading && creditPacks.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : creditPacks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Coins className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No credit packs found.</p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Pack
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {creditPacks.map((pack) => (
                <Card
                  key={pack.id}
                  className={`border-primary/20 hover:border-primary/40 transition-all ${
                    !pack.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{pack.name}</CardTitle>
                        <CardDescription>
                          {pack.description || 'Credit pack'}
                        </CardDescription>
                      </div>
                      <Badge variant={pack.isActive ? 'default' : 'secondary'}>
                        {pack.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Credits</span>
                        <span className="text-lg font-semibold">{pack.credits}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="text-lg font-semibold">
                          {formatPrice(pack.price, 'GBP')}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border/50 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setEditingPack(pack)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(pack.id)}
                          disabled={isDeleting === pack.id}
                        >
                          {isDeleting === pack.id ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-1" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Create/Edit Dialog */}
        <CreditPackDialog
          open={isCreateDialogOpen || editingPack !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateDialogOpen(false);
              setEditingPack(null);
            }
          }}
          pack={editingPack}
          onSave={async (data) => {
            if (editingPack) {
              const result = await updateCreditPack(editingPack.id, data);
              if (result) {
                toast.success('Credit pack updated successfully');
                setEditingPack(null);
              }
            } else {
              const result = await createCreditPack(data);
              if (result) {
                toast.success('Credit pack created successfully');
                setIsCreateDialogOpen(false);
              }
            }
          }}
        />
      </div>
    </ProtectedAdminRoute>
  );
}

interface CreditPackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: CreditPack | null;
  onSave: (data: {
    name: string;
    credits: number;
    price: number;
    currency?: string;
    isActive?: boolean;
  }) => Promise<void>;
}

function CreditPackDialog({ open, onOpenChange, pack, onSave }: CreditPackDialogProps) {
  const [name, setName] = useState('');
  const [credits, setCredits] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState('GBP');
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (pack) {
      setName(pack.name);
      setCredits(pack.credits);
      setPrice(pack.price);
      setCurrency('GBP');
      setIsActive(pack.isActive);
    } else {
      setName('');
      setCredits(0);
      setPrice(0);
      setCurrency('GBP');
      setIsActive(true);
    }
  }, [pack, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || credits <= 0 || price < 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        name,
        credits,
        price,
        currency,
        isActive,
      });
    } catch (error) {
      console.error('Error saving credit pack:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{pack ? 'Edit Credit Pack' : 'Create Credit Pack'}</DialogTitle>
          <DialogDescription>
            {pack
              ? 'Update the credit pack details'
              : 'Create a new credit pack for members to purchase'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Starter Pack"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credits">Credits *</Label>
            <Input
              id="credits"
              type="number"
              min="1"
              value={credits}
              onChange={(e) => setCredits(parseInt(e.target.value) || 0)}
              placeholder="10"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              placeholder="10.00"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="GBP"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300"
              disabled={isSubmitting}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active (visible to members)
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : pack ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

