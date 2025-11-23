import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../../shared/components/post-component/postComponent';
import { Ipost } from '../../shared/model/post.model';
import { SupabaseService } from '../../shared/services/supabase.service';

@Component({
  selector: 'app-feed-container',
  imports: [PostComponent],
  templateUrl: './feed-container.html',
  styleUrl: './feed-container.scss',
})
export class FeedContainer implements OnInit {
  postArray: Ipost[] = [];

  constructor(private sb: SupabaseService) {}

  ngOnInit() {
    this.loadFeed();
  }

  async loadFeed() {
    try {
      const data = await this.sb.getFeed();

      // Mapping: Supabase Antwort (snake_case) -> Dein Interface (camelCase)
      if (data) {
        this.postArray = data.map((post: any) => ({
          user: {
            // Wegen dem Join ist 'profiles' ein Objekt im Post
            name: post.profiles?.username || 'Unbekannt',
            profileUrl: post.profiles?.avatar_url || '',
          },
          caption: post.caption,
          imageUrl: post.image_url, // Achte darauf, wie es in der DB heißt (image_url vs imageUrl)
          likes: post.likes || 0,
        }));
      }
    } catch (error) {
      console.error('Fehler beim Laden des Feeds:', error);
    }
  }
}
