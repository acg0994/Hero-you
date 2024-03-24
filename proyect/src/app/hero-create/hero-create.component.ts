import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './hero-create.component.html',
  styleUrl: './hero-create.component.scss',
})
export class HeroCreateComponent {

  public heroForm: FormGroup = this.fb.group({
    realName: ['', [Validators.required, Validators.pattern(/^[A-Z]/)]],
    heroName: ['', Validators.required],
    power: ['', Validators.required],
    weakness: ['', Validators.required],
    avatar: ['']
  });

  public powers: string[] = ['Super fuerza', 'Ultrainstinto', 'Invisibilidad', 'Super velocidad'];
 
  public currentImageIndex = 0;
  public selectAvatar: boolean = false;

  constructor(private fb: FormBuilder, public service: HeroService, private router: Router,) {}

  showPreviousHeroe() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  showNextHeroe() {
    if (this.currentImageIndex < this.service.imagesOfAvatar.length - 1) {
      this.currentImageIndex++;
    }
  }
  onSubmit(): void {
      this.selectAvatar = !this.heroForm.invalid;
  }
  continueToList(avatarSelected: number): void {
    this.heroForm.value.avatar = avatarSelected;
    this.service.heroes.push(this.heroForm.value);
    this.service.imagesOfAvatar.splice(avatarSelected, 1);
    console.log(this.service.heroes);
    this.router.navigate(['/heroesList']);
  }
}
