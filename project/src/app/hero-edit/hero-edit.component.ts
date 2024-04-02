import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { HeroCreateComponent } from '../hero-create/hero-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [
    HeroCreateComponent,
    CommonModule
  ],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.scss',
})
export class HeroEditComponent implements OnInit {
  constructor(public service: HeroService, private router: Router) {}

  // Este ciclo de vida, controla que no se pueda navegar al componente de edicion, si no es desde el listado con un héroe seleccionado
  ngOnInit(): void {
    if (this.service.navigateToEdit !== true) {
      this.router.navigate(['']);
    } else {
      this.service.navigateToEdit = false;
    }
  }
}
