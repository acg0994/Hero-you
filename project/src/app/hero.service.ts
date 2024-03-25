import { Injectable } from '@angular/core';
import { HeroesCharacteristics } from '../models/heroesCharacteristics.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public main: HTMLElement | null = null;
  public heroes: HeroesCharacteristics[] = [];
  public imagesOfAvatar: string[] = [];
  public heroSelected: HeroesCharacteristics = new HeroesCharacteristics();
  public navigateToEdit: boolean = false;
  public confirmDelete: boolean = false;

  constructor() {
    this.imagesOfAvatar = ["../../assets/Images/Heroes/5.png", "../../assets/Images/Heroes/6.png", "../../assets/Images/Heroes/7.png", "../../assets/Images/Heroes/8.png"]
   }

   confirmDeleteHeroe(decision: boolean): void {
    this.confirmDelete = decision;
   }

}
