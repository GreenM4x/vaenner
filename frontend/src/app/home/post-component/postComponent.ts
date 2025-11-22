import { Component, Input } from '@angular/core';
import { ProfilePicture } from '../../shared/components/profile-picture/profile-picture';
import { LikeDisplay } from '../../shared/components/like-display/like-display';
import { Ipost } from '../../shared/model/post.model';

@Component({
  selector: 'app-post-component',
  imports: [ProfilePicture, LikeDisplay],
  templateUrl: './postComponent.html',
  styleUrl: './postComponent.scss',

})
export class PostComponent {
  @Input() post!: Ipost;
}
