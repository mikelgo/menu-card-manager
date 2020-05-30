import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddMenuCardDialogComponent} from './shared/components/add-menu-card-dialog/add-menu-card-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  // TODO implement
  onMenuCardAdd(): void {
    const dialogRef = this.dialog.open(AddMenuCardDialogComponent);
  }
}
