import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <--- WICHTIG für *ngIf
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss'],
  imports: [FormsModule, CommonModule], // <--- CommonModule hier hinzufügen
})
export class CreatePost {
  file: File | null = null;
  caption = '';
  isLoading = false;

  constructor(private sb: SupabaseService) {}

  // Diese Methode hat gefehlt:
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    // Prüfen ob Dateien vorhanden sind und die erste nehmen
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  async createPost() {
    if (!this.file) {
      alert('Bitte wähle erst ein Bild aus!');
      return;
    }

    this.isLoading = true;

    try {
      const currentUser = await this.sb.getCurrentUser();
      if (!currentUser) {
        alert('Bitte logge dich erst ein.');
        this.isLoading = false;
        return;
      }

      // 1. Bild hochladen
      const { publicUrl } = await this.sb.uploadImage(this.file, currentUser.id);

      // 2. Post in DB speichern
      await this.sb.insertPost(currentUser.id, publicUrl, this.caption);

      alert('Post erfolgreich erstellt!');

      // Reset Formular
      this.file = null;
      this.caption = '';

      // Optional: Input Feld im HTML resetten (etwas komplexer in Angular, aber file = null reicht für die Logik)
    } catch (err: any) {
      console.error(err);
      alert('Fehler: ' + (err.message || err));
    } finally {
      this.isLoading = false;
    }
  }
}
