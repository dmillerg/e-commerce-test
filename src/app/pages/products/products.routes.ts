import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: 'catalog', component: CatalogComponent },
    { path: 'detail/:id', component: DetailComponent },
];
