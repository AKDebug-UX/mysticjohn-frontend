'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { authApi } from '@/lib/api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getZodiacSign } from '@/lib/utils/zodiac';
import { X, Plus, Camera } from 'lucide-react';

const INTEREST_OPTIONS = [
    'Tarot', 'Astrology', 'Numerology', 'Mediumship',
    'Spirituality', 'Crystals', 'Meditation', 'Psychic'
];

export default function ProfilePage() {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dob: '',
        interests: [] as string[],
        profilePhoto: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
                interests: user.interests || [],
                profilePhoto: user.profilePhoto || '',
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const calculateZodiac = () => {
        if (!formData.dob) return null;
        const date = new Date(formData.dob);
        return getZodiacSign(date.getDate(), date.getMonth() + 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authApi.updateProfile({
                ...formData,
                zodiacSign: calculateZodiac() || undefined
            });
            toast.success('Profile updated successfully!');
            // Update local state by calling getMe or similar if needed, 
            // but authApi.updateProfile returns the updated user
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return (
        <div className="container py-20 text-center">
            <h1 className="text-2xl font-bold">Please log in to view your profile</h1>
        </div>
    );

    const zodiacSign = calculateZodiac();

    return (
        <div className="container py-10 max-w-4xl">
            <div className="flex items-center gap-6 mb-8 text-white">
                <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src={formData.profilePhoto} />
                        <AvatarFallback className="bg-muted text-2xl uppercase">
                            {formData.name.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{formData.name || 'User Profile'}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    {zodiacSign && (
                        <Badge variant="outline" className="mt-2 text-primary border-primary/50">
                            {zodiacSign}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="grid gap-6">
                <Card className="py-3 bg-card/50 backdrop-blur-sm border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details and how we contact you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>
                            </div>

                            <div className="py-4">
                                <Label className="mb-2 block">Interests</Label>
                                <div className="flex flex-wrap gap-2">
                                    {INTEREST_OPTIONS.map(interest => (
                                        <Badge
                                            key={interest}
                                            variant={formData.interests.includes(interest) ? 'default' : 'secondary'}
                                            className="cursor-pointer hover:bg-primary/80 transition-colors"
                                            onClick={() => toggleInterest(interest)}
                                        >
                                            {interest}
                                            {formData.interests.includes(interest) && <X className="ml-1 h-3 w-3" />}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
