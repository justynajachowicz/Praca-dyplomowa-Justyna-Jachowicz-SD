import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const xsrfToken = this.getCookie('XSRF-TOKEN'); // Pobierz token CSRF z ciasteczek

        if (xsrfToken) {
            req = req.clone({
                setHeaders: {
                    'X-XSRF-TOKEN': xsrfToken
                }
            });
        }

        return next.handle(req);
    }

    // Pomocnicza funkcja do pobierania tokenu z ciasteczek
    private getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
}