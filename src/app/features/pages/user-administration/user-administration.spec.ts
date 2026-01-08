import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdministration } from './user-administration';

describe('UserAdministration', () => {
  let component: UserAdministration;
  let fixture: ComponentFixture<UserAdministration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdministration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAdministration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
