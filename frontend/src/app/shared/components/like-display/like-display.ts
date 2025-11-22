import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-like-display',
  imports: [],
  templateUrl: './like-display.html',
  styleUrl: './like-display.scss',
})
export class LikeDisplay {
@Input() likes: number = 0
}
