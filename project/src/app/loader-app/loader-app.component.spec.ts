import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderAppComponent } from './loader-app.component';

describe('LoaderAppComponent', () => {
  let component: LoaderAppComponent;
  let fixture: ComponentFixture<LoaderAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
