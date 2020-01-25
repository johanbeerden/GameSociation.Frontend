import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpService {
    public constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) {
    }

    public get<T>(endpoint: string): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http.get<T>(url);
    }

    public post<T>(endpoint: string, body: any): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http.post<T>(url, body);
    }

    public put<T>(endpoint: string, body: any): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http.put<T>(url, body);
    }

    public delete<T>(endpoint: string): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http.delete<T>(url);
    }
}