import { Injectable } from '@angular/core';
import { HeroesCharacteristics } from '../models/heroesCharacteristics.model';
import { Observable, delay, of, tap } from 'rxjs';
import { LoaderAppService } from './loader-app.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public user: string | null = '';
  public main: HTMLElement | null = null;
  public heroes: HeroesCharacteristics[] = [];
  public imagesOfAvatar: string[] = [];
  public heroSelected: HeroesCharacteristics = new HeroesCharacteristics();
  public navigateToEdit: boolean = false;
  public confirmDelete: boolean = false;
  public loginApp: boolean = true;

  constructor(private loaderService: LoaderAppService) {
    this.getImages().subscribe((data) => {
      this.imagesOfAvatar = data;
    });
  }

  confirmDeleteHeroe(decision: boolean): void {
    this.confirmDelete = decision;
  }

  login(): Observable<boolean> {
    this.loaderService.showLoader();
    const userRegistry: string | null = localStorage.getItem('isLoggedIn');
    if (this.user !== userRegistry) {
      return of(false).pipe(
        delay(1000),
        tap(() => this.loaderService.hideLoader())
      );
    } else {
      return of(true).pipe(
        delay(1000),
        tap(() => this.loaderService.hideLoader())
      );
    }
  }

  registerUser(): Observable<string> {
    this.loaderService.showLoader();
    this.user = localStorage.getItem('isLoggedIn');
    return of('Usuario creado').pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
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

  getDataHeroes(showLoader: boolean): Observable<HeroesCharacteristics[]> {
    if (showLoader) {
      this.loaderService.showLoader();
      return of(this.heroes).pipe(
        delay(1000),
        tap(() => this.loaderService.hideLoader())
      );
    } else {
      return of(this.heroes);
    }
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
