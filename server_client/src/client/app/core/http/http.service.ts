import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
} from '@angular/core';
import { Observable } from 'rxjs';

import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/src/client' {
  export interface HttpClient {
    cache(forceUpdate?: boolean): HttpClient;

    skipErrorHandler(): HttpClient;

    disableApiPrefix(): HttpClient;
  }
}

class HttpInterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor,
  ) {}

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }
}

export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>(
  'HTTP_DYNAMIC_INTERCEPTORS',
);

@Injectable()
export class HttpService extends HttpClient {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional()
    @Inject(HTTP_DYNAMIC_INTERCEPTORS)
    private interceptors: HttpInterceptor[] = [],
  ) {
    super(httpHandler);

    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [
        this.injector.get(ApiPrefixInterceptor),
        this.injector.get(ErrorHandlerInterceptor),
      ];
    }
  }

  cache(forceUpdate?: boolean): HttpClient {
    const cacheInterceptor = this.injector
      .get(CacheInterceptor)
      .configure({ update: forceUpdate });
    return this.addInterceptor(cacheInterceptor);
  }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  disableApiPrefix(): HttpClient {
    return this.removeInterceptor(ApiPrefixInterceptor);
  }

  request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler,
    );
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType)),
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.concat([interceptor]),
    );
  }
}
