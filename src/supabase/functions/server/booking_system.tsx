import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

// Initialize Supabase client with service role
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Types
export interface Booking {
  id: string;
  title: string;
  client: {
    name: string;
    company?: string;
    phone: string;
    email: string;
  };
  resource: {
    id: string;
    name: string;
    type: 'boat' | 'helicopter' | 'buggy' | 'staff';
  };
  crew: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  partner?: {
    id: string;
    name: string;
    commission: number;
  };
  datetime: {
    start: string; // ISO datetime
    end: string; // ISO datetime
    date: string; // YYYY-MM-DD
  };
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  weather?: {
    temp: number;
    condition: 'sunny' | 'cloudy' | 'partly_cloudy' | 'rainy' | 'windy';
    wind: number;
    warnings?: string[];
  };
  documents?: {
    contract?: string;
    insurance?: string;
    permits?: string[];
  };
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'boat' | 'helicopter' | 'buggy' | 'staff';
  status: 'available' | 'booked' | 'maintenance' | 'offline';
  location: string;
  capacity: number;
  assigned_crew?: string[];
  partner_id?: string;
  availability_schedule?: {
    [date: string]: {
      available_from: string;
      available_to: string;
      unavailable_periods?: Array<{
        from: string;
        to: string;
        reason: string;
      }>;
    };
  };
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  qualifications: string[];
  schedule: {
    [date: string]: {
      available_from: string;
      available_to: string;
      assigned_bookings?: string[];
    };
  };
}

// Booking Management Functions
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const bookingId = `booking_${Date.now()}`;
    const now = new Date().toISOString();
    
    const newBooking: Booking = {
      ...booking,
      id: bookingId,
      created_at: now,
      updated_at: now,
    };

    // Check for conflicts
    const conflicts = await checkBookingConflicts(newBooking);
    if (conflicts.length > 0) {
      return {
        success: false,
        error: `Booking conflicts detected: ${conflicts.map(c => c.reason).join(', ')}`
      };
    }

    // Store in KV store
    await kv.set(`booking:${bookingId}`, newBooking);
    
    // Update resource availability
    await updateResourceAvailability(newBooking.resource.id, newBooking.datetime, 'book');
    
    // Update crew assignments
    for (const crewMember of newBooking.crew) {
      await assignCrewToBooking(crewMember.id, bookingId, newBooking.datetime);
    }
    
    // Send notifications
    await sendBookingNotifications(newBooking, 'created');
    
    // Auto-schedule related resources if needed
    await autoScheduleResources(newBooking.datetime.date);

    return { success: true, booking: newBooking };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: 'Failed to create booking' };
  }
}

export async function updateBooking(bookingId: string, updates: Partial<Booking>, userId: string): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const existingBooking = await kv.get(`booking:${bookingId}`) as Booking;
    if (!existingBooking) {
      return { success: false, error: 'Booking not found' };
    }

    const updatedBooking: Booking = {
      ...existingBooking,
      ...updates,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    };

    // Check for conflicts if datetime or resource changed
    if (updates.datetime || updates.resource) {
      const conflicts = await checkBookingConflicts(updatedBooking, bookingId);
      if (conflicts.length > 0) {
        return {
          success: false,
          error: `Update conflicts detected: ${conflicts.map(c => c.reason).join(', ')}`
        };
      }
    }

    await kv.set(`booking:${bookingId}`, updatedBooking);
    
    // Send notifications for changes
    await sendBookingNotifications(updatedBooking, 'updated', existingBooking);
    
    return { success: true, booking: updatedBooking };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error: 'Failed to update booking' };
  }
}

export async function deleteBooking(bookingId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const booking = await kv.get(`booking:${bookingId}`) as Booking;
    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    // Update resource availability
    await updateResourceAvailability(booking.resource.id, booking.datetime, 'release');
    
    // Release crew assignments
    for (const crewMember of booking.crew) {
      await releaseCrewFromBooking(crewMember.id, bookingId, booking.datetime);
    }
    
    await kv.del(`booking:${bookingId}`);
    
    // Send cancellation notifications
    await sendBookingNotifications(booking, 'cancelled');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error: 'Failed to delete booking' };
  }
}

