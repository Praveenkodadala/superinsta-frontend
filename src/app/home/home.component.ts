import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { HomeService } from '../services/home/home.service';
import { PostService } from '../services/post/post.service';
import { NewPostComponent } from '../features/new-post/new-post.component';
import { PostComponent } from '../features/post/post.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    NzSpinModule,
    NzListModule,
    NewPostComponent,
    PostComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  isPosting = false;
  isSpinning = false;

  limit = 10;
  maxPosts = 11;
  cursorTop?: string;
  cursorBottom?: string;
  allOldLoaded = false;
  allNewLoaded = false;
  isFetchingOlder = false;
  isFetchingNewer = false;
  scrollTimeout: any = null;

  constructor(private homeService: HomeService, private postService: PostService) {}

  ngOnInit() {
    this.loadInitialPosts();

    // Listening for new posts in real-time
    this.postService.listenForNewPosts((newPost: any) => {
      this.posts.unshift(newPost);
      this.cursorTop = newPost.createdAt;
      this.isPosting = false;

      if (this.posts.length > this.maxPosts) {
        this.posts = this.posts.slice(0, this.maxPosts);
      }
    });
  }

  handlePostStatus(isPosting: boolean) {
    this.isPosting = isPosting;
  }

  async loadInitialPosts() {
    this.isSpinning = true;

    try {
      const cursor = this.cursorBottom ? this.cursorBottom : null;
      console.log("cursorBottom here check load initials", cursor);
      const response = await this.postService.getPaginatedPosts({
        method: 'GET',
        action_url: `/v1/post/getPaginatedPosts?limit=${this.limit}&direction=older&cursor=${cursor}`
      }).toPromise();

      console.log(  response?.body?.status, response.body.data.length);
      if (response?.body?.status && response.body.data.length > 0) {
        this.posts = response.body.data;
        this.cursorBottom = this.posts[this.posts.length - 1].createdAt;
        this.cursorTop = this.posts[0].createdAt;
      } else {
        this.allOldLoaded = true;
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      this.isSpinning = false;
    }
  }

  async loadOlderPosts() {

    console.log("cursorBottom here dfdfdf", this.cursorBottom);
    if (this.isFetchingOlder || this.allOldLoaded) return;
    this.isFetchingOlder = true;

    try {
      const response = await this.postService.getPaginatedPosts({
        method: 'GET',
        action_url: `/v1/post/getPaginatedPosts?limit=${this.limit}&direction=older&cursor=${this.cursorBottom}`


      }).toPromise();

      const olderPosts = response?.body?.data || [];

      if (olderPosts.length > 0) {
        this.posts = [...this.posts, ...olderPosts];
        this.cursorBottom = olderPosts[olderPosts.length - 1].createdAt;
        console.log("cursorBottom here", this.cursorBottom);
      } else {
        this.allOldLoaded = true;
      }

      if (this.posts.length > this.maxPosts) {
        this.posts = this.posts.slice(-this.maxPosts);
      }
    } catch (error) {
      console.error('Error loading older posts:', error);
    } finally {
      this.isFetchingOlder = false;
    }
  }

  async loadNewerPosts() {
    if (this.isFetchingNewer || this.allNewLoaded) return;
    this.isFetchingNewer = true;

    try {
      const response = await this.postService.getPaginatedPosts({
        method: 'GET',
        action_url: `/v1/post/getPaginatedPosts?limit=${this.limit}&direction=newer&cursor=${this.cursorTop}`
      }).toPromise();

      const newerPosts = response?.body?.data || [];

      if (newerPosts.length > 0) {
        this.posts = [...newerPosts, ...this.posts];
        this.cursorTop = newerPosts[0].createdAt;
      } else {
        this.allNewLoaded = true;
      }

      if (this.posts.length > this.maxPosts) {
        this.posts = this.posts.slice(0, this.maxPosts);
      }
    } catch (error) {
      console.error('Error loading newer posts:', error);
    } finally {
      this.isFetchingNewer = false;
    }
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      ) {
        this.loadOlderPosts();
      }
    }, 300); // Delays execution by 300ms
  }
}
