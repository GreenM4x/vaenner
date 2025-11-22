import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDisplay } from './like-display';

describe('LikeDisplay', () => {
  let component: LikeDisplay;
  let fixture: ComponentFixture<LikeDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
