// Placeholder for Socket.io connection

// import io from 'socket.io-client';

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// let socket;

export const socketService = {
    connect: () => {
        // socket = io(SOCKET_URL);
        // socket.on('connect', () => console.log('Connected to socket'));
        console.log('Socket Service: Connected to mock socket');
    },
    disconnect: () => {
        // if (socket) socket.disconnect();
        console.log('Socket Service: Disconnected');
    },
    onBedUpdate: (callback) => {
        // if (socket) socket.on('bed-update', callback);
        // Mock update every 10 seconds for testing
        setInterval(() => {
            const mockUpdate = { hospitalId: 1, beds: Math.floor(Math.random() * 10) };
            console.log('Socket Mock Update:', mockUpdate);
            callback(mockUpdate);
        }, 10000);
    }
};
