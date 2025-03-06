import { Component , EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import {Post, Media} from '../../models/posts.model';
import { HomeService } from '../../services/home/home.service';


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzInputModule, NzUploadModule, NzIconModule, NgZorroAntdModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  @Output() postCreated = new EventEmitter<Post>();
  newPostContent: string = '';
  fileList: NzUploadFile[] = [];
  // selectedFiles: File[] = [];
  isSpinning:boolean = true

constructor(private homeService: HomeService) {}

  handleFileChange(event: any) {
    this.fileList = event.fileList;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [...this.fileList, file];
    return false; 
  };

  // createPost() {


  //   if (!this.postText && this.fileList.length === 0) return;

  //   console.log()

  //   const newPost: Post = {
  //     id: Math.random().toString(36).substr(2, 9), // Random unique ID
  //     userId: 'user123',
  //     username: 'John Doe',
  //     profilePicture: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', 
  //     content: 'Loving this beautiful view!',
  //     media: [
  //       {
  //         url: 'https://ik.imagekit.io/imageHUB/media/humberto-arellano-N_G2Sqdy9QY-unsplash_NYPhBKYG7.jpg', 
  //         type: 'image',
  //         dimensions: { width: 600, height: 400 }
  //       }
  //     ],
  //     postType: 'image',
  //     visibility: 'public',
  //     createdAt: new Date(),
  //     engagement: {
  //       likes: 120,
  //       comments: 34,
  //       shares: 15,
  //       views: 500,
  //       saves: 10,
  //       reposts: 5,
  //       reactions: [
  //         { userId: 'user456', type: 'like', createdAt: new Date() },
  //         { userId: 'user789', type: 'love', createdAt: new Date() }
  //       ]
  //     },
  //     comments: [
  //       {
  //         id: Math.random().toString(36).substr(2, 9),
  //         userId: 'user456',
  //         username: 'Jane Smith',
  //         profilePicture: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         content: 'Wow! This looks amazing! 😍',
  //         createdAt: new Date(),
  //         likes: 10,
  //         replies: [],
  //         isEdited: false
  //       }
  //     ],
  //     isEdited: false,
  //     status: 'active'
  //   };

  //   this.postCreated.emit(newPost);
  //   this.postText = '';
  //   this.fileList = [];
  // }

  // createPost(): void {
  //   if (!this.newPostContent && this.fileList.length === 0) return;
  //   this.isSpinning = true;

  //   // Construct media array
  //   const media: Media[] = this.fileList.map((file: any) => ({
  //     url: '', // Backend should provide the actual URL after upload
  //     type: file.type.startsWith('image') ? 'image' : 'video', // Detect type
  //   }));

  //   const formData = new FormData();
  //   formData.append('content', this.newPostContent);
  //   this.fileList.forEach((file: any) => formData.append('media', file));
  //   // this.fileList.forEach((file: any) => formData.append('media', file.originFileObj));
  //   const request = {
  //     method: 'POST',
  //     action_url: '/v1/post/createPost',
  //     params: formData,
  //   };
  //   console.log(this.newPostContent);
  //   console.log(this.fileList);
  //   this.homeService.createPost(request).subscribe({
  //     next: (response) => {
  //       // this.posts.unshift(response.body); // Add new post at the top
  //       this.postCreated.emit(response.body);
  //       this.newPostContent = '';
  //       this.fileList = [];
  //       this.isSpinning = false;
  //     },
  //     error: (error) => {
  //       console.error('Failed to create post:', error);
  //       this.isSpinning = false;
  //     },
  //   });
  // }



  createPost(): void {
    if (!this.newPostContent && this.fileList.length === 0) return;
    this.isSpinning = true;
  
    // Generate a unique post ID (Backend may override this)
    const postId = Math.random().toString(36).substr(2, 9);
  
    // Construct media array
    const media: Media[] = this.fileList.map((file: any) => ({
      url: '', // Backend should provide the actual URL after upload
      type: file.type.startsWith('image') ? 'image' : 'video', // Detect type
    }));
  
    // Construct the post object
    const newPost: Post = {
      id: postId,
      userId: 'user123',
      username: 'John Doe',
      profilePicture: 'https://example.com/profile.jpg',
      content: this.newPostContent,
      media: media,
      //postType: media.length > 0 ? media[0].type : 'text',
      visibility: 'public', // Change based on user selection
      createdAt: new Date(),
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        saves: 0,
        reposts: 0,
        reactions: [],
        reactionCount: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      },
      comments: [],
      isEdited: false,
      status: 'active',
      postType: 'image'
    };
  
    // Send the post to the backend
    const formData = new FormData();
    formData.append('newPost', JSON.stringify(newPost));
    this.fileList.forEach((file: any) => formData.append('media', file));

    const request = {
      method: 'POST',
      action_url: '/v1/post/createPost',
      params: formData,
    };
  
    this.homeService.createPost(request).subscribe({
      next: (response) => {
        this.postCreated.emit(response.body); // Use response from backend
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
