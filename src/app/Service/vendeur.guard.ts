import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class VendeurGuard implements CanActivate {
  
  isVendeurUser!: boolean;
  constructor(private _router: Router, authservice: AuthService) {
    this.isVendeurUser = authservice.isVendeurUser();
    console.log(" vendeur : " + this.isVendeurUser);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.isVendeurUser){
      this._router.navigate([""]);
      alert("Votre compte devez attendre l'approbation de l'administrateur");
      return false;
    }
    // if(this.personservice.getOneUser())
    console.log("Vendeur");
    return true;
  }
  
}
