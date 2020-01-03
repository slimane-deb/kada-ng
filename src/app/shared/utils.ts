import {FormControl} from '@angular/forms';
import {pipe} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';

export function requiredFileType( type: string ) {
  return (control: FormControl) => {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}
export function toResponseBody<T>() {
  return pipe(
    filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
    map(( res: HttpResponse<T> ) => res.body)
  );
}
export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function convertToBase64(file: File): string {
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);
  let base64String = '';

  reader.onload = (): void => {
    base64String = (reader.result as string).match(
      /.+;base64,(.+)/
    )[1];
  };
  return base64String;

}

