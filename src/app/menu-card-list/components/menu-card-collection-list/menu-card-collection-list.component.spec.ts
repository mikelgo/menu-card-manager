import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardCollectionListComponent } from './menu-card-collection-list.component';

describe('MenuCardCollectionListComponent', () => {
  let component: MenuCardCollectionListComponent;
  let fixture: ComponentFixture<MenuCardCollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardCollectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
