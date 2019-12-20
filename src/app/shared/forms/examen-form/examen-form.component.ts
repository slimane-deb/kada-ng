import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../app-date-adapter';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ExamenFormComponent implements OnInit {

  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
