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
import { KeysPipe } from "../pipes/keys.pipe";
import { keys } from '../keys/keys';

@Component({
    selector: 'app-hero-create',
    standalone: true,
    templateUrl: './hero-create.component.html',
    styleUrl: './hero-create.component.scss',
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
        CommonModule,
        KeysPipe
    ]
})
export class HeroCreateComponent {
  // Bindings que controlan tanto el heroe seleccionado para editar
  @Input() heroSelected: HeroesCharacteristics = new HeroesCharacteristics();
  @Input() editHeroe: boolean = false;

  // Formulario de creacion / edicion
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

  // Poderes que se muestran en el accordeon
  public powers: string[] = [
    keys['superStrength'],
    keys['ultraInstinct'],
    keys['invisibility'],
    keys['superSpeed'],
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

  // Flecha hacia atrás de selección de avatar
  showPreviousHeroe() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // Flecha hacia adelante de selección de avatar
  showNextHeroe() {
    if (this.currentImageIndex < this.service.imagesOfAvatar.length - 1) {
      this.currentImageIndex++;
    }
  }

  // Método que controla la funcion de crear o editar a un héroe
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
          width: keys['modalWidth'],
          data: { info: message },
        });
        this.router.navigate([keys['heroesListRoute']]);
      })
    } else {
      this.selectAvatar = !this.heroForm.invalid;
    }
  }

  // Metodo que llama al servicio para guardar el nuevo heroe creado y navega hacia el listado
  continueToList(avatarSelected: number, imgOfAvatar: string): void {
    this.heroForm.value.avatar = imgOfAvatar;
    this.service.heroes.push(this.heroForm.value);
    this.service.imagesOfAvatar.splice(avatarSelected, 1);
    this.service.postDataHeroes().subscribe(response => {
      this.dialog.open(ModalComponent, {
        width: keys['modalWidth'],
        data: { info: response },
      });
    });
    
    this.router.navigate([keys['heroesListRoute']]);
  }
}
