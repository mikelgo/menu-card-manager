import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardListComponent } from './menu-card-list.component';

describe('MenuCardListComponent', () => {
  let component: MenuCardListComponent;
  let fixture: ComponentFixture<MenuCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
