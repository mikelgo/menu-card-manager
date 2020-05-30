import {Component, OnInit} from '@angular/core';
import {OrchestrationService} from '../../../shared/services/orchestration.service';
import {Observable} from 'rxjs';
import {MenuCard} from '../../../shared/models/menu-card';

@Component({
  selector: 'app-menu-card-detail',
  templateUrl: './menu-card-detail.component.html',
  styleUrls: ['./menu-card-detail.component.scss']
})
export class MenuCardDetailComponent implements OnInit {
  public activeMenuCard$: Observable<MenuCard>;
  constructor(private orchestrationService: OrchestrationService) {}

  ngOnInit(): void {
    this.activeMenuCard$ = this.orchestrationService.activeMenuCard$;
  }
}
