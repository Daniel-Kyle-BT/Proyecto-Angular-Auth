import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosHumanos } from './recursos-humanos';

describe('RecursosHumanos', () => {
  let component: RecursosHumanos;
  let fixture: ComponentFixture<RecursosHumanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosHumanos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosHumanos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
