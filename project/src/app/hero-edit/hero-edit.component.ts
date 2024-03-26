import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { HeroCreateComponent } from '../hero-create/hero-create.component';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [HeroCreateComponent],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.scss'
})
export class HeroEditComponent implements OnInit {

  
constructor(public service: HeroService, private router: Router,) {}
  ngOnInit(): void {
    if(this.service.navigateToEdit !== true) {
      this.router.navigate(['']);
    } else {
      this.service.navigateToEdit = false;
    }
  }
}
