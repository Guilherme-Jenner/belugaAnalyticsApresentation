import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrateleiraComponent } from './dashboard-prateleira.component';

describe('DashboardPrateleiraComponent', () => {
  let component: DashboardPrateleiraComponent;
  let fixture: ComponentFixture<DashboardPrateleiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPrateleiraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPrateleiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
