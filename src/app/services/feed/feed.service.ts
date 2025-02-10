import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpService: HttpService, private socketService: SocketService) {}

  // Fetch latest posts
  getFeed(request:any): Observable<any> {
    return this.httpService.doHttpJson(request);
  }

  // Create a new post
  createPost(postData: any): Observable<any> {
    return this.httpService.doHttpJson({ method: 'POST', action_url: '/posts', params: postData });
  }

  // Listen for real-time new posts
  listenForNewPosts(callback: (post: any) => void): void {
    this.socketService.listen('newPost', callback);
  }

  // Emit a new post creation event
  emitNewPost(postData: any): void {
    this.socketService.emit('createPost', postData);
  }
}
