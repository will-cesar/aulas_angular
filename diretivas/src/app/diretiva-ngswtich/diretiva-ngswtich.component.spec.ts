import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaNgswtichComponent } from './diretiva-ngswtich.component';

describe('DiretivaNgswtichComponent', () => {
  let component: DiretivaNgswtichComponent;
  let fixture: ComponentFixture<DiretivaNgswtichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretivaNgswtichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivaNgswtichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
