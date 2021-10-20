import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../Models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personUrl: string = 'http://localhost:3000/' + 'api/user/';
  private logged = false;
  constructor(private http: HttpClient) { }

  getUser(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personUrl);
  }

  getUserById(id: number): Observable<Person>{
    return this.http.get<Person>(this.personUrl + 'find/' + id);
  }

  getOneUser(lien: string): Observable<Person[]> {
    const lientxt = 'email/' + lien; //http://localhost:3000/api/user/email/augustin@gmail.com
    return this.http.get<Person[]>(this.personUrl + lientxt);
  }

  createUser(data: Person): Person {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // tslint:disable-next-line:no-string-literal
    this.http.post<any>(this.personUrl, { "nom" : data['nom'], "email": data['email'], "password": data['password'], "role_id": data['role_id'], "verification": 0 }, httpOptions).toPromise().then(data => { console.log(JSON.stringify(data)) });
    return data;
  }

  updateUser(data: Person): Observable<Person> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // tslint:disable-next-line:no-string-literal
    const urlUpdate = this.personUrl + 'update/' + data['id'];
    // tslint:disable-next-line:no-string-literal
    return this.http.put<any>(urlUpdate, { "nom": data['nom'], "email": data['email'], "password": data['password'], "role_id": data['role_id'], "verification": data['verification'] }, httpOptions);
  }

  // login () {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  // this.http.post<any>(this.personUrl, 
  // { "nom": "nom02", "email": "augustin@gmail.com", "password": "mot de passe", "role_id": 1, "verification": 0 }, httpOptions)
  // .toPromise().then(data => { console.log(JSON.stringify(data)) });
  // }
  // tslint:disable-next-line:typedef
  public get Logged() {
    return this.logged;
  }
  public set Logged(value) {
    this.logged = value;
  }
  getIPaddress(): number{
    this.http.get("http://localhost:3000/api/user/").subscribe((res: any) => {
      return res.ip;
    });
    return 0;
  }
}
