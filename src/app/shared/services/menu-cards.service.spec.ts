import { TestBed } from '@angular/core/testing';

import { MenuCardsService } from './menu-cards.service';

describe('MenuCardsService', () => {
  let service: MenuCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
