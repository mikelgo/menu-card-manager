import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuCard} from '../../../shared/models/menu-card';

@Component({
  selector: 'app-menu-card-collection-item',
  templateUrl: './menu-card-collection-item.component.html',
  styleUrls: ['./menu-card-collection-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCardCollectionItemComponent implements OnInit {
  @Input() menuCard: MenuCard = null;

  @Output() selectedMenuCard = new EventEmitter<MenuCard>();
  constructor() {}

  ngOnInit(): void {}

  onMenuCardSelect(): void {
    this.selectedMenuCard.emit(this.menuCard);
  }
}
