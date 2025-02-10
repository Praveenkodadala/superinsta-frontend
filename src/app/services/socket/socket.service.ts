import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  connect(): void {
    if (!this.socket) {
      this.socket = io(environment.SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 5000,
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket Connected');
        this.emit('userConnected', { userId: localStorage.getItem('userId') });
      });

      this.socket.on('disconnect', () => {
        console.log('🔴 Socket Disconnected');
      });
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined!;
    }
  }

  emit(event: string, data: any): void {
    this.socket?.emit(event, data);
  }

  listen(event: string, callback: (data: any) => void): void {
    this.socket?.on(event, callback);
  }
}
