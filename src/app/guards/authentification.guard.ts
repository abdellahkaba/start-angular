import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const AuthentificationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree=> {

  let authenticated = inject(AuthenticationService).isAuthenticated()
  if (!authenticated){
    inject(Router).navigateByUrl("/login")
    return false
  }else {
    return true
  }
};
