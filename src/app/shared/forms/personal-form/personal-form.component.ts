import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';
import {FileUploadModel} from '../../file-upload-model';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalFormComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  file: FileUploadModel;
  @Input() form: FormGroup;
  sexe = 'h';
  @Input()
  progress ;

  constructor() { }

  ngOnInit() {
  }

  // onClick() {
  //   const fileUpload = this.fileUpload.nativeElement;
  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();
  //
  //     reader.onload = (e: any) => {
  //       this.file = e.target.result;
  //     };
  //     // reader.readAsArrayBuffer(fileUpload.files[0]);
  //   }
  // }

  // uploadFile(file) {
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  //   file.inProgress = true;
  //   this.uploadService.upload(formData).pipe(
  //     map(event => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           file.progress = Math.round(event.loaded * 100 / event.total);
  //           break;
  //         case HttpEventType.Response:
  //           return event;
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       file.inProgress = false;
  //       return of(`${file.data.name} upload failed.`);
  //     })).subscribe((event: any) => {
  //     if (typeof (event) === 'object') {
  //       console.log(event.body);
  //     }
  //   });
  // }
}
