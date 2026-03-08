import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(c => c.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(c => c.Register) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/shell/shell').then(c => c.Shell),
    children: [
      { path: 'calendar', loadComponent: () => import('./features/calendar/calendar').then(c => c.Calendar) },
      { path: 'training', loadComponent: () => import('./features/training/template-list/template-list').then(c => c.TemplateList) },
      { path: 'training/create', loadComponent: () => import('./features/training/create-template/create-template').then(c => c.CreateTemplate) },
      { path: 'weight', loadComponent: () => import('./features/weight/weight').then(c => c.Weight) },
      { path: '**', redirectTo: 'calendar' }
    ]
  },
  { path: '**', redirectTo: 'calendar' }
];
