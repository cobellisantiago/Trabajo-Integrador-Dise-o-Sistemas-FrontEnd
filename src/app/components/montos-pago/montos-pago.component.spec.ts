import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontosPagoComponent } from './montos-pago.component';

describe('MontosPagoComponent', () => {
  let component: MontosPagoComponent;
  let fixture: ComponentFixture<MontosPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontosPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontosPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
