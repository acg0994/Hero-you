import { Injectable } from '@angular/core';
import { HeroesCharacteristics } from '../models/heroesCharacteristics.model';
import { Observable, delay, of, tap } from 'rxjs';
import { LoaderAppService } from './loader-app.service';
import { keys } from './keys/keys';

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
    // Obtenemos las imagenes, del siguiente metodo
    this.getImages().subscribe((data) => {
      this.imagesOfAvatar = data;
    });
  }
  // Confirmamos la decisión de eliminar al héroe o no, según el parámetro recibido
  confirmDeleteHeroe(decision: boolean): void {
    this.confirmDelete = decision;
  }

  // Metodo que contiene la lógica para logarse en la app
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

  // Metodo que contiene la lógica para registrar un usuario
  registerUser(): Observable<string> {
    this.loaderService.showLoader();
    this.user = localStorage.getItem('isLoggedIn');
    return of(keys['userCreated']).pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }

  // Metodo que obtiene las imagenes de los avatares mediante rxjs y observables
  getImages(): Observable<string[]> {
    return of([
      keys['heroOne'],
      keys['heroTwo'],
      keys['heroThree'],
      keys['heroFour'],
    ]);
  }

  // Metodo que envía el heroe creado mediante rxjs y observables
  postDataHeroes(): Observable<string> {
    this.loaderService.showLoader();
    return of(keys['heroCreated'],).pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }

  // Metodo que obtiene los héroes ya creados mediante rxjs y observables
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

  // Metodo que elimina al héroe seleccionado mediante rxjs y observables
  deletedHeroe(): Observable<string> {
    this.loaderService.showLoader();
    return of(keys['heroDeleted'],).pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }

  // Metodo que edita al héroe seleccionado mediante rxjs y observables
  editHeroe(): Observable<string> {
    this.loaderService.showLoader();
    return of(keys['heroEdited'],).pipe(
      delay(500),
      tap(() => this.loaderService.hideLoader())
    );
  }
}
