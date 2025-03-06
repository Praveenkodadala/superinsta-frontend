import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { Post, Media } from '../../models/posts.model';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzInputModule, NzUploadModule, NzIconModule, NgZorroAntdModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  newPostContent: string = '';
  fileList: NzUploadFile[] = [];
  isSpinning: boolean = false;

  constructor(private homeService: HomeService) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [...this.fileList, file];
    return false; 
  };

  createPost(): void {
    if (!this.newPostContent && this.fileList.length === 0) return;
    this.isSpinning = true;

    // Construct media array
    const media: Media[] = this.fileList.map((file: any) => ({
      url: '', // Backend should provide the actual URL after upload
      type: file.type.startsWith('image') ? 'image' : 'video',
    }));

    const newPost: any = {
      id: Math.random().toString(36).substr(2, 9),
       
      // username: 'John Doe',
      // profilePicture: 'https://example.com/profile.jpg',
      content: this.newPostContent,
      media: media,
      visibility: 'public',
      createdAt: new Date(),
      engagement: {
        likes: 0, comments: 0, shares: 0, views: 0, saves: 0, reposts: 0,
        reactions: [],
        reactionCount: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      },
      comments: [],
      isEdited: false,
      status: 'active',
      postType: 'text',
    };

    const formData = new FormData();
    formData.append('newPost', JSON.stringify(newPost));
    this.fileList.forEach((file: any) => formData.append('media', file));

    const request = {
      method: 'POST',
      action_url: '/v1/post/createPost',
      params: formData,
    };

    this.homeService.createPost(request).subscribe({
      next: () => {
        this.newPostContent = '';
        this.fileList = [];
        this.isSpinning = false;
      },
      error: (error) => {
        console.error('Failed to create post:', error);
        this.isSpinning = false;
      },
    });
  }
}
