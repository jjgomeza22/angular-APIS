import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

  getFiles(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
      tap(response => {
        const blob = new Blob([response], {type});
        saveAs(blob, name);
      }),
      map(response => true)
    );
  }
}
