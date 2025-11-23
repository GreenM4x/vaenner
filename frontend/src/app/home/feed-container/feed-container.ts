import { Component } from '@angular/core';
import { PostComponent } from '../../shared/components/post-component/postComponent';
import { Ipost } from '../../shared/model/post.model';

@Component({
  selector: 'app-feed-container',
  imports: [PostComponent],
  templateUrl: './feed-container.html',
  styleUrl: './feed-container.scss',
})
export class FeedContainer {
  // Updated to match the new 'Post' interface
  postArray: Ipost[] = [
    {
      user: {
        name: 'Max',
        profileUrl: 'https://i.pravatar.cc/150?u=max',
        gender: 'male',
      },
      caption: 'Refactoring the Angular structure to use dedicated models folder!',
      imageUrl: 'https://picsum.photos/id/237/500/500',
      likes: 60,
    },
    {
      user: {
        name: 'Lucas',
        profileUrl: '',
        gender: 'female',
      },
      caption: 'Testing the fallback logic for the profile picture.',
      imageUrl: 'https://picsum.photos/id/10/500/500',
      likes: 65,
    },
    {
      user: {
        name: 'Felix',
        profileUrl: '',
        gender: 'other',
      },
      caption: 'Look at this broken image link! The fallback works perfectly.',
      imageUrl: 'https://picsum.photos/id/12/500/500',
      likes: 8,
    },
    {
      user: {
        name: 'Bob123',
        profileUrl: '',
        gender: 'male',
      },
      caption: 'Almost weekend time! 🎉',
      imageUrl: 'broken-image.png',
      likes: 69,
    },
  ];
}
