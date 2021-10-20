import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../Models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorieUrl: string = "http://localhost:3000/api/user/categorie/";
  private logged = false;
  constructor(private http: HttpClient) { }

  getCategorie(): Observable < Categorie[] >{
  return this.http.get<Categorie[]>(this.categorieUrl);
  }

  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.categorieUrl + "find/" + id);
  }

  updateCategorie(data: Categorie): Observable<Categorie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let urlUpdate = this.categorieUrl + "update/" + data['id'];
    // console.log("URL :" + urlUpdate + " libelle : " + data['libelle'] + " actif : " + data['actif']);
    return this.http.put<any>(urlUpdate, { "libelle": data['libelle'], "actif": data['actif']}, httpOptions);
  }
}
