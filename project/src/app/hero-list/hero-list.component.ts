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

@Component({
  selector: 'app-hero-list',
  standalone: true,
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
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
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
    public dialog: MatDialog
  ) {}

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

  applyFilter() {
    if (this.filteredHeroes.length > 0 && this.filter.value.search !== '') {
      this.resultsOfSearch = true;
      this.showNoResults = false;
    } else {
      this.resultsOfSearch = false;
      this.showNoResults = true;
    }
  }

  filterHeroes(value: string) {
    this.filteredHeroes = this.service.heroes.filter(
      (hero) => hero.realName.toLowerCase() === value.toLowerCase()
    );
  }

  navigateToEditHeroe(heroSelected: HeroesCharacteristics): void {
    this.service.heroSelected = heroSelected;
    this.service.navigateToEdit = true;
    this.router.navigate(['/heroesEdit']);
  }

  deleteHeroe(heroSelected: HeroesCharacteristics): void {
    const index = this.service.heroes.indexOf(heroSelected);
    if (index !== -1) {
      const dialog: MatDialogRef<any> = this.dialog.open(ModalComponent, {
        width: '350px',
        data: {
          info: 'Esta seguro de eliminar al super héroe?',
          buttons: true,
        },
      });
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.service.heroes.splice(index, 1);
          this.filter.get('search')?.reset('');
          this.service.imagesOfAvatar.push(heroSelected.avatar);
          this.dialog.open(ModalComponent, {
            width: '350px',
            data: {
              info: 'El super heroe fue eliminado',
            },
          });
        }
      });
    }
  }
}
