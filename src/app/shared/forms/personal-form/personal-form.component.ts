import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';
import {FileUploadModel} from '../../file-upload-model';
import {FileUploadComponent} from '../file-upload/file-upload.component';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalFormComponent implements OnInit {

  @ViewChild(FileUploadComponent, {static: false}) fileUpload: ElementRef;
  @Input() form: FormGroup;
  sexe = 'h';
  @Input()
  progress ;
  imgStr: any;

  constructor() { }

  ngOnInit() {
    this.imgStr = this.form.get('image').value;
  }

}
