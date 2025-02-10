import { Component , EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import {Post, Media} from '../../models/posts.model';
let image  =  '../../../assets/GjcfMxFXYAEy6Z5.jpg'


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzInputModule, NzUploadModule, NzIconModule, NgZorroAntdModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  @Output() postCreated = new EventEmitter<Post>();
  postText: string = '';
  fileList: NzUploadFile[] = [];


  handleFileChange(event: any) {
    this.fileList = event.fileList;
  }

  beforeUpload(file: NzUploadFile): boolean {
    return false;
  }

  createPost() {
    if (!this.postText && this.fileList.length === 0) return;

 

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9), // Random unique ID
      userId: 'user123',
      username: 'John Doe',
      profilePicture: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', 
      content: 'Loving this beautiful view!',
      media: [
        {
          url: 'https://ik.imagekit.io/imageHUB/media/humberto-arellano-N_G2Sqdy9QY-unsplash_NYPhBKYG7.jpg', 
          type: 'image',
          dimensions: { width: 600, height: 400 }
        }
      ],
      postType: 'image',
      visibility: 'public',
      createdAt: new Date(),
      engagement: {
        likes: 120,
        comments: 34,
        shares: 15,
        views: 500,
        saves: 10,
        reposts: 5,
        reactions: [
          { userId: 'user456', type: 'like', createdAt: new Date() },
          { userId: 'user789', type: 'love', createdAt: new Date() }
        ]
      },
      comments: [
        {
          id: Math.random().toString(36).substr(2, 9),
          userId: 'user456',
          username: 'Jane Smith',
          profilePicture: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'Wow! This looks amazing! 😍',
          createdAt: new Date(),
          likes: 10,
          replies: [],
          isEdited: false
        }
      ],
      isEdited: false,
      status: 'active'
    };

    this.postCreated.emit(newPost);
    this.postText = '';
    this.fileList = [];
  }
}