export async function getBookings(filters?: {
  resource_id?: string;
  crew_id?: string;
  date_from?: string;
  date_to?: string;
  status?: string;
}): Promise<Booking[]> {
  try {
    const bookingKeys = await kv.getByPrefix('booking:');
    const bookings = bookingKeys.map(item => item.value as Booking);
    
    let filteredBookings = bookings;
    
    if (filters) {
      if (filters.resource_id) {
        filteredBookings = filteredBookings.filter(b => b.resource.id === filters.resource_id);
      }
      
      if (filters.crew_id) {
        filteredBookings = filteredBookings.filter(b => 
          b.crew.some(c => c.id === filters.crew_id)
        );
      }
      
      if (filters.date_from) {
        filteredBookings = filteredBookings.filter(b => 
          new Date(b.datetime.date) >= new Date(filters.date_from!)
        );
      }
      
      if (filters.date_to) {
        filteredBookings = filteredBookings.filter(b => 
          new Date(b.datetime.date) <= new Date(filters.date_to!)
        );
      }
      
      if (filters.status) {
        filteredBookings = filteredBookings.filter(b => b.status === filters.status);
      }
    }
    
    return filteredBookings.sort((a, b) => 
      new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime()
    );
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
}

// Conflict Detection
async function checkBookingConflicts(booking: Booking, excludeBookingId?: string): Promise<Array<{ type: string; reason: string }>> {
  const conflicts = [];
  
  // Get existing bookings for the same resource and date
  const existingBookings = await getBookings({
    resource_id: booking.resource.id,
    date_from: booking.datetime.date,
    date_to: booking.datetime.date
  });
  
  const filteredBookings = excludeBookingId 
    ? existingBookings.filter(b => b.id !== excludeBookingId)
    : existingBookings;
  
  // Check resource availability
  for (const existingBooking of filteredBookings) {
    if (existingBooking.status === 'cancelled') continue;
    
    const newStart = new Date(booking.datetime.start);
    const newEnd = new Date(booking.datetime.end);
    const existingStart = new Date(existingBooking.datetime.start);
    const existingEnd = new Date(existingBooking.datetime.end);
    
    if (newStart < existingEnd && newEnd > existingStart) {
      conflicts.push({
        type: 'resource_overlap',
        reason: `Resource ${booking.resource.name} is already booked from ${existingStart.toLocaleTimeString()} to ${existingEnd.toLocaleTimeString()}`
      });
    }
  }
  
  // Check crew availability
  for (const crewMember of booking.crew) {
    const crewBookings = await getBookings({
      crew_id: crewMember.id,
      date_from: booking.datetime.date,
      date_to: booking.datetime.date
    });
    
    const filteredCrewBookings = excludeBookingId 
      ? crewBookings.filter(b => b.id !== excludeBookingId)
      : crewBookings;
    
    for (const existingBooking of filteredCrewBookings) {
      if (existingBooking.status === 'cancelled') continue;
      
      const newStart = new Date(booking.datetime.start);
      const newEnd = new Date(booking.datetime.end);
      const existingStart = new Date(existingBooking.datetime.start);
      const existingEnd = new Date(existingBooking.datetime.end);
      
      if (newStart < existingEnd && newEnd > existingStart) {
        conflicts.push({
          type: 'crew_overlap',
          reason: `Crew member ${crewMember.name} is already assigned from ${existingStart.toLocaleTimeString()} to ${existingEnd.toLocaleTimeString()}`
        });
      }
    }
  }
  
  return conflicts;
}

// Resource Management
async function updateResourceAvailability(resourceId: string, datetime: Booking['datetime'], action: 'book' | 'release'): Promise<void> {
  try {
    const resource = await kv.get(`resource:${resourceId}`) as Resource;
    if (!resource) return;
    
    if (!resource.availability_schedule) {
      resource.availability_schedule = {};
    }
    
    if (!resource.availability_schedule[datetime.date]) {
      resource.availability_schedule[datetime.date] = {
        available_from: '00:00',
        available_to: '23:59',
        unavailable_periods: []
      };
    }
    
    const daySchedule = resource.availability_schedule[datetime.date];
    
    if (action === 'book') {
      if (!daySchedule.unavailable_periods) {
        daySchedule.unavailable_periods = [];
      }
      daySchedule.unavailable_periods.push({
        from: datetime.start.split('T')[1].substring(0, 5),
        to: datetime.end.split('T')[1].substring(0, 5),
        reason: 'booked'
      });
    } else if (action === 'release') {
      if (daySchedule.unavailable_periods) {
        const timeFrom = datetime.start.split('T')[1].substring(0, 5);
        const timeTo = datetime.end.split('T')[1].substring(0, 5);
        daySchedule.unavailable_periods = daySchedule.unavailable_periods.filter(
          period => !(period.from === timeFrom && period.to === timeTo && period.reason === 'booked')
        );
      }
    }
    
    await kv.set(`resource:${resourceId}`, resource);
  } catch (error) {
    console.error('Error updating resource availability:', error);
  }
}

// Crew Management
async function assignCrewToBooking(crewId: string, bookingId: string, datetime: Booking['datetime']): Promise<void> {
  try {
    const crewMember = await kv.get(`crew:${crewId}`) as CrewMember;
    if (!crewMember) return;
    
    if (!crewMember.schedule[datetime.date]) {
      crewMember.schedule[datetime.date] = {
        available_from: '08:00',
        available_to: '20:00',
        assigned_bookings: []
      };
    }
    
    if (!crewMember.schedule[datetime.date].assigned_bookings) {
      crewMember.schedule[datetime.date].assigned_bookings = [];
    }
    
    crewMember.schedule[datetime.date].assigned_bookings!.push(bookingId);
    
    await kv.set(`crew:${crewId}`, crewMember);
  } catch (error) {
    console.error('Error assigning crew to booking:', error);
  }
}

async function releaseCrewFromBooking(crewId: string, bookingId: string, datetime: Booking['datetime']): Promise<void> {
  try {
    const crewMember = await kv.get(`crew:${crewId}`) as CrewMember;
    if (!crewMember || !crewMember.schedule[datetime.date]) return;
    
    const daySchedule = crewMember.schedule[datetime.date];
    if (daySchedule.assigned_bookings) {
      daySchedule.assigned_bookings = daySchedule.assigned_bookings.filter(id => id !== bookingId);
    }
    
    await kv.set(`crew:${crewId}`, crewMember);
  } catch (error) {
    console.error('Error releasing crew from booking:', error);
  }
}

// Auto-scheduling
async function autoScheduleResources(date: string): Promise<void> {
  try {
    const dayBookings = await getBookings({
      date_from: date,
      date_to: date
    });
    
    // Analyze resource utilization
    const resourceUtilization = new Map<string, number>();
    const crewUtilization = new Map<string, number>();
    
    for (const booking of dayBookings) {
      if (booking.status === 'cancelled') continue;
      
      const duration = new Date(booking.datetime.end).getTime() - new Date(booking.datetime.start).getTime();
      const hours = duration / (1000 * 60 * 60);
      
      // Track resource utilization
      const currentResourceHours = resourceUtilization.get(booking.resource.id) || 0;
      resourceUtilization.set(booking.resource.id, currentResourceHours + hours);
      
      // Track crew utilization
      for (const crewMember of booking.crew) {
        const currentCrewHours = crewUtilization.get(crewMember.id) || 0;
        crewUtilization.set(crewMember.id, currentCrewHours + hours);
      }
    }
    
    // Store utilization data for analytics
    await kv.set(`utilization:${date}`, {
      date,
      resource_utilization: Object.fromEntries(resourceUtilization),
      crew_utilization: Object.fromEntries(crewUtilization),
      total_bookings: dayBookings.filter(b => b.status !== 'cancelled').length,
      calculated_at: new Date().toISOString()
    });
    
    // TODO: Implement intelligent resource rebalancing based on utilization
    console.log(`Auto-scheduling completed for ${date}. Resource utilization:`, Object.fromEntries(resourceUtilization));
  } catch (error) {
    console.error('Error in auto-scheduling:', error);
  }
}

// Notifications
async function sendBookingNotifications(booking: Booking, action: 'created' | 'updated' | 'cancelled', previousBooking?: Booking): Promise<void> {
  try {
    const notification = {
      id: `notification_${Date.now()}`,
      booking_id: booking.id,
      action,
      message: generateNotificationMessage(booking, action, previousBooking),
      recipients: [
        ...booking.crew.map(c => c.id),
        booking.created_by,
        ...(booking.partner ? [booking.partner.id] : [])
      ],
      created_at: new Date().toISOString(),
      booking_snapshot: booking
    };
    
    await kv.set(`notification:${notification.id}`, notification);
    
    // Store notifications for each recipient
    for (const recipientId of notification.recipients) {
      const userNotifications = await kv.get(`user_notifications:${recipientId}`) as string[] || [];
      userNotifications.unshift(notification.id);
      
      // Keep only latest 50 notifications per user
      if (userNotifications.length > 50) {
        userNotifications.splice(50);
      }
      
      await kv.set(`user_notifications:${recipientId}`, userNotifications);
    }
    
    console.log(`Notification sent for booking ${booking.id}: ${action}`);
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

function generateNotificationMessage(booking: Booking, action: 'created' | 'updated' | 'cancelled', previousBooking?: Booking): string {
  switch (action) {
    case 'created':
      return `New booking created: ${booking.title} on ${new Date(booking.datetime.start).toLocaleDateString()} at ${new Date(booking.datetime.start).toLocaleTimeString()}`;
    case 'updated':
      if (previousBooking && previousBooking.datetime.start !== booking.datetime.start) {
        return `Booking rescheduled: ${booking.title} moved to ${new Date(booking.datetime.start).toLocaleDateString()} at ${new Date(booking.datetime.start).toLocaleTimeString()}`;
      }
      return `Booking updated: ${booking.title} on ${new Date(booking.datetime.start).toLocaleDateString()}`;
    case 'cancelled':
      return `Booking cancelled: ${booking.title} on ${new Date(booking.datetime.start).toLocaleDateString()}`;
    default:
      return `Booking ${action}: ${booking.title}`;
  }
}

// Real-time subscriptions
export async function getUserNotifications(userId: string, limit: number = 20): Promise<any[]> {
  try {
    const notificationIds = await kv.get(`user_notifications:${userId}`) as string[] || [];
    const limitedIds = notificationIds.slice(0, limit);
    
    const notifications = [];
    for (const notificationId of limitedIds) {
      const notification = await kv.get(`notification:${notificationId}`);
      if (notification) {
        notifications.push(notification);
      }
    }
    
    return notifications;
  } catch (error) {
    console.error('Error getting user notifications:', error);
    return [];
  }
}

export async function markNotificationAsRead(userId: string, notificationId: string): Promise<{ success: boolean }> {
  try {
    await kv.set(`notification_read:${userId}:${notificationId}`, true);
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { success: false };
  }
}