'use client';

import { useState } from 'react';
import { LandingNavigation } from '@/components/landing-navigation';
import { Footer } from '@/components/footer';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Loader2, Send, MapPin, MessageCircle } from 'lucide-react';
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
        <div className="min-h-screen bg-background flex flex-col">
            <LandingNavigation />

            <main className="flex-1">
                {/* Header */}
                <section className="relative py-20 bg-linear-to-b from-primary/5 to-transparent">
                    <MysticalSparkles />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Have a question about a booking, event, or just want to say hello? Drop us a message below.
                        </p>
                    </div>
                </section>

                <section className="py-12 pb-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Contact Info */}
                            <div className="space-y-6">
                                <Card className="border-border/50 bg-card/50">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                                            <p className="text-sm text-muted-foreground mb-2">For general enquiries</p>
                                            <a href="mailto:hello@johnspratt.com" className="text-primary hover:underline">hello@johnspratt.com</a>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/50 bg-card/50">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="bg-accent/10 p-3 rounded-full">
                                            <MessageCircle className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">Quick Question?</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Existing members can use their credits to ask John a quick question directly via the Dashboard.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="p-6 rounded-2xl bg-linear-to-br from-primary/10 to-transparent border border-primary/10">
                                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Studio Location
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        123 Mystical Way<br />
                                        Glasgow, Scotland<br />
                                        G1 1AB
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-4 italic">
                                        (By appointment only)
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <Card className="lg:col-span-2 border-border/50 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Send a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Your Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Jane Doe"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="jane@example.com"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="Booking enquiry, Event question, etc."
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="How can we help you today?"
                                                className="min-h-[150px]"
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full md:w-auto min-w-[150px]"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4 mr-2" />
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

            <Footer />
        </div>
    );
}
