import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPrimeiroComCliComponent } from './meu-primeiro-com-cli.component';

describe('MeuPrimeiroComCliComponent', () => {
  let component: MeuPrimeiroComCliComponent;
  let fixture: ComponentFixture<MeuPrimeiroComCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuPrimeiroComCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPrimeiroComCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
