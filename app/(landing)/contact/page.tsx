'use client';

import { useState } from 'react';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Loader2, Send, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Message sent! John or his team will be in touch soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="flex-1">
            {/* Header */}
            <section className="relative py-28 bg-linear-to-b from-primary/10 to-transparent overflow-hidden">
                <MysticalSparkles />
                <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 rounded-full">
                        Connect With Us
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Have a question about a booking, event, or just want tae say hello? We're here tae help ye find yer way.
                    </p>
                </div>
            </section>

            <section className="py-20 pb-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <Card className="pb-3 group border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                <CardContent className="p-8 flex items-start gap-6">
                                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Mail className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-1">Email Us</h3>
                                        <p className="text-sm text-muted-foreground mb-3">For general enquiries</p>
                                        <a href="mailto:hello@johnspratt.com" className="text-lg font-medium text-primary hover:underline underline-offset-4">hello@johnspratt.com</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="pb-3 group border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent/20 group-hover:bg-accent transition-colors" />
                                <CardContent className="p-8 flex items-start gap-6">
                                    <div className="bg-accent/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                                        <MessageCircle className="h-7 w-7 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-1">Quick Question?</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Existin' members can use their credits tae ask John a quick question directly via the Dashboard.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-10 rounded-3xl bg-linear-to-br from-primary/10 via-card to-accent/5 border border-primary/20 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" /> Studio Location
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        123 Mystical Way<br />
                                        Glasgow, Scotland<br />
                                        G1 1AB
                                    </p>
                                    <p className="text-sm text-primary mt-6 italic font-medium">
                                        (Strictly by appointment only)
                                    </p>
                                </div>
                                <Sparkles className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="pb-3 lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-md shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden">
                            <CardHeader className="p-10 pb-2">
                                <CardTitle className="text-3xl font-bold">Send a Message</CardTitle>
                                <CardDescription className="text-lg mt-2">
                                    Fill oot the form below and we'll get back tae ye as soon as possible, lovely soul.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 pt-6">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="name" className="text-base font-semibold">Your Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Jane Doe"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="h-12 bg-background/50 border-white/10 rounded-xl focus:border-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="jane@example.com"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="h-12 bg-background/50 border-white/10 rounded-xl focus:border-primary/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="subject" className="text-base font-semibold">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="Booking enquiry, Event question, etc."
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="h-12 bg-background/50 border-white/10 rounded-xl focus:border-primary/50"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="message" className="text-base font-semibold">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="How can we help ye today?"
                                            className="min-h-[180px] bg-background/50 border-white/10 rounded-xl focus:border-primary/50 text-base"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                                                Sending yer message...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 mr-3" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
