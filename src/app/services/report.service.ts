import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) {}

  getGeneralReport<T>(relativeUrl: string, startDate: string, endDate: string): Observable<T> {
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    return this.http.get<T>(this.baseUrl + relativeUrl, { params: params});
  }
  getDailyGeneralReport<T>(relativeUrl: string, selectedDate: string): Observable<T> {
    let params = new HttpParams();
    params = params.set('requestedDate', selectedDate);
    return this.http.get<T>(this.baseUrl + relativeUrl, { params: params});
  }
  getLineZoneReport<T>(relativeUrl: string, line_zone_name: string, startDate: string, endDate: string): Observable<T> {
    let params = new HttpParams();
    params = params.set('line_zone_name', line_zone_name);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    return this.http.get<T>(this.baseUrl + relativeUrl, { params: params});
  }
  getDailyLineZoneReport<T>(relativeUrl: string, line_zone_name: string, selectedDate: string): Observable<T> {
    let params = new HttpParams();
    params = params.set('line_zone_name', line_zone_name);
    params = params.set('requestedDate', selectedDate);
    return this.http.get<T>(this.baseUrl + relativeUrl, { params: params});
  }

}
