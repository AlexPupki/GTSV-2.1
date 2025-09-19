// Универсальный адаптер для замены Supabase
interface DatabaseAdapter {
  // Auth methods
  signIn(email: string, password: string): Promise<{ user: any; session: any }>;
  signUp(email: string, password: string): Promise<{ user: any; session: any }>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<any>;
  
  // Data methods
  select(table: string, query?: any): Promise<any[]>;
  insert(table: string, data: any): Promise<any>;
  update(table: string, id: string, data: any): Promise<any>;
  delete(table: string, id: string): Promise<void>;
  
  // Real-time subscriptions
  subscribe(table: string, callback: (data: any) => void): () => void;
}

// Supabase implementation
export class SupabaseAdapter implements DatabaseAdapter {
  // ... Supabase-specific code
}

// Mock implementation for development
export class MockAdapter implements DatabaseAdapter {
  private mockData = new Map<string, any[]>();
  
  async signIn(email: string, password: string) {
    // Mock auth
    return {
      user: { id: '1', email, role: 'executive' },
      session: { access_token: 'mock-token' }
    };
  }
  
  async select(table: string, query?: any) {
    return this.mockData.get(table) || [];
  }
  
  // ... other mock methods
}

// Firebase implementation (будущее)
export class FirebaseAdapter implements DatabaseAdapter {
  // ... Firebase-specific code
}

// Factory для создания нужного адаптера
export const createDatabaseAdapter = (): DatabaseAdapter => {
  const provider = process.env.REACT_APP_DATABASE_PROVIDER || 'supabase';
  
  switch (provider) {
    case 'supabase':
      return new SupabaseAdapter();
    case 'firebase':
      return new FirebaseAdapter();
    case 'mock':
      return new MockAdapter();
    default:
      throw new Error(`Unknown database provider: ${provider}`);
  }
};