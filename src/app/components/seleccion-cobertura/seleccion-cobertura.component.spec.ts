import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCoberturaComponent } from './seleccion-cobertura.component';

describe('SeleccionCoberturaComponent', () => {
  let component: SeleccionCoberturaComponent;
  let fixture: ComponentFixture<SeleccionCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
