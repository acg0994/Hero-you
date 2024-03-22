import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor(private router: Router) { }
  
  navigateToCreate(): void {
    this.router.navigate(['/heroesList']);
  }

  navigateToEdit(): void {
    this.router.navigate(['/heroesEdit']);
  }

  navigateToList(): void {
    this.router.navigate(['/heroesEdit']);
  }
}
