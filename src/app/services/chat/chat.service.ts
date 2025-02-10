import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpService: HttpService, private socketService: SocketService) {}

  // Fetch chat history
  getChatHistory(userId: string): Observable<any> {
    return this.httpService.doHttpJson({ method: 'GET', action_url: `/chats/${userId}` });
  }

  // Send a chat message
  sendMessage(messageData: any): void {
    this.socketService.emit('sendMessage', messageData);
  }

  // Listen for incoming messages
  listenForMessages(callback: (message: any) => void): void {
    this.socketService.listen('receiveMessage', callback);
  }

  // Notify typing status
  notifyTyping(userId: string): void {
    this.socketService.emit('typing', { userId });
  }

  // Listen for typing status
  listenForTyping(callback: (data: any) => void): void {
    this.socketService.listen('userTyping', callback);
  }
}
