import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultNotFoundComponent } from './result-not-found.component';

describe('ResultNotFoundComponent', () => {
  let component: ResultNotFoundComponent;
  let fixture: ComponentFixture<ResultNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
