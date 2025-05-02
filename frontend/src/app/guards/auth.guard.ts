import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  Router, 
  RouterStateSnapshot,
  UrlTree 
} from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const requiredRoles = route.data['roles'] as Array<string>; // Récupérer les rôles requis
    const currentUser = this.authService.currentUser;
  
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
    if (!currentUser) {
      return this.redirectToLogin(state);
    }
  
    // Si des rôles sont requis et que l'utilisateur n'a pas le bon rôle, rediriger vers une page d'accès refusé
    if (requiredRoles && !requiredRoles.includes(currentUser.role)) {
      return this.redirectToAccessDenied(state);
    }
  
    // Sinon, autoriser l'accès
    return true;
  }
  private redirectToLogin(state: RouterStateSnapshot): UrlTree {
    return this.router.createUrlTree(
      ['/login'], 
      { queryParams: { returnUrl: state.url } }
    );
  }

  private redirectToAccessDenied(state: RouterStateSnapshot): UrlTree {
    return this.router.createUrlTree(
      ['/access-denied'], 
      { queryParams: { attemptedUrl: state.url } }
    );
  }
}