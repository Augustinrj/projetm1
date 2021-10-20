import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/Models/categorie';
import { CategorieService } from 'src/app/Service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  addcategorie: FormGroup;
  categories : Categorie[] =[];
  constructor(private formBuilder : FormBuilder,private http : HttpClient,
    private categorieservice : CategorieService) { 
    this.addcategorie = this.formBuilder.group({
      libelle: [null,Validators.required]
    });
    this.categories = this.getCategorie();
  }

  ngOnInit(): void {
  }
  
  saveCategorie(){
    let libelle = this.addcategorie.value.libelle;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };//api/user/photo
    this.http.post<any>("http://localhost:3000/api/user/categorie", { 'libelle': libelle}, httpOptions).toPromise()
    .then(data => { 
        console.log(JSON.stringify(data))
        this.categories.push(data);

        this.addcategorie.setValue({'libelle':""});
      })
    .catch(err=>{console.log(JSON.stringify(err))});
  }
  getCategorie(){
    this.categorieservice.getCategorie().toPromise()
                  .then(data=>{
                    this.categories = data;
                    return this.categories;
                  })
                  .catch(err => { console.log(JSON.stringify(err)) });
    return this.categories;
  }

  toogleActive (id: number, actif: number) {
    if (actif == 0) actif = 1;
    else actif = 0;

    let categorie : Categorie = new Categorie(0,"",0);
    this.categorieservice.getCategorieById(id).toPromise().then(data => {
      categorie['id'] = data['id'];
      categorie['libelle'] = data['libelle'];
      categorie['actif'] = actif;
      // console.log("id : " + categorie.id + "actif : " +categorie.actif);
      if (this.categorieservice.updateCategorie(categorie).toPromise() != null) {
        console.log("update succefully");
        this.categories = this.getCategorie();
      }

    });
    // new categorie(id, nom, email, password, typeCompte, actif);


  }

}
