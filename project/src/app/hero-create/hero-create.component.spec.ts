import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroCreateComponent } from './hero-create.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

describe('HeroCreateComponent', () => {
  let component: HeroCreateComponent;
  let fixture: ComponentFixture<HeroCreateComponent>;
  let routerSpy: { navigate: jest.Mock };
  let dialogSpy: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    routerSpy = { navigate: jest.fn() };
    const dialogSpyObj = {
      open: jest.fn(() => ({ afterClosed: () => of({}) })) // Simulamos el comportamiento de MatDialog
    };
    await TestBed.configureTestingModule({
      imports: [HeroCreateComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpyObj },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroCreateComponent);
    component = fixture.componentInstance;
    dialogSpy = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrement currentImageIndex if it is greater than 0', () => {
    component.currentImageIndex = 2;
    component.showPreviousHeroe();
    expect(component.currentImageIndex).toBe(1);
  });

  it('should increment currentImageIndex if it is less than the length of images array minus 1', () => {
    component.currentImageIndex = 2;
    component.service.imagesOfAvatar = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.showNextHeroe();
    expect(component.currentImageIndex).toBe(2);
  });

  it('should update hero and navigate when editing a hero with valid form', fakeAsync(() => {
    component.editHeroe = true;
    jest.spyOn(component.service, 'editHeroe').mockReturnValue(of('Heroe editado exitosamente'));
    component.heroSelected.index = 0
    component.heroForm.setValue({
      heroName: 'Angel',
      realName: 'Hulk',
      power: 'Super Strength',
      weakness: 'Nana',
      avatar: 0
    });
    component.onSubmit();
    tick();
    expect(component.service.editHeroe).toHaveBeenCalled();
    expect(dialogSpy.open).toHaveBeenCalledWith(ModalComponent, {
      width: '350px',
      data: { info: 'Heroe editado exitosamente' },
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroesList']);
  }));

  it('should continue to list after selecting an avatar', () => {
    const avatarSelected = 0;
    const imgOfAvatar = 'avatar_image.jpg';
    component.heroForm.setValue({
      heroName: 'Angel',
      realName: 'Hulk',
      power: 'Super Strength',
      weakness: 'Nana',
      avatar: 0
    });
    component.service.heroes = [];
    component.service.imagesOfAvatar = ['avatar1.jpg', 'avatar2.jpg'];

    jest.spyOn(component.service, 'postDataHeroes').mockReturnValue(of('Heroe creado exitosamente'));
    component.continueToList(avatarSelected, imgOfAvatar);
    expect(component.heroForm.value.avatar).toBe(imgOfAvatar);
    expect(component.service.heroes.length).toBe(1);
    expect(component.service.imagesOfAvatar).not.toContain(imgOfAvatar); 
    expect(dialogSpy.open).toHaveBeenCalledWith(ModalComponent, {
      width: '350px',
      data: { info: 'Heroe creado exitosamente' },
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroesList']);
  });
});
