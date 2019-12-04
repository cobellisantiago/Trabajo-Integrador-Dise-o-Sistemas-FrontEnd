import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPolizaComponent } from './confirmar-poliza.component';

describe('ConfirmarPolizaComponent', () => {
  let component: ConfirmarPolizaComponent;
  let fixture: ComponentFixture<ConfirmarPolizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarPolizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
