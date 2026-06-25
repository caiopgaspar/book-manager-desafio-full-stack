import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.toastr.error('Please fill in all fields');
      return;
    }

    this.loading = true;
    this.authService.register(this.user).subscribe({
      next: () => {
        this.toastr.success('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error(error.error?.message || 'Error registering user');
      }
    });
  }
}
