import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuCardsCollection} from '../../../shared/models/menu-cards-collection';
import {MenuCard} from '../../../shared/models/menu-card';

@Component({
  selector: 'app-menu-card-collection-list',
  templateUrl: './menu-card-collection-list.component.html',
  styleUrls: ['./menu-card-collection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCardCollectionListComponent implements OnInit {
  @Input() collection: MenuCardsCollection = null;

  @Output() selectedCollection = new EventEmitter<MenuCardsCollection>();
  @Output() selectedMenuCard = new EventEmitter<MenuCard>();
  constructor() { }

  ngOnInit(): void {
  }

  public onCollectionSelect(): void {
    this.selectedCollection.emit(this.collection);
  }

  onMenuCardSelect(menuCard: MenuCard) {
    this.selectedMenuCard.emit(menuCard);
  }

}
