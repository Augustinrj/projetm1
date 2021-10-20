import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAdmin!: boolean;
  
  constructor(private _router : Router, authservice : AuthService) { 
     this.isAdmin = authservice.isAdminUser();
     console.log(" admin :" +this.isAdmin);
  }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    console.log(" admin2 :" + this.isAdmin);
    if (!this.isAdmin){
      console.log("you are not allowed to view this page");
      this._router.navigate([""]);
      return false;
    }
    return true;
  }
}

