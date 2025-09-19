import { useCallback } from 'react';
import { mockDataStore, MockAPI } from '../utils/mockData';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  requireAuth?: boolean;
  table?: string;
  query?: any;
}

export function useSupabaseApi() {
  const makeRequest = useCallback(async (endpoint: string, options: ApiRequestOptions = {}) => {
    const {
      method = 'GET',
      body,
      requireAuth = true,
      table,
      query
    } = options;

    console.log(`Mock API: ${method} ${endpoint}`, { body, query });
    
    try {
      // Simulate API delay
      await MockAPI.delay(200 + Math.random() * 300);
      
      // Simulate occasional errors (very rare for demo)
      if (Math.random() < 0.01) { // 1% error rate
        throw new Error('Simulated network error');
      }

      let result;

      switch (method) {
        case 'GET':
          if (table) {
            result = mockDataStore.select(table, query);
          } else {
            // Handle specific endpoint logic
            result = handleGetEndpoint(endpoint, query);
          }
          break;
          
        case 'POST':
          if (table && body) {
            result = mockDataStore.insert(table, body);
          } else {
            result = handlePostEndpoint(endpoint, body);
          }
          break;
          
        case 'PUT':
        case 'PATCH':
          if (table && body && body.id) {
            result = mockDataStore.update(table, body.id, body);
          } else {
            result = handleUpdateEndpoint(endpoint, body);
          }
          break;
          
        case 'DELETE':
          if (table && body?.id) {
            result = mockDataStore.delete(table, body.id);
          } else {
            result = handleDeleteEndpoint(endpoint, body);
          }
          break;
          
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return {
        success: true,
        data: result,
        demo: true
      };
      
    } catch (error) {
      console.error('Mock API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        demo: true
      };
    }
  }, []);

  // Handle specific GET endpoints
  const handleGetEndpoint = (endpoint: string, query?: any) => {
    switch (endpoint) {
      case '/crm/clients':
        return mockDataStore.select('clients', query);
      case '/crm/deals':
        return mockDataStore.select('deals', query);
      case '/crm/activities':
        return mockDataStore.select('activities', query);
      case '/bookings':
        return mockDataStore.select('bookings', query);
      case '/fleet':
        return mockDataStore.select('fleet', query);
      case '/partners':
        return mockDataStore.select('partners', query);
      case '/analytics/revenue':
        return mockDataStore.select('revenue', query);
      case '/weather/conditions':
        return mockDataStore.select('weather', query);
      case '/users':
        return mockDataStore.select('users', query);
      default:
        return [];
    }
  };

  // Handle specific POST endpoints
  const handlePostEndpoint = (endpoint: string, body: any) => {
    switch (endpoint) {
      case '/crm/clients':
        return mockDataStore.insert('clients', body);
      case '/crm/deals':
        return mockDataStore.insert('deals', body);
      case '/crm/activities':
        return mockDataStore.insert('activities', body);
      case '/bookings':
        return mockDataStore.insert('bookings', body);
      default:
        return { id: `generated-${Date.now()}`, ...body };
    }
  };

  // Handle UPDATE endpoints
  const handleUpdateEndpoint = (endpoint: string, body: any) => {
    const id = body.id;
    if (endpoint.includes('/crm/clients/')) {
      return mockDataStore.update('clients', id, body);
    }
    if (endpoint.includes('/crm/deals/')) {
      return mockDataStore.update('deals', id, body);
    }
    if (endpoint.includes('/bookings/')) {
      return mockDataStore.update('bookings', id, body);
    }
    return body;
  };

  // Handle DELETE endpoints
  const handleDeleteEndpoint = (endpoint: string, body: any) => {
    const id = body?.id || endpoint.split('/').pop();
    if (endpoint.includes('/crm/clients/')) {
      return mockDataStore.delete('clients', id);
    }
    if (endpoint.includes('/crm/deals/')) {
      return mockDataStore.delete('deals', id);
    }
    return true;
  };

  // Convenience methods with mock data support
  const get = useCallback((endpoint: string, requireAuth = true, query?: any) => 
    makeRequest(endpoint, { method: 'GET', requireAuth, query }), [makeRequest]);
  
  const post = useCallback((endpoint: string, body?: any, requireAuth = true) => 
    makeRequest(endpoint, { method: 'POST', body, requireAuth }), [makeRequest]);
  
  const put = useCallback((endpoint: string, body?: any, requireAuth = true) => 
    makeRequest(endpoint, { method: 'PUT', body, requireAuth }), [makeRequest]);
  
  const del = useCallback((endpoint: string, body?: any, requireAuth = true) => 
    makeRequest(endpoint, { method: 'DELETE', body, requireAuth }), [makeRequest]);

  // Direct data access for components that need immediate data
  const selectTable = useCallback((table: string, query?: any) => {
    return mockDataStore.select(table, query);
  }, []);

  const insertIntoTable = useCallback((table: string, data: any) => {
    return mockDataStore.insert(table, data);
  }, []);

  const updateInTable = useCallback((table: string, id: string, data: any) => {
    return mockDataStore.update(table, id, data);
  }, []);

  const deleteFromTable = useCallback((table: string, id: string) => {
    return mockDataStore.delete(table, id);
  }, []);

  return {
    makeRequest,
    get,
    post,
    put,
    delete: del,
    // Direct data access methods
    selectTable,
    insertIntoTable,
    updateInTable,
    deleteFromTable,
    // Utility
    isDemoMode: () => true,
  };
}

export default useSupabaseApi;