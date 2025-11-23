import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss'],
  imports: [FormsModule],
})
export class CreatePost {
  file: File | null = null;
  caption = '';

  constructor(private sb: SupabaseService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files && input.files[0] ? input.files[0] : null;
  }

  async createPost() {
    if (!this.file) {
      alert('Bitte wähle eine Datei aus.');
      return;
    }

    try {
      // 1️⃣ Aktuellen User abrufen
      const currentUser = await this.sb.getCurrentUser();
      if (!currentUser) {
        alert('Bitte zuerst einloggen.');
        return;
      }

      console.log('Aktueller User:', currentUser.id);

      // 2️⃣ Bild hochladen
      const { publicUrl } = await this.sb.uploadImage(this.file, currentUser.id);
      console.log('Storage Upload erfolgreich:', publicUrl);

      // 3️⃣ Post in Tabelle "posts" einfügen
      const inserted = await this.sb.insertPost(currentUser.id, publicUrl, this.caption);
      console.log('DB Insert erfolgreich:', inserted);

      alert('Post erfolgreich erstellt!');
      this.file = null;
      this.caption = '';
    } catch (err: any) {
      console.error('Fehler beim Erstellen des Posts:', err);
      alert('Fehler: ' + (err.message || err));
    }
  }
}
