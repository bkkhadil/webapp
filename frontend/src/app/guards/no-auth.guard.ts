// no-auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { Role } from '../../models/role.model';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const currentUser = this.authService.currentUser;

    // Si l'utilisateur est déjà connecté, rediriger en fonction de son rôle
    if (currentUser) {
      return this.redirectBasedOnRole(currentUser.role);
    }

    // Sinon, autoriser l'accès à la route
    return true;
  }

  private redirectBasedOnRole(role: Role): UrlTree {
    if (role === Role.PARTNER) {
      return this.router.parseUrl('/partner/contact');
    } else if (role === Role.USER) {
      return this.router.parseUrl('/');
    }
    return this.router.parseUrl('/login');
  }
}