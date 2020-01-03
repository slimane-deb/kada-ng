import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    // Angular doesn’t come with a built-in value accessor for file input,
    // it doesn’t know how to connect our component to the form API.
    // Let’s inform Angular on how to do that by creating a custom value accessor
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, OnInit {

  @Input() progress;
  onChange: Function;
  @Input()
  file: File | null = null;
  imageURL: any;

  // @HostListener('change', ['$event.target.files'])
  emitFiles( event ) {
    const file = event && event.target.files[0];
    // this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = (reader.result as string) ;
      this.file = this.imageURL.replace(new RegExp('data:image\\/(.*);base64,', 'gm'), '');
      this.onChange(this.file);

    };
    reader.readAsDataURL(file); // toBase64

  }
  ngOnInit() {
    if (this.file) {
    this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.file);
    }
  }
  constructor(     private sanitizer: DomSanitizer,
                   private host: ElementRef<HTMLInputElement> ) {
  }

  // -------- Form value accessors
  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

}
