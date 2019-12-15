import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirmed-dialog',
  templateUrl: './confirmed-dialog.component.html',
  styleUrls: ['./confirmed-dialog.component.scss']
})
export class ConfirmedDialogComponent  implements OnInit {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
  }
}
