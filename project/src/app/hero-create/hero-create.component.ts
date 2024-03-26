import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { HeroesCharacteristics } from '../../models/heroesCharacteristics.model';
import { HttpClientModule } from '@angular/common/http';
import { LoaderAppService } from '../loader-app.service';
import { LoaderAppComponent } from '../loader-app/loader-app.component';

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
    MatIconModule,
    HttpClientModule,
    LoaderAppComponent,
    CommonModule
  ],
  templateUrl: './hero-create.component.html',
  styleUrl: './hero-create.component.scss',
})
export class HeroCreateComponent {
  @Input() heroSelected: HeroesCharacteristics = new HeroesCharacteristics();
  @Input() editHeroe: boolean = false;

  public heroForm: FormGroup = this.fb.group({
    realName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Z]/),
        Validators.maxLength(15),
      ],
    ],
    heroName: ['', [Validators.required, Validators.maxLength(15)]],
    power: ['', [Validators.required]],
    weakness: ['', [Validators.required, Validators.maxLength(15)]],
    avatar: [''],
  });

  public powers: string[] = [
    'Super fuerza',
    'Ultrainstinto',
    'Invisibilidad',
    'Super velocidad',
  ];

  public currentImageIndex = 0;
  public selectAvatar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public service: HeroService,
    private router: Router,
    public dialog: MatDialog,
    public loader: LoaderAppService
  ) {}

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
    if (this.editHeroe && !this.heroForm.invalid) {
      let index: number = 0;
      if (this.heroSelected.index) {
        index = this.heroSelected.index;
      }
      this.service.heroes[index].heroName = this.heroForm.value.heroName;
      this.service.heroes[index].realName = this.heroForm.value.realName;
      this.service.heroes[index].power = this.heroForm.value.power;
      this.service.heroes[index].weakness = this.heroForm.value.weakness;
      this.service.editHeroe().subscribe(message => {
        this.dialog.open(ModalComponent, {
          width: '350px',
          data: { info: message },
        });
        this.router.navigate(['/heroesList']);
      })
    } else {
      this.selectAvatar = !this.heroForm.invalid;
    }
  }
  continueToList(avatarSelected: number, imgOfAvatar: string): void {
    this.heroForm.value.avatar = imgOfAvatar;
    this.service.heroes.push(this.heroForm.value);
    this.service.imagesOfAvatar.splice(avatarSelected, 1);
    this.service.postDataHeroes().subscribe(response => {
      this.dialog.open(ModalComponent, {
        width: '350px',
        data: { info: response },
      });
    });
    
    this.router.navigate(['/heroesList']);
  }
}
