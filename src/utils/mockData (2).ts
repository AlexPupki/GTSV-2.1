// 🎭 GTS Mock Data System for Prototype
// Полная система данных без Supabase зависимостей

export interface MockUser {
  id: string;
  email: string;
  role: string;
  name: string;
  avatar?: string;
  created_at: string;
  status: 'active' | 'inactive';
}

export interface MockClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'lead' | 'active' | 'vip' | 'inactive';
  source: string;
  value: number;
  created_at: string;
  last_activity: string;
  deals: MockDeal[];
}

export interface MockDeal {
  id: string;
  client_id: string;
  title: string;
  value: number;
  status: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  stage: string;
  probability: number;
  expected_close: string;
  created_at: string;
  updated_at: string;
  activities: MockActivity[];
}

export interface MockActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'booking' | 'payment';
  title: string;
  description: string;
  date: string;
  user_id: string;
  client_id?: string;
  deal_id?: string;
}

export interface MockBooking {
  id: string;
  client_id: string;
  service_type: 'helicopter' | 'yacht' | 'supercar' | 'experience';
  service_name: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  value: number;
  created_at: string;
}

export interface MockFleetItem {
  id: string;
  type: 'helicopter' | 'yacht' | 'supercar';
  name: string;
  model: string;
  year: number;
  status: 'available' | 'booked' | 'maintenance' | 'inactive';
  location: string;
  hourly_rate: number;
  capacity: number;
  image?: string;
  next_booking?: string;
  maintenance_due?: string;
}

export interface MockPartner {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'brand' | 'experience' | 'contractor';
  status: 'active' | 'pending' | 'inactive';
  commission_rate: number;
  total_referrals: number;
  total_revenue: number;
  contact_email: string;
  contact_phone: string;
  created_at: string;
}

export interface MockRevenue {
  date: string;
  helicopter: number;
  yacht: number;
  supercar: number;
  experiences: number;
  total: number;
}

export interface MockWeatherCondition {
  location: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'dangerous';
  temperature: number;
  wind_speed: number;
  visibility: number;
  restrictions: string[];
  updated_at: string;
}

class MockDataStore {
  private data: Record<string, any[]> = {};

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Инициализация всех таблиц данных
    this.data = {
      users: this.generateMockUsers(),
      clients: this.generateMockClients(),
      deals: this.generateMockDeals(),
      activities: this.generateMockActivities(),
      bookings: this.generateMockBookings(),
      fleet: this.generateMockFleet(),
      partners: this.generateMockPartners(),
      revenue: this.generateMockRevenue(),
      weather: this.generateMockWeather()
    };

