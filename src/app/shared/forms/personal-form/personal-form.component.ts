import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalFormComponent implements OnInit {

  @Input() form: FormGroup;
  sexe = 'h';
  constructor() { }

  ngOnInit() {
  }

}
