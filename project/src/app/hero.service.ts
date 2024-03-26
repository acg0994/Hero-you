import { Injectable } from '@angular/core';
import { HeroesCharacteristics } from '../models/heroesCharacteristics.model';
import { Observable, delay, of, tap } from 'rxjs';
import { LoaderAppService } from './loader-app.service';

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

  constructor(private loaderService: LoaderAppService) {
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
    this.loaderService.showLoader();
    return of('Super heroe creado').pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }

  getDataHeroes(): Observable<HeroesCharacteristics[]> {
    return of(this.heroes);
  }

  deletedHeroe(): Observable<string> {
    this.loaderService.showLoader();
    return of('El super heroe fue eliminado').pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }

  editHeroe(): Observable<string> {
    this.loaderService.showLoader();
    return of('Super heroe editado con exito').pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }
}
