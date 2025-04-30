import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, of } from 'rxjs';

const BASE_URL = 'http://localhost:8081';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient, private router: Router) { }

    private getHeaders(withAuth: boolean = true): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (withAuth) {
            const token = localStorage.getItem('token');
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
        }
        return headers;
    }

    fetchProducts(url: string, withAuth: boolean = true) {
        const headers = this.getHeaders(withAuth);

        return this.http.get<any[]>(`${BASE_URL}${url}`, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.refreshAccessToken().pipe(
                        switchMap((newToken) => {
                            if (newToken) {
                                const newHeaders = this.getHeaders(withAuth);
                                return this.http.get<any[]>(`${BASE_URL}${url}`, { headers: newHeaders });
                            }
                            return throwError(() => new Error('عدم موفقیت در دریافت توکن جدید'));
                        })
                    );
                }
                return throwError(() => error);
            })
        );
    }

    submitForm(url: string, formData: object, withAuth: boolean = true) {
        const headers = this.getHeaders(withAuth);
        return this.http.post(`${BASE_URL}${url}`, formData, { headers, responseType: 'text' }).pipe(
            switchMap((responseText) => {
                if (responseText.trim() === 'ok') {
                    this.router.navigate(['/']);
                    return of({ text: 'ok' });
                }

                try {
                    const result = JSON.parse(responseText);
                    return of(result);
                } catch (error) {
                    return throwError(() => new Error('فرمت JSON نادرست است'));
                }
            }),
            catchError((error) => {
                console.error('خطا در ارسال فرم:', error);
                return throwError(() => error);
            })
        );
    }

    private refreshAccessToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.error('توکن رفرش موجود نیست');
            return of(null);
        }

        return this.http.post(`${BASE_URL}/token/refresh/`, { refresh: refreshToken }).pipe(
            switchMap((response: any) => {
                const newAccessToken = response.access;
                localStorage.setItem('token', newAccessToken);
                return of(newAccessToken);
            }),
            catchError((error) => {
                console.error('خطا در رفرش توکن:', error);
                return of(null);
            })
        );
    }
}
