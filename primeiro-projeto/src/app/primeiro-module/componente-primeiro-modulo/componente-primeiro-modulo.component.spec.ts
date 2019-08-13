import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePrimeiroModuloComponent } from './componente-primeiro-modulo.component';

describe('ComponentePrimeiroModuloComponent', () => {
  let component: ComponentePrimeiroModuloComponent;
  let fixture: ComponentFixture<ComponentePrimeiroModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentePrimeiroModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentePrimeiroModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
