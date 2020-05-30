import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardCollectionItemComponent } from './menu-card-collection-item.component';

describe('MenuCardCollectionItemComponent', () => {
  let component: MenuCardCollectionItemComponent;
  let fixture: ComponentFixture<MenuCardCollectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardCollectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardCollectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
