// Placeholder for API service

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
    auth: {
        login: async (credentials) => {
            // return fetch(`${API_URL}/auth/login`, ...).then(res => res.json());
            console.log('API Login:', credentials);
            return Promise.resolve({ user: { name: 'Test User' }, token: 'mock-token' });
        },
        register: async (userData) => {
            console.log('API Register:', userData);
            return Promise.resolve({ success: true });
        }
    },
    hospitals: {
        getAll: async () => {
            // return fetch(`${API_URL}/hospitals`).then(...)
            return Promise.resolve([]);
        },
        bookBed: async (bookingDetails) => {
            console.log('API Book Bed:', bookingDetails);
            return Promise.resolve({ success: true, bookingId: '123' });
        }
    }
};
