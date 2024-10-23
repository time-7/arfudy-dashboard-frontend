import io from 'socket.io-client';

export const socketOrder = io('https://arfudy-nestjs-backend.onrender.com/');

export const socketTable = io('https://arfudy-nestjs-backend.onrender.com/');
