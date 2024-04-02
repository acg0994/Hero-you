import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeroListComponent } from './hero-list.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { HeroesCharacteristics } from '../../models/heroesCharacteristics.model';
import { Router } from '@angular/router';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroListComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to valueChanges of search filter', () => {
    const value: string = 'search value';
    const filterHeroesSpy = jest.spyOn(component, 'filterHeroes');
    component.ngOnInit();
    expect(component.resultsOfSearch).toBeFalsy();
    expect(component.showNoResults).toBeFalsy();
    component.filter.get('search')!.setValue(value);
    expect(filterHeroesSpy).toHaveBeenCalledWith(value);
  });

  it('should set resultsOfSearch to false and showNoResults to true if filteredHeroes is empty or search is empty', () => {
    component.filteredHeroes = [];
    component.filter.get('search')!.setValue('');
    component.applyFilter();
    expect(component.resultsOfSearch).toBeFalsy();
    expect(component.showNoResults).toBeTruthy();
  });

  it('should filter heroes based on the provided value', () => {
    const value: string = 'search value';
    const data: HeroesCharacteristics[] = [
      {
        heroName: 'Superman',
        realName: 'Peter',
        power: 'X',
        weakness: 'kryptonite',
        avatar: '0'
      },
    ];
    jest.spyOn(component.service, 'getDataHeroes').mockReturnValue(of(data));
    component.filterHeroes(value);
    expect(component.service.getDataHeroes).toHaveBeenCalledWith(false);
    expect(component.filteredHeroes).toEqual([]);
  });

  it('should navigate to edit page', inject([Router], (router: Router) => {
    const spy: jest.SpyInstance = jest.spyOn(router, 'navigate');
    const heroSelected: HeroesCharacteristics =
      {
        heroName: 'Superman',
        realName: 'Peter',
        power: 'X',
        weakness: 'kryptonite',
        avatar: '0'
      };
    component.navigateToEditHeroe(heroSelected, 0);
    expect(spy).toHaveBeenCalledWith(['/heroesEdit']);
  }));
});
