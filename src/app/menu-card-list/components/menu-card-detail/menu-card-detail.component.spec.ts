import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardDetailComponent } from './menu-card-detail.component';

describe('MenuCardDetailComponent', () => {
  let component: MenuCardDetailComponent;
  let fixture: ComponentFixture<MenuCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
