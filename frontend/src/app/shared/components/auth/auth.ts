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

  constructor(private auth: AuthService) {}

  async submit() {
    try {
      if (this.mode === 'register') {
        const user = await this.auth.signUp(this.email, this.password);
        alert('User registered: ' + user!.id);
      } else {
        const user = await this.auth.signIn(this.email, this.password);
        alert('Logged in as: ' + user!.id);
      }
      // Nach Login/Register evtl. weiterleiten oder Feed laden
    } catch (e: any) {
      alert(e.message || e);
    }
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }
}
