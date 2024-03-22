import { Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';

export const routes: Routes = [ 
{ path: 'heroesList', component: HeroListComponent },
{ path: 'heroesCreate', component: HeroCreateComponent },
{ path: 'heroesEdit', component: HeroEditComponent }];
