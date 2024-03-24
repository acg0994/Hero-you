import { Injectable } from '@angular/core';
import { HeroesCharacteristics } from '../models/heroesCharacteristics.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public main: HTMLElement | null = null;
  public heroes: HeroesCharacteristics[] = [];
  public imagesOfAvatar: string[] = [];

  constructor() {
    this.imagesOfAvatar = ["../../assets/Images/Heroes/5.png", "../../assets/Images/Heroes/6.png", "../../assets/Images/Heroes/7.png", "../../assets/Images/Heroes/8.png"]
   }

}
