import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioHome } from './inicio-home';

describe('InicioHome', () => {
  let component: InicioHome;
  let fixture: ComponentFixture<InicioHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
