import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

// TODO: integrate

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private _requestCnt = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._requestCnt++;
    this._loading.open();

    return next.handle(request).pipe(
      finalize(() => {
        this._requestCnt--;
        this._requestCnt === 0 && this._loading.close();
      })
    );
  }

  constructor(private _loading: LoadingService) { }
}
