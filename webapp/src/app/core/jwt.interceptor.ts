import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log avant modificationconsole.log('Intercepting request to:', req.url);
    console.log('Requête originale:', req);
    console.log('Intercepting request to:', req.url);
    if (req.method === 'OPTIONS') {
      return next.handle(req);
    }

    const token = this.authService.getAccessToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Log après modification
    console.log('Requête modifiée:', {
      url: authReq.url,
      method: authReq.method,
      headers: this.getHeaders(authReq.headers),
      body: authReq.body
    });

    return next.handle(authReq).pipe(
      tap(event => console.log('Réponse reçue:', event)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
  private getHeaders(headers: HttpHeaders): {[key: string]: string} {
    const headerObj: {[key: string]: string} = {};
    headers.keys().forEach((key: string) => {
      headerObj[key] = headers.get(key)!;
    });
    return headerObj;
  }
}