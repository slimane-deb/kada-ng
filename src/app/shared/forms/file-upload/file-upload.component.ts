import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    // Angular doesn’t come with a built-in value accessor for file input,
    // Let’s inform Angular on how to do that by creating a custom value accessor
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ],
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements ControlValueAccessor, OnInit {

  @Input() progress;
  onChange: Function;
  @Input()
  file: File | null = null;
  private imageURL: any;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    // reader.readAsDataURL(file);
  }
  ngOnInit() {
    // console.log('mdfdmfmdfmdmfdm'+this.file);
    this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.file);
  }
  constructor(     private sanitizer: DomSanitizer,
                   private host: ElementRef<HTMLInputElement> ) {
  }

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
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.file);
  }

}
