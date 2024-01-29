import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment'

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!env.useMock) {
      return next.handle(req);
    }

    if (req.method === 'POST') {
      const modifiedRequest = req.clone({
        method: 'GET',
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }
}
