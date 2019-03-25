import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add authorization header with basic auth credentials if available
        let user = JSON.parse(localStorage.getItem('currentUser'));
        
        if (user && user.authdata) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${user.authdata}`
                }
            });
        }

        return next.handle(request);
    }
}