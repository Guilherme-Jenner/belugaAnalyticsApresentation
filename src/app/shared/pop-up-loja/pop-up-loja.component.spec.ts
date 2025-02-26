import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLojaComponent } from './pop-up-loja.component';

describe('PopUpLojaComponent', () => {
  let component: PopUpLojaComponent;
  let fixture: ComponentFixture<PopUpLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
