import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('../app/pages/auth/auth.routes').then(e => e.routes) },
    { path: 'products', loadChildren: () => import('../app/pages/products/products.routes').then(e => e.routes) },
    { path: 'contact', component: ContactComponent },
    { path: 'profile', canActivate:[authGuard], loadChildren: () => import('../app/pages/profile/profile.routes').then(e => e.routes) },
    { path: '**', component: NotFoundComponent },
];
