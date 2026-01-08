import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth/auth-service';


@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthPage {
  
 @ViewChild('wrapper', { static: false }) 
 wrapperRef!: ElementRef<HTMLElement>;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    codigoEmpleado: ['', Validators.required]
  });

  getErrorMessage(form: FormGroup, controlName: string): string {
  const control = form.get(controlName);
  if (control?.invalid && (control.touched || control.dirty)) {
    if (control.errors?.['required']) return 'Este campo es obligatorio';
    if (control.errors?.['minlength']) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }
  }
  return '';
}

  toggleForms(active: boolean): void {
    const wrapperEl = this.wrapperRef.nativeElement;
    const bgEl = wrapperEl.querySelector('.bg-animate') as HTMLElement;
    // 1. Quito ambas clases
    wrapperEl.classList.remove('active', 'deactive');
    // 2. Forzar reflow para que la animación pueda reiniciarse
    void wrapperEl.offsetWidth;
    // 3. Agregar la clase correspondiente
    wrapperEl.classList.add(active ? 'active' : 'deactive');

    // Limpia clases previas
    bgEl.classList.remove('forma2', 'forma3');

    if (active) {
      // Activar: forma1 → forma2 → forma3
      setTimeout(() => {
        bgEl.classList.add('forma2');
        setTimeout(() => {
          bgEl.classList.add('forma3');
        }, 1000); // ← espera 1.2s para aplicar forma3
      }, 600); // delay inicial
    } else {
      // Desactivar: forma3 → forma2 → forma1
      bgEl.classList.add('forma3');
      setTimeout(() => {
        bgEl.classList.remove('forma3');
        bgEl.classList.add('forma2');
        setTimeout(() => {
          bgEl.classList.remove('forma2');
        }, 1000); // ← espera 1.2s para aplicar forma2
      }, 600); // delay inicial
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: () => this.router.navigateByUrl('/home')
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); 
      return;
    }
    const { username, password, codigoEmpleado } = this.registerForm.value;

    this.authService
      .register({ username: username!, password: password!, codigoEmpleado: codigoEmpleado! })
      .subscribe({
      next: () => {
        this.toggleForms(false);
      }
    });
  }
}


