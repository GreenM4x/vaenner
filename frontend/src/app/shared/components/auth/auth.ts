import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  imports: [FormsModule],
})
export class Auth {
  mode: 'login' | 'register' = 'login';
  email = '';
  password = '';
  username = ''; // NEU

  constructor(private auth: AuthService) {}

  async submit() {
    try {
      if (this.mode === 'register') {
        // Username übergeben
        await this.auth.signUp(this.email, this.password, this.username);
        alert('Registriert! Bitte einloggen.');
        this.mode = 'login';
      } else {
        await this.auth.signIn(this.email, this.password);
        alert('Eingeloggt');
      }
    } catch (e: any) {
      alert(e.message);
    }
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }
}
