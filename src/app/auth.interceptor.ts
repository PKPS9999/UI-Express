import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    console.log('Stored Token:', localToken);
    if (localToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localToken),
      });
    }
    return next.handle(request);
  }
}
