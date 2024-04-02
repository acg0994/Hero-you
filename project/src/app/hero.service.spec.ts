import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update confirmDelete property', () => {
    const decision: boolean = true;
    service.confirmDeleteHeroe(decision);
    expect(service.confirmDelete).toEqual(decision);
  });

  it('should return false if user does not match userRegistry', (done) => {
    localStorage.setItem('isLoggedIn', 'anotherUser');
    service.login().subscribe((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('should return a success message after registration', (done) => {
    jest.spyOn(service.loaderService, 'showLoader');
    jest.spyOn(service.loaderService, 'hideLoader');
    service.registerUser().subscribe((result) => {
      expect(result).toEqual('Usuario creado');
      expect(service.loaderService.showLoader).toHaveBeenCalled();
      expect(service.loaderService.hideLoader).toHaveBeenCalled();
      done();
    });
  });

  it('should return an array of avatar images', (done) => {
    const expectedImages: string[] = [
      '../../assets/Images/Heroes/5.png',
      '../../assets/Images/Heroes/6.png',
      '../../assets/Images/Heroes/7.png',
      '../../assets/Images/Heroes/8.png',
    ];
    service.getImages().subscribe((images) => {
      expect(images).toEqual(expectedImages);
      done();
    });
  });

  it('should return a success message after posting data', (done) => {
    jest.spyOn(service.loaderService, 'showLoader');
    jest.spyOn(service.loaderService, 'hideLoader');
    service.postDataHeroes().subscribe((result) => {
      expect(result).toEqual('Super héroe creado');
      expect(service.loaderService.showLoader).toHaveBeenCalled();
      expect(service.loaderService.hideLoader).toHaveBeenCalled();
      done();
    });
  });

  it('should return heroes data with loader', (done) => {
    const showLoader: boolean = true;
    service.getDataHeroes(showLoader).subscribe((heroes) => {
      expect(heroes).toEqual(service.heroes);
      done();
    });
  });

  it('should return a success message after deleting a hero', (done) => {
    jest.spyOn(service.loaderService, 'showLoader');
    jest.spyOn(service.loaderService, 'hideLoader');
    service.deletedHeroe().subscribe((result) => {
      expect(result).toEqual('El super héroe fue eliminado');
      expect(service.loaderService.showLoader).toHaveBeenCalled();
      expect(service.loaderService.hideLoader).toHaveBeenCalled();
      done();
    });
  });

  it('should return a success message after editing a hero', (done) => {
    jest.spyOn(service.loaderService, 'showLoader');
    jest.spyOn(service.loaderService, 'hideLoader');
    service.editHeroe().subscribe((result) => {
      expect(result).toEqual('Super héroe editado con éxito');
      expect(service.loaderService.showLoader).toHaveBeenCalled();
      expect(service.loaderService.hideLoader).toHaveBeenCalled();
      done();
    });
  });
});
