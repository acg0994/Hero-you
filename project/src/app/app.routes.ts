import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'heroesList', loadComponent:()=> import('../app/hero-list/hero-list.component').then((component) => component.HeroListComponent) },
  { path: 'heroesCreate', loadComponent:()=> import('../app/hero-create/hero-create.component').then((component) => component.HeroCreateComponent) },
  { path: 'heroesEdit', loadComponent:()=> import('../app/hero-edit/hero-edit.component').then((component) => component.HeroEditComponent) },
];
