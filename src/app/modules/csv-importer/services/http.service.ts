import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This service is used to get the file from the local folder.
 */
@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  getFileFromLocalFolder(fileSrc: string): Observable<string> {
    return this.http.get(fileSrc, { responseType: 'text' });
  }
}
