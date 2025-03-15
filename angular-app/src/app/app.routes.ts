import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadComponent: async () => await import('./users/users.component').then(c => c.UsersComponent) }

]
