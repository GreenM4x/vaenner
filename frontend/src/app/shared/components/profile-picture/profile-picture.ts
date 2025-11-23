import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.html',
  styleUrls: ['./profile-picture.scss'],
  imports: [],
})
export class ProfilePicture implements OnChanges {
  @Input() user: string = 'User';
  @Input() imageUrl?: string;

  displaySrc: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (this.imageUrl) {
      this.displaySrc = this.imageUrl;
    } else {
      this.setFallback();
    }
  }

  handleError() {
    if (this.displaySrc !== this.getFallbackUrl()) {
      this.setFallback();
    } else {
      this.displaySrc = null;
    }
  }

  private setFallback() {
    this.displaySrc = this.getFallbackUrl();
  }

  private getFallbackUrl(): string {
    const avatar = createAvatar(thumbs, {
      seed: this.user,
    });

    const svg = avatar.toString();
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}
