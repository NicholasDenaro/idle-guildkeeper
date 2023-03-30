import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerComponent } from './adventurer.component';

describe('AdventurerComponent', () => {
  let component: AdventurerComponent;
  let fixture: ComponentFixture<AdventurerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventurerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
