import { Component, Input } from '@angular/core';
import { ProfilePicture } from '../profile-picture/profile-picture';
import { LikeDisplay } from '../like-display/like-display';
import { Ipost } from '../../model/post.model';

@Component({
  selector: 'app-post-component',
  imports: [ProfilePicture, LikeDisplay],
  templateUrl: './postComponent.html',
  styleUrl: './postComponent.scss',
})
export class PostComponent {
  @Input() post!: Ipost;
}