    // Сохраняем в localStorage для персистентности
    Object.keys(this.data).forEach(table => {
      if (!localStorage.getItem(`gts-mock-${table}`)) {
        localStorage.setItem(`gts-mock-${table}`, JSON.stringify(this.data[table]));
      } else {
        this.data[table] = JSON.parse(localStorage.getItem(`gts-mock-${table}`) || '[]');
      }
    });
  }

  // CRUD операции
  select(table: string, query?: { where?: any; limit?: number; orderBy?: string }): any[] {
    let data = this.data[table] || [];
    
    if (query?.where) {
      data = data.filter(item => {
        return Object.keys(query.where).every(key => {
          const value = query.where[key];
          if (typeof value === 'object' && value.in) {
            return value.in.includes(item[key]);
          }
          return item[key] === value;
        });
      });
    }

    if (query?.orderBy) {
      const [field, direction] = query.orderBy.split(' ');
      data.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (direction === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }

    if (query?.limit) {
      data = data.slice(0, query.limit);
    }

    return data;
  }

  insert(table: string, data: any): any {
    const newItem = {
      id: `${table}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data
    };

    this.data[table] = this.data[table] || [];
    this.data[table].push(newItem);
    this.saveToStorage(table);
    
    return newItem;
  }

  update(table: string, id: string, data: any): any {
    const items = this.data[table] || [];
    const index = items.findIndex(item => item.id === id);
    
    if (index !== -1) {
      this.data[table][index] = {
        ...this.data[table][index],
        ...data,
        updated_at: new Date().toISOString()
      };
      this.saveToStorage(table);
      return this.data[table][index];
    }
    
    return null;
  }

  delete(table: string, id: string): boolean {
    const items = this.data[table] || [];
    const index = items.findIndex(item => item.id === id);
    
    if (index !== -1) {
      this.data[table].splice(index, 1);
      this.saveToStorage(table);
      return true;
    }
    
    return false;
  }

  private saveToStorage(table: string) {
    localStorage.setItem(`gts-mock-${table}`, JSON.stringify(this.data[table]));
  }

  // Генераторы данных
  private generateMockUsers(): MockUser[] {
    return [
      {
        id: 'user-1',
        email: 'admin@gts.com',
        role: 'executive',
        name: 'Алексей Управляющий',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        created_at: '2024-01-15T10:00:00Z',
        status: 'active'
      },
      {
        id: 'user-2',
        email: 'partner@gts.com',
        role: 'partner',
        name: 'Мария Партнер',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        created_at: '2024-01-20T14:30:00Z',
        status: 'active'
      },
      {
        id: 'user-3',
        email: 'staff@gts.com',
        role: 'staff',
        name: 'Дмитрий Сотрудник',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        created_at: '2024-02-01T09:15:00Z',
        status: 'active'
      }
    ];
  }

  private generateMockClients(): MockClient[] {
    return [
      {
        id: 'client-1',
        name: 'Сергей Богатов',
        email: 'sergey@example.com',
        phone: '+7 (999) 123-45-67',
        company: 'Tech Innovations Ltd',
        status: 'vip',
        source: 'referral',
        value: 2500000,
        created_at: '2024-11-01T10:00:00Z',
        last_activity: '2024-12-15T14:30:00Z',
        deals: []
      },
      {
        id: 'client-2',
        name: 'Анна Премьер',
        email: 'anna@example.com',
        phone: '+7 (999) 234-56-78',
        company: 'Luxury Events',
        status: 'active',
        source: 'website',
        value: 1800000,
        created_at: '2024-11-05T15:20:00Z',
        last_activity: '2024-12-14T11:45:00Z',
        deals: []
      },
      {
        id: 'client-3',
        name: 'Михаил Новичок',
        email: 'mikhail@example.com',
        phone: '+7 (999) 345-67-89',
        status: 'lead',
        source: 'instagram',
        value: 450000,
        created_at: '2024-12-10T12:00:00Z',
        last_activity: '2024-12-16T16:20:00Z',
        deals: []
      }
    ];
  }

  private generateMockDeals(): MockDeal[] {
    return [
      {
        id: 'deal-1',
        client_id: 'client-1',
        title: 'Корпоративный тур на вертолёте',
        value: 850000,
        status: 'proposal',
        stage: 'Подготовка предложения',
        probability: 75,
        expected_close: '2024-12-25T00:00:00Z',
        created_at: '2024-12-01T10:00:00Z',
        updated_at: '2024-12-16T14:30:00Z',
        activities: []
      },
      {
        id: 'deal-2',
        client_id: 'client-2',
        title: 'Свадебная фотосессия на яхте',
        value: 650000,
        status: 'negotiation',
        stage: 'Согласование деталей',
        probability: 90,
        expected_close: '2024-12-30T00:00:00Z',
        created_at: '2024-11-20T14:15:00Z',
        updated_at: '2024-12-15T16:45:00Z',
        activities: []
      },
      {
        id: 'deal-3',
        client_id: 'client-3',
        title: 'Тест-драйв суперкара',
        value: 125000,
        status: 'qualified',
        stage: 'Квалификация потребности',
        probability: 45,
        expected_close: '2024-12-28T00:00:00Z',
        created_at: '2024-12-10T16:00:00Z',
        updated_at: '2024-12-16T18:20:00Z',
        activities: []
      }
    ];
  }

  private generateMockActivities(): MockActivity[] {
    return [
      {
        id: 'activity-1',
        type: 'call',
        title: 'Звонок клиенту',
        description: 'Обсуждение деталей корпоративного тура',
        date: '2024-12-16T14:30:00Z',
        user_id: 'user-1',
        client_id: 'client-1',
        deal_id: 'deal-1'
      },
      {
        id: 'activity-2',
        type: 'meeting',
        title: 'Встреча в офисе',
        description: 'Презентация услуг и обсуждение бюджета',
        date: '2024-12-15T16:00:00Z',
        user_id: 'user-1',
        client_id: 'client-2',
        deal_id: 'deal-2'
      },
      {
        id: 'activity-3',
        type: 'email',
        title: 'Отправлено коммерческое предложение',
        description: 'КП по аренде вертолёта на 3 дня',
        date: '2024-12-14T11:15:00Z',
        user_id: 'user-1',
        client_id: 'client-1',
        deal_id: 'deal-1'
      }
    ];
  }

  private generateMockBookings(): MockBooking[] {
    return [
      {
        id: 'booking-1',
        client_id: 'client-1',
        service_type: 'helicopter',
        service_name: 'Вертолёт Robinson R66',
        date: '2024-12-25',
        time: '14:00',
        duration: 3,
        status: 'confirmed',
        value: 450000,
        created_at: '2024-12-01T10:00:00Z'
      },
      {
        id: 'booking-2',
        client_id: 'client-2',
        service_type: 'yacht',
        service_name: 'Яхта Princess 58',
        date: '2024-12-30',
        time: '12:00',
        duration: 6,
        status: 'confirmed',
        value: 650000,
        created_at: '2024-11-20T14:15:00Z'
      },
      {
        id: 'booking-3',
        client_id: 'client-3',
        service_type: 'supercar',
        service_name: 'Lamborghini Huracan',
        date: '2024-12-28',
        time: '16:00',
        duration: 2,
        status: 'pending',
        value: 125000,
        created_at: '2024-12-10T16:00:00Z'
      }
    ];
  }

  private generateMockFleet(): MockFleetItem[] {
    return [
      {
        id: 'fleet-1',
        type: 'helicopter',
        name: 'Robinson R66 Turbine',
        model: 'R66',
        year: 2022,
        status: 'booked',
        location: 'Сочи (УРСС)',
        hourly_rate: 150000,
        capacity: 5,
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400&h=300&fit=crop',
        next_booking: '2024-12-25T14:00:00Z',
        maintenance_due: '2025-01-15T00:00:00Z'
      },
      {
        id: 'fleet-2',
        type: 'yacht',
        name: 'Princess 58',
        model: 'Princess Y58',
        year: 2023,
        status: 'available',
        location: 'Марина Сочи',
        hourly_rate: 85000,
        capacity: 12,
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&h=300&fit=crop',
        maintenance_due: '2025-02-01T00:00:00Z'
      },
      {
        id: 'fleet-3',
        type: 'supercar',
        name: 'Lamborghini Huracan',
        model: 'Huracan EVO',
        year: 2024,
        status: 'maintenance',
        location: 'Гараж Сочи',
        hourly_rate: 45000,
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
        maintenance_due: '2024-12-20T00:00:00Z'
      }
    ];
  }

  private generateMockPartners(): MockPartner[] {
    return [
      {
        id: 'partner-1',
        name: 'Отель Rixos Krasnaya Polyana',
        type: 'hotel',
        status: 'active',
        commission_rate: 12,
        total_referrals: 47,
        total_revenue: 2850000,
        contact_email: 'partnerships@rixos.com',
        contact_phone: '+7 (862) 240-40-40',
        created_at: '2024-08-15T10:00:00Z'
      },
      {
        id: 'partner-2',
        name: 'Ресторан White Rabbit',
        type: 'restaurant',
        status: 'active',
        commission_rate: 8,
        total_referrals: 23,
        total_revenue: 1450000,
        contact_email: 'info@whiterabbit-sochi.ru',
        contact_phone: '+7 (862) 555-77-88',
        created_at: '2024-09-01T14:30:00Z'
      },
      {
        id: 'partner-3',
        name: 'Брендинговое агентство CreativeLab',
        type: 'brand',
        status: 'pending',
        commission_rate: 15,
        total_referrals: 5,
        total_revenue: 380000,
        contact_email: 'hello@creativelab.ru',
        contact_phone: '+7 (999) 888-77-66',
        created_at: '2024-11-20T09:15:00Z'
      }
    ];
  }

  private generateMockRevenue(): MockRevenue[] {
    const revenues: MockRevenue[] = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const helicopter = Math.floor(Math.random() * 500000) + 100000;
      const yacht = Math.floor(Math.random() * 400000) + 80000;
      const supercar = Math.floor(Math.random() * 200000) + 30000;
      const experiences = Math.floor(Math.random() * 150000) + 20000;
      
      revenues.push({
        date: dateStr,
        helicopter,
        yacht,
        supercar,
        experiences,
        total: helicopter + yacht + supercar + experiences
      });
    }
    
    return revenues;
  }

  private generateMockWeather(): MockWeatherCondition[] {
    return [
      {
        location: 'Сочи (УРСС)',
        condition: 'good',
        temperature: 12,
        wind_speed: 8,
        visibility: 15,
        restrictions: [],
        updated_at: new Date().toISOString()
      },
      {
        location: 'Марина Сочи',
        condition: 'excellent',
        temperature: 14,
        wind_speed: 5,
        visibility: 20,
        restrictions: [],
        updated_at: new Date().toISOString()
      },
      {
        location: 'Красная Поляна',
        condition: 'fair',
        temperature: 8,
        wind_speed: 12,
        visibility: 10,
        restrictions: ['Ограничения по высоте полёта'],
        updated_at: new Date().toISOString()
      }
    ];
  }
}

// Singleton instance
export const mockDataStore = new MockDataStore();

// Export utilities
export const MockAPI = {
  // Симуляция задержки API
  delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Симуляция ошибок (5% вероятность)
  maybeError: () => {
    if (Math.random() < 0.05) {
      throw new Error('Simulated API error for testing');
    }
  },
  
  // Пагинация - убираем generic типы для совместимости
  paginate: (data: any[], page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;
    return {
      data: data.slice(offset, offset + limit),
      total: data.length,
      page,
      pages: Math.ceil(data.length / limit)
    };
  }
};