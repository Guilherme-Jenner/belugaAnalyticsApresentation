import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMarcaComponent } from './pop-up-marca.component';

describe('PopUpMarcaComponent', () => {
  let component: PopUpMarcaComponent;
  let fixture: ComponentFixture<PopUpMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpMarcaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
