import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlayComponent } from './update-play.component';

describe('UpdatePlayComponent', () => {
  let component: UpdatePlayComponent;
  let fixture: ComponentFixture<UpdatePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
