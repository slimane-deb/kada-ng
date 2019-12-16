import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-next-form',
  templateUrl: './perso-next-form.component.html',
  styleUrls: ['./perso-next-form.component.scss']
})
export class PersoNextFormComponent implements OnInit {

  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
