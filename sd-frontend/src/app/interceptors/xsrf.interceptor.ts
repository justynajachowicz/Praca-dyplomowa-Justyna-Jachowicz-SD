import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const xsrfToken = this.getXsrfToken();

        if (xsrfToken) {
            req = req.clone({
                setHeaders: {
                    'X-XSRF-TOKEN': xsrfToken
                }
            });
        } else {
            console.warn('CSRF token not found.');
        }

        return next.handle(req);
    }

    private getXsrfToken(): string | null {
        const tokenCookie = document.cookie.split(';')
            .find(cookie => cookie.trim().startsWith('X-XSRF-TOKEN='));

        if (tokenCookie) {
            const tokenValue = tokenCookie.split('=')[1] || null;
            // Zabezpieczamy się przed wywołaniem toLowerCase() na niezdefiniowanym
            return tokenValue ? tokenValue.toLowerCase() : null;
        }

        return null;
    }
}