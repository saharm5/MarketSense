import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, switchMap, throwError, of, Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8081';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    private getHeaders(withAuth = true): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        if (withAuth && this.isBrowser) {
            const token = localStorage.getItem('token');
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
        }

        return headers;
    }

    fetchProducts(url: string, withAuth = true): Observable<unknown[]> {
        const headers = this.getHeaders(withAuth);

        return this.http.get<unknown[]>(`${BASE_URL}${url}`, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.refreshAccessToken().pipe(
                        switchMap((newToken) => {
                            if (newToken) {
                                const newHeaders = this.getHeaders(withAuth);

                                return this.http.get<unknown[]>(`${BASE_URL}${url}`, { headers: newHeaders });
                            }

                            return throwError(() => new Error('عدم موفقیت در دریافت توکن جدید'));
                        })
                    );
                }

                return throwError(() => error);
            })
        );
    }

    submitForm(url: string, formData: object, withAuth = true): Observable<unknown> {
        const headers = this.getHeaders(withAuth);

        return this.http.post(`${BASE_URL}${url}`, formData, { headers, responseType: 'text' }).pipe(
            switchMap((responseText: string) => {
                if (responseText.trim() === 'ok') {
                    if (this.isBrowser) {
                        this.router.navigate(['/']);
                    }

                    return of({ text: 'ok' });
                }

                try {
                    const result = JSON.parse(responseText);

                    return of(result);
                } catch {
                    return throwError(() => new Error('فرمت JSON نادرست است'));
                }
            }),
            catchError((err: unknown) => {
                console.error('خطا در ارسال فرم:', err);

                return throwError(() => err);
            })
        );
    }

    private refreshAccessToken(): Observable<string | null> {
        if (!this.isBrowser) {
            return of(null);
        }

        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.error('توکن رفرش موجود نیست');

            return of(null);
        }

        return this.http
            .post<{ access_token: string }>(
                `${BASE_URL}/auth/refresh`,
                { refresh_token: refreshToken },
                { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
            )
            .pipe(
                switchMap((response) => {
                    const newAccessToken = response?.access_token;

                    if (newAccessToken) {
                        localStorage.setItem('token', newAccessToken);

                        return of(newAccessToken);
                    }

                    return of(null);
                }),
                catchError((err: unknown) => {
                    console.error('خطا در رفرش توکن:', err);

                    return of(null);
                })
            );
    }
}
