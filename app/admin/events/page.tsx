'use client';

import { useState, useEffect } from 'react';
import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEvents } from '@/lib/hooks/useEvents';
import { eventsApi } from '@/lib/api';
import { EventType } from '@/lib/api/types';
import { Plus, Edit, Trash2, Calendar, MapPin, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

export default function AdminEventsPage() {
    const { events, isLoading, fetchEvents } = useEvents();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null); // Type any for flexibility if types are strict

    const [formData, setFormData] = useState<any>({
        title: '',
        description: '',
        eventType: '',
        price: 0,
        date: '',
        capacity: 100,
        googleMeetLink: '',
        location: '', // Optional/Legacy
        coverImageUrl: ''
    });

    // ...

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            eventType: '',
            price: 0,
            date: '',
            capacity: 100,
            googleMeetLink: '',
            location: '',
            coverImageUrl: ''
        });
        setEditingEvent(null);
    };

    const handleEdit = (event: any) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description || '',
            eventType: event.eventType || '',
            price: event.price,
            date: (event.date || event.startDateTime || '').slice(0, 16),
            capacity: event.capacity || 100,
            googleMeetLink: event.googleMeetLink || event.meetingLink || '',
            location: event.location || '',
            coverImageUrl: event.coverImageUrl || ''
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await eventsApi.deleteEvent(id);
            toast.success('Event deleted successfully');
            fetchEvents();
        } catch (error) {
            console.error('Failed to delete event:', error);
            toast.error('Failed to delete event');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                ...formData,
                isOnline: formData.eventType === EventType.ONLINE,
            };

            if (editingEvent) {
                await eventsApi.updateEvent(editingEvent.id, data);
                toast.success('Event updated successfully');
            } else {
                await eventsApi.createEvent(data);
                toast.success('Event created successfully');
            }

            setIsDialogOpen(false);
            resetForm();
            fetchEvents();
        } catch (error) {
            console.error('Failed to save event:', error);
            toast.error('Failed to save event');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedAdminRoute>
            <div className="container mx-auto py-10 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>
                                <Plus className="mr-2 h-4 w-4" /> Create Event
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingEvent ? 'Edit Event' : 'Create Event'}</DialogTitle>
                                <DialogDescription>
                                    {editingEvent ? 'Make changes to the event here.' : 'Add a new event to the schedule.'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    className='h-32'
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select
                        value={formData.eventType}
                        onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={EventType.ONLINE}>Online</SelectItem>
                            <SelectItem value={EventType.IN_PERSON}>In Person</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price">Price (£)</Label>
                    <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="date">Date & Time</Label>
                    <Input
                        id="date"
                        type="datetime-local"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                        id="capacity"
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                        required
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="googleMeetLink">Google Meet Link</Label>
                <Input
                    id="googleMeetLink"
                    value={formData.googleMeetLink}
                    onChange={e => setFormData({ ...formData, googleMeetLink: e.target.value })}
                    placeholder="https://meet.google.com/..."
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                <Input
                    id="coverImageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.coverImageUrl}
                    onChange={e => setFormData({ ...formData, coverImageUrl: e.target.value })}
                />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
            </DialogFooter>
        </form>
                    </DialogContent>
                </Dialog>
            </div>

        <Card>
            <CardHeader>
                <CardTitle>All Events</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <div>{event.title}</div>
                                            <div className="text-xs text-muted-foreground">{event.eventType}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {format(parseISO(event.date || event.startDateTime), 'MMM d, yyyy h:mm a')}
                                    </TableCell>
                                    <TableCell>
                                        {event.googleMeetLink ? (
                                            <div className="flex items-center gap-1">
                                                <Badge variant="secondary">Online</Badge>
                                            </div>
                                        ) : (
                                            event.location || 'Online'
                                        )}
                                    </TableCell>
                                    <TableCell>£{event.price}</TableCell>
                                    <TableCell>{event.availableTickets} / {event.capacity}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} className="text-destructive hover:bg-destructive/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {events.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No events found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
        </div>
        </ProtectedAdminRoute>
    );
}
