import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from '../Models/person';
import { PersonService } from '../Service/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    typeCompte: new FormControl(""),
    nom: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  });
  emailReg : string ="" ;
  constructor( private personservice: PersonService) {
    if (sessionStorage.getItem("email") != null) {
      let loggedU = sessionStorage.getItem("email") !== null ? (sessionStorage.getItem("email")) : "";
      if(loggedU!=undefined)this.emailReg = loggedU;
    }
  }

  ngOnInit (): void {
    
  }

  save () {
    let email = this.registerForm.value.email;
    let typeCompte = this.registerForm.value.typeCompte;
    let nom = this.registerForm.value.nom;
    let password = this.registerForm.value.password;
    let person = new Person(0, nom, email, password, typeCompte, 0);

    if(this.personservice.createUser(person)!==null){
      sessionStorage.setItem("email",email);
      window.location.href="http://localhost:4200/login";
    }
  }
  login(){

  }

  

}
