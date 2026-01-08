import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth-service';
import { RouterModule, Router } from '@angular/router'; 
import { AuthState } from '@core/auth/auth-state';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {

  private authService = inject(AuthService);
  readonly authState = inject(AuthState);
  private router = inject(Router);
  userMenuOpen = false;


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}