import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCategoryComponent } from './information-category.component';

describe('InformationCategoryComponent', () => {
  let component: InformationCategoryComponent;
  let fixture: ComponentFixture<InformationCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
