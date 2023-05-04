import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { IAirRequest, IAirResponse } from 'src/app/shared/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GetAirDataService {
  constructor(private http: HttpClient) { }

  getAirsData(requestdata: IAirRequest) {
    return this.http.post<IAirResponse>('getairs', requestdata)
      .pipe(
        catchError(() => EMPTY),
      );
  }
}
