import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarMontoComponent } from './ingresar-monto.component';

describe('IngresarMontoComponent', () => {
  let component: IngresarMontoComponent;
  let fixture: ComponentFixture<IngresarMontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarMontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarMontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
