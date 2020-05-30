import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddMenuCardDialogComponent} from './add-menu-card-dialog.component';

describe('AddMenuCardComponent', () => {
  let component: AddMenuCardDialogComponent;
  let fixture: ComponentFixture<AddMenuCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMenuCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
