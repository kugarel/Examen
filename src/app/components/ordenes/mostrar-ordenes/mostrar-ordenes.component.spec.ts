import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarOrdenesComponent } from './mostrar-ordenes.component';

describe('MostrarOrdenesComponent', () => {
  let component: MostrarOrdenesComponent;
  let fixture: ComponentFixture<MostrarOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarOrdenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
