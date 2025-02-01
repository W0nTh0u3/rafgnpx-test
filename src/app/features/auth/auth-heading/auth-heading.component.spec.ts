import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHeadingComponent } from './auth-heading.component';

describe('AuthHeadingComponent', () => {
  let component: AuthHeadingComponent;
  let fixture: ComponentFixture<AuthHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
