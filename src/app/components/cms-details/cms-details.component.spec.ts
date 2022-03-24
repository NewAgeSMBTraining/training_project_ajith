import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDetailsComponent } from './cms-details.component';

describe('CmsDetailsComponent', () => {
  let component: CmsDetailsComponent;
  let fixture: ComponentFixture<CmsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
