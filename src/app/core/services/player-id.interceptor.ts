import { Inject, Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ID_TOKEN } from '../../id-token.provider';

@Injectable()
export class PlayerIdInterceptor implements HttpInterceptor {

  constructor(
    @Inject(ID_TOKEN) private readonly id: string
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = request.headers.set('player-id', this.id);
    const newRequest = request.clone({
      headers
    });
    return next.handle(newRequest);
  }
}

export const PlayerIdInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: PlayerIdInterceptor
};
