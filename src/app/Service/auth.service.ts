import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isloggedIn: boolean;
  private role = 0;
  private verification = 0;
  constructor(){
    this.isloggedIn = false;
    this.role = 0;
    if (sessionStorage.getItem('verification') != null) { this.verification = Number(sessionStorage.getItem('verification')); }
  }
  // tslint:disable-next-line:typedef
  login(role: number, password: string, verification: number){
    this.isloggedIn = true;
    this.role = role;
    this.verification = verification;
    console.log(' role : ' + this.role);
    sessionStorage.setItem('role_user', this.role.toString());
    return of(this.isloggedIn);
  }

  isUserLoggedIn(): boolean{
    return this.isloggedIn;
  }
  isAdminUser(): boolean{
    const roleUser = sessionStorage.getItem('role_user');
    if (roleUser === '1'){
      return true;
    }
    return false;
  }
  isVendeurUser(): boolean {
    const roleUser = sessionStorage.getItem('role_user');
    if (roleUser === '2') {
      if (this.verification === 0) { return false; }
      console.log('verification : ' + this.verification);
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  logoutUser(){
    this.isloggedIn = false;
  }
}
