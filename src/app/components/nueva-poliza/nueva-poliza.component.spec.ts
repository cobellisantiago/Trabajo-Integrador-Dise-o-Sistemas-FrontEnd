import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPolizaComponent } from './nueva-poliza.component';

describe('NuevaPolizaComponent', () => {
  let component: NuevaPolizaComponent;
  let fixture: ComponentFixture<NuevaPolizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPolizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
