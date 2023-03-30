import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerCardComponent } from './adventurer-card.component';

describe('AdventurerCardComponent', () => {
  let component: AdventurerCardComponent;
  let fixture: ComponentFixture<AdventurerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventurerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventurerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
