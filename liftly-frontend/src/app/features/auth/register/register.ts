import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthMockService } from '../../../core/services/mock/auth-mock.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthMockService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  isLoading = false;
  errorMessage = '';

  passwordMatchValidator(g: any) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.notificationService.showSuccess('Registration successful!');
          this.router.navigate(['/calendar']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Registration failed. Please try again.';
          this.notificationService.showError('Registration failed. Please check your details.');
          this.isLoading = false;
        }
      });
    }
  }
}
