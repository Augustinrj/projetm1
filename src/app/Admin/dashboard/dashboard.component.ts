import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/Models/person';
import { PersonService } from 'src/app/Service/person.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  persons: Person[] = [];
  constructor(private personservice: PersonService) {
    personservice.getUser()
      .toPromise()
      .then(data => {
        if (data.length !== 0){
          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            this.persons.push(data[index]);
          }
        }
      })
      .catch(err => console.log(JSON.stringify(err)))
      .finally();
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  toogleActive(id: number, verification: number){
    console.log('id : ' + id + 'verification : ' + verification);
    if (verification === 0) { verification = 1; }
    else { verification = 0; }

    const personN: Person = new Person(0, '', '', '', 5, 0);
    this.personservice.getUserById(id).toPromise().then(data => {
      personN.id = data.id;
      personN.nom = data.nom;
      personN.email = data.email;
      personN.password = data.password;
      personN.role_id = data.role_id;
      personN.verification = verification;
      console.log('id : ' + personN.id);

      if (this.personservice.updateUser(personN).toPromise() !== null) {
        console.log('update succefully');
        this.personservice.getUser()
          .toPromise()
          // tslint:disable-next-line:no-shadowed-variable
          .then(data => {
            if (data.length !== 0) {
              this.persons = data;
            }
          })
          .catch(err => console.log(JSON.stringify(err)))
          .finally();
      }

    });
    // new Person(id, nom, email, password, typeCompte, verification);


  }
}
