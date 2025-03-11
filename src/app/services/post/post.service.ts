import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpService: HttpService,
    private socketService: SocketService
  ) { }

  createPost(request: any): Observable<any> {
    return this.httpService.doHttpFormData(request);
  }
  listenForNewPosts(callback: (post: any) => void): void {
    this.socketService.listen('newPost', callback);
  }
  getPosts(request: any): Observable<any> {
    return this.httpService.doHttpJson(request);
  }
  getPaginatedPosts(request: any): Observable<any> {
    console.log("request to send to be", request);
    return this.httpService.doHttpJson(request);
  }
}
