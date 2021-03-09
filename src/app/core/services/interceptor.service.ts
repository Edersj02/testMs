import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Store } from '@ngxs/store';

import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    let customHeaders;
    customHeaders = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .append('Accept', 'application/json'),
    });
    return next
      .handle(customHeaders)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            //
          }
          return throwError(err);
        })
      )
      .toPromise();
  }
}
