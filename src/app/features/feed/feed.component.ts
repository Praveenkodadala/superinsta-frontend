import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for Angular directives
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { FeedService } from '../../services/feed/feed.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule,FormsModule, NgZorroAntdModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  newPostContent: string = '';

  constructor(
    private feedService: FeedService
  ) {}

  ngOnInit() {
    this.feedService.listenForNewPosts((post) => {
      this.posts.unshift(post);
    });
  }

  // loadFeed() {
  //   this.feedService.getFeed({ method: 'GET', action_url: '/posts'}).subscribe((data) => {
  //     this.posts = data;
  //   });
  // }

  loadFeed() {
    // Temporary mock posts
    this.posts = [
      {
        id: 1,
        username: 'John Doe',
        text: 'Enjoying the weekend!',
        imageUrl: 'https://source.unsplash.com/random/400x300?nature',
        videoUrl: '',
        likes: 10
      },
      {
        id: 2,
        username: 'Jane Smith',
        text: 'Loving my new camera!',
        imageUrl: '',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        likes: 25
      },
      {
        id: 3,
        username: 'Alice Johnson',
        text: 'Just finished a great workout! 💪',
        imageUrl: 'https://source.unsplash.com/random/400x300?fitness',
        videoUrl: '',
        likes: 8
      }
    ];
  }

  createPost() {
    if (!this.newPostContent.trim()) return;
    const newPost = {
      id: this.posts.length + 1,
      username: 'You',
      text: this.newPostContent,
      imageUrl: '',
      videoUrl: '',
      likes: 0
    };

    // Add new post at the top
    this.posts.unshift(newPost);

    // Clear input
    this.newPostContent = '';
  }

  // createPost() {
  //   if (!this.newPostContent.trim()) return;
  //   const newPost = { text: this.newPostContent, imageUrl: '', videoUrl: '' };
  //   this.feedService.createPost(newPost).subscribe(() => {
  //   //  this.loadFeed();
  //     this.newPostContent = '';
  //   });
  // }

  // likePost(postId: string) {
  //   this.feedService.likePost( { method: 'GET', action_url: '/posts', params:postId}).subscribe(() => {
  //     this.loadFeed();
  //   });
  // }

  // commentOnPost(postId: string) {
  //   console.log('Comment on post:', postId);
  // }

  // sharePost(postId: string) {
  //   console.log('Share post:', postId);
  // }


}
