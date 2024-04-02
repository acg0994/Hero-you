import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeroesCharacteristics } from '../../models/heroesCharacteristics.model';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ModalComponent } from '../modal/modal.component';
import { LoaderAppComponent } from '../loader-app/loader-app.component';
import { LoaderAppService } from '../loader-app.service';
import { KeysPipe } from "../pipes/keys.pipe";
import { keys } from '../keys/keys';

@Component({
    selector: 'app-hero-list',
    standalone: true,
    templateUrl: './hero-list.component.html',
    styleUrl: './hero-list.component.scss',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatFormField,
        MatIcon,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        SlickCarouselModule,
        LoaderAppComponent,
        KeysPipe
    ]
})
export class HeroListComponent implements OnInit {
  filter: FormGroup = this.filterForm.group({
    search: [''],
  });
  resultsOfSearch: boolean = false;
  filteredHeroes: HeroesCharacteristics[] = [];
  showNoResults: boolean = false;
  slickCarouselConfig: Object = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  constructor(
    private filterForm: FormBuilder,
    public service: HeroService,
    private router: Router,
    public dialog: MatDialog,
    public loader: LoaderAppService
  ) {}

  // Método que controla, que si no hay héroes, se navegue a la pagina principal
  // y por la contra, iniciar el input para el filtrado
  ngOnInit(): void {
    if (this.service.heroes.length <= 0) {
      this.router.navigate(['']);
    }
    this.filter.get('search')!.valueChanges.subscribe((value) => {
      this.resultsOfSearch = false;
      this.showNoResults = false;
      this.filterHeroes(value);
    });
  }

  // Este método aplica el filtro y muestra los héroes en una tabla o el mensaje de no hay resultados
  applyFilter() {
    if (this.filteredHeroes.length > 0 && this.filter.value.search !== '') {
      this.resultsOfSearch = true;
      this.showNoResults = false;
    } else {
      this.resultsOfSearch = false;
      this.showNoResults = true;
    }
  }

  // Este método aplica el filtro y muestra los héroes en una tabla o el mensaje de no hay resultados
  filterHeroes(value: string) {
    this.service.getDataHeroes(false).subscribe((data) => {
      this.filteredHeroes = data.filter(
        (hero) => hero.heroName.toLowerCase() === value.toLowerCase()
      );
    });
  }

  // Método que controla la lógica de la navegación al componente de edicion del héroe seleccionado
  navigateToEditHeroe(
    heroSelected: HeroesCharacteristics,
    index: number
  ): void {
    this.service.heroSelected = heroSelected;
    heroSelected.index = index;
    this.service.navigateToEdit = true;
    this.router.navigate([keys['heroesEditRoute']]);
  }

  // Método que elimina al heroe seleccionado
  deleteHeroe(heroSelected: HeroesCharacteristics): void {
    const index = this.service.heroes.indexOf(heroSelected);
    if (index !== -1) {
      const dialog: MatDialogRef<any> = this.dialog.open(ModalComponent, {
        width: keys['modalWidth'],
        data: {
          info: keys['questionDeleteHero'],
          buttons: true,
        },
      });
      dialog.afterClosed().subscribe((result) => {
        if (result) {
          this.service.heroes.splice(index, 1);
          this.filter.get('search')?.reset('');
          this.service.imagesOfAvatar.push(heroSelected.avatar);
          this.service.deletedHeroe().subscribe((message) => {
            this.dialog.open(ModalComponent, {
              width: keys['modalWidth'],
              data: {
                info: message,
              },
            });
          });
        }
      });
    }
  }
}
