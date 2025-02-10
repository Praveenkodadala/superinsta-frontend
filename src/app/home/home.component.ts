import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { HomeService } from '../services/home/home.service';
import { Post, Media } from '../models/posts.model';
import { NewPostComponent } from '../features/new-post/new-post.component';
import { PostComponent } from '../features/post/post.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgZorroAntdModule, CommonModule, FormsModule, NzSpinModule, NzListModule, NewPostComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})


export class HomeComponent implements OnInit {
 
  posts: Post[] = [];

  ngOnInit() {}

  addNewPost(newPost: Post) {
    this.posts.unshift(newPost); // Add to the beginning of the array
  }

}



