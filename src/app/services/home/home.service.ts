import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private httpService: HttpService,
    private socketService: SocketService
  ) {}


  getPosts(request: any): Observable<any> {
    return this.httpService.doHttpJson(request);
  }

  listenForNewPosts(callback: (post: any) => void): void {
    this.socketService.listen('newPost', callback);
  }


  createPost(request: any): Observable<any> {
    return this.httpService.doHttpJson(request);
  }

  uploadMedia(formData: FormData): Observable<any> {
    const request = {
      method: 'POST',
      action_url: '/upload-media',
      params: formData,
    };
    return this.httpService.doHttpFormData(request);
  }

 // Like a post
 likePost(postId: string): Observable<any> {
  const request = {
    method: 'POST',
    action_url: `/posts/${postId}/like`,
    params: {},
  };
  return this.httpService.doHttpJson(request);
}

addComment(postId: string, comment: string): Observable<any> {
  const request = {
    method: 'POST',
    action_url: `/posts/${postId}/comment`,
    params: { comment },
  };
  return this.httpService.doHttpJson(request);
}
}
