import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsViewComponent } from './icons-view.component';

describe('IconsViewComponent', () => {
  let component: IconsViewComponent;
  let fixture: ComponentFixture<IconsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
