import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { PersonService } from '../Service/person.service';
import { } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private personservice: PersonService,
              private route: Router,
              private authservice: AuthService,
              private loc: Location) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public get Logged(): boolean {
    return this.logged;
  }
  // tslint:disable-next-line:member-ordering
  static logged: boolean;

  private logged = false;

  loginForm: FormGroup;
  // tslint:disable-next-line:typedef
  public static logout() {
    localStorage.removeItem('logged');
    sessionStorage.removeItem('role_user');

    window.location.href = window.location.origin;
    this.logged = false;
  }

  ngOnInit(): void {
    this.logged = false;
    const angularRoute = this.loc.path();
    console.log('path ' + window.location.origin);
  }

  // tslint:disable-next-line:typedef
  public submit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // this.personServive.getUser().toPromise().then((res) => {
    //   for (let index = 0; index < res.length; index++) {
    //     const element = res[index];
    //     console.log(element['nom']);
    //   }
    // }

    this.personservice.getOneUser(email)
      .toPromise()
      .then(res => {
        if (res.length !== 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            // tslint:disable-next-line:no-string-literal
            if (element['email'] === email) {
              // tslint:disable-next-line:no-string-literal
              if (element['password'] === password) {
                this.logged = true; console.log('Vous etes connectee');
                this.personservice.Logged = true;
                console.log(this.personservice.Logged);
                localStorage.setItem('logged', email);
                sessionStorage.setItem('verification', element.verification.toString());
                // tslint:disable-next-line:no-string-literal
                this.authservice.login(element['role_id'], password, element['verification']).subscribe(data => {});
                this.route.navigate(['']);
              }
              else { console.log('Erreur de mot de passe'); }
            }
            else { console.log('Email vide'); }
            console.log(element.nom);
          }
        }
        else {
          console.log('resultat est vide');
        }

      }).catch(err => {
        console.log('Erreur 0001 : ' + JSON.stringify(err));
      });

  }

}
