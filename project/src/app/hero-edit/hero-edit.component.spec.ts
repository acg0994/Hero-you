import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeroEditComponent } from './hero-edit.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('HeroEditComponent', () => {
  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroEditComponent, BrowserAnimationsModule, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to main page', inject([Router], (router: Router) => {
    component.service.navigateToEdit = false
    const spy: jest.SpyInstance = jest.spyOn(router, 'navigate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }));
});
