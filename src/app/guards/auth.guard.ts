import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router()
  if (authService.getToken()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }

};
