import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { LoginComponent } from './features/login/login.component';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { BookFormComponent } from './features/books/book-form/book-form.component';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'books',
    component: BookListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'books/create',
    component: BookFormComponent,
    canActivate: [authGuard]
  },

  {
    path: 'books/:id/edit',
    component: BookFormComponent,
    canActivate: [authGuard]
  },

  // Redirects
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
