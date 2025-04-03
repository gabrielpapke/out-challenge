import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  get<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<T>(url, { params: httpParams });
  }
}
