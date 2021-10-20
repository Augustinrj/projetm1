import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { PersonService } from '../Service/person.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  logged: string = '';
  admin: string = '';
  vendeur: string = '';
  client: string = '';
  constructor(private personservice : PersonService) { 
    console.log(personservice.Logged);
    if (localStorage.getItem('logged') != null){
      let loggedU = localStorage.getItem('logged') !== null ? (localStorage.getItem('logged')) : '';
      if(loggedU != undefined)this.logged = loggedU;
    }

    if (sessionStorage.getItem('role_user') != null) {
      let roleUs = sessionStorage.getItem('role_user') !== null ? (sessionStorage.getItem('role_user')) : '';
      if (roleUs != undefined){
        if (roleUs == '1') this.admin = roleUs;
        else if (roleUs == '2')this.vendeur = roleUs;
        else this.client = roleUs;
      }
    }
  }

  ngOnInit(): void {
  }
  disconnect(){
    LoginComponent.logout();
  }

  // onchange(event: any) {
  //   if (event.target.) {

  //   }
  //   // console.log(event.target.files[0].name);
  // }
}
