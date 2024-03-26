import { Injectable } from '@angular/core';
import { HeroesCharacteristics } from '../models/heroesCharacteristics.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public main: HTMLElement | null = null;
  public heroes: HeroesCharacteristics[] = [];
  public imagesOfAvatar: string[] = [];
  public heroSelected: HeroesCharacteristics = new HeroesCharacteristics();
  public navigateToEdit: boolean = false;
  public confirmDelete: boolean = false;

  constructor() {
    this.getImages().subscribe((data) => {
      this.imagesOfAvatar = data;
    });
  }

  confirmDeleteHeroe(decision: boolean): void {
    this.confirmDelete = decision;
  }

  getImages(): Observable<string[]> {
    return of([
      '../../assets/Images/Heroes/5.png',
      '../../assets/Images/Heroes/6.png',
      '../../assets/Images/Heroes/7.png',
      '../../assets/Images/Heroes/8.png',
    ]);
  }
  postDataHeroes(): Observable<string> {
    return of('Super heroe creado');
  }

  getDataHeroes(): Observable<HeroesCharacteristics[]> {
    return of(this.heroes);
  }

  deletedHeroe(): Observable<string> {
    return of('El super heroe fue eliminado');
  }

  editHeroe(): Observable<string> {
    return of('Super heroe editado con exito');
  }
}
