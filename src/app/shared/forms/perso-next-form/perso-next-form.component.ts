import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GROUPE_SANG, Pays, Situations} from '../form-data';

@Component({
  selector: 'app-next-form',
  templateUrl: './perso-next-form.component.html',
  styleUrls: ['./perso-next-form.component.scss']
})
export class PersoNextFormComponent implements OnInit {

  @Input() form: FormGroup;
  situations = Situations;
  grps = GROUPE_SANG;
  nations = Pays;
  constructor() { }

  ngOnInit() {
  }

}
