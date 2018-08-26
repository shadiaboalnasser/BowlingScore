import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFrame} from "./data.model";

@Injectable()
export class DataService {
  private serverUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  postFrames(frames): Observable<any> {
    return this.http.post<IFrame>(this.serverUrl + 'frames/', frames)
  }
}

