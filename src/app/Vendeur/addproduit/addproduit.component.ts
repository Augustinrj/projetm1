import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categorie } from 'src/app/Models/categorie';
import { CategorieService } from 'src/app/Service/categorie.service';
import { PersonService } from 'src/app/Service/person.service';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.scss']
})
export class AddproduitComponent implements OnInit {

  addproduit: FormGroup;
  categories: Categorie[] = [];
  url: any = 'http://localhost:3000/api/images/5PJRFQj1fCmMlZNfzf2XSFAp.png'; // '../../../assets/image/logo.png';
  images: any;
  // tslint:disable-next-line:variable-name
  id_vendeur: number;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              private categorieservice: CategorieService,
              private personservice: PersonService) {
    this.addproduit = this.formBuilder.group({
      nomprod: [], categorie: [], description: [], nombre: [], stockexistant: []
    });
    this.categories = this.getCategorie();
    this.id_vendeur = this.getIdVendeur();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  save() {
    // let url = this.addproduit.value.nomprod;
    // // const image : File = e.target.files[0];
    // //console.log("Images : "+this.images.name);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //      //'Content-Type': 'multipart/form-data'
    //   })
    // };//api/user/photo
    // this.http.post<any>("http://localhost:3000/api/photo", { 'lien': url,'file': this.images }, httpOptions).toPromise()
    // .then(data => { console.log(JSON.stringify(data)) })
    // .catch(err=>{console.log(JSON.stringify(err))});
    // //return image;

    const formdata = new FormData();
    // tslint:disable-next-line:variable-name
    const categorie_id = this.addproduit.value.categorie;
    formdata.append('nomprod', this.addproduit.value.nomprod);
    formdata.append('id_cat', categorie_id);
    formdata.append('file', this.images, this.images.name);
    formdata.append('id_vendeur', String(this.id_vendeur));
    formdata.append('prix', this.addproduit.value.nombre);
    formdata.append('description', this.addproduit.value.description);
    formdata.append('stock', this.addproduit.value.stockexistant);
    this.http.post('http://localhost:3000/api/user/produit', formdata).subscribe((response) => {
      console.log('response receive ', response);
      // tslint:disable-next-line:object-literal-key-quotes
      this.addproduit.setValue({ 'nomprod': '', 'categorie': '', 'nombre': '', 'description': '', 'stockexistant': ''});
    });
  }
  // tslint:disable-next-line:typedef
  onchange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;

      const reader = new FileReader();
      reader.readAsDataURL(this.images);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    // console.log(event.target.files[0].name);
  }
  // tslint:disable-next-line:typedef
  getCategorie(){
    this.categorieservice.getCategorie().toPromise()
    .then(data => {
      this.categories = data;
      return data;
    }).catch();
    return this.categories;
  }

  getIdVendeur(): number{
    let email: any = '';
    if (localStorage.getItem('logged') !== null) {email = localStorage.getItem('logged'); }
    else { return 0; }
    this.personservice.getOneUser(email)
        .toPromise()
        .then(data => {
          if (data.length !== 0 ){
            // tslint:disable-next-line:prefer-for-of
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              // tslint:disable-next-line:no-string-literal
              this.id_vendeur = element['id'];
              // tslint:disable-next-line:no-string-literal
              console.log(' vendeur ' + String(element['id']));
            }
          }
        })
        .catch(err => { console.log(err); });
    return this.id_vendeur;
  }
}
