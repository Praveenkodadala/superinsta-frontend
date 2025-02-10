import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {Post}from '../../models/posts.model'
import { NzButtonModule } from 'ng-zorro-antd/button';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzAvatarModule, NzButtonModule, NzIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: Post;
 
}



