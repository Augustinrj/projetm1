import { PhotoService } from './photo.service';
import { Produit } from './../Models/produit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../Models/photo';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  photo: Photo;
  textUrl: string[] = [];
  produits: Produit[] = [];
  constructor(private http: HttpClient, private photoservice: PhotoService) {
    // this.produits = this.getProduit();
    this.photo = new Photo('', 1);
  }

  getProduit(): Produit[] {
    this.http.get<Produit[]>('http://localhost:3000/api/user/produit')
      .toPromise()
      .then(data => {
        if (data.length !== 0){
          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            this.produits.push(element);
            // console.log(' url ' + this.getUrlphoto(element.photo_id));
          }
        }
      })
      .catch();
    return this.produits;
  }

  // tslint:disable-next-line:variable-name
  getUrlphoto( photo_id: number): string[]{
    if (photo_id !== null){
      this.photoservice.getPhoto(photo_id)
    .toPromise()
    .then(data => {
      this.textUrl.push(data.url);
    })
    .catch();
    }
    return this.textUrl;
  }

  getProduitByText(valeur: string): Produit[] {
    this.http.get<Produit[]>('http://localhost:3000/api/user/produit/?nomprod=' + valeur)
      .toPromise()
      .then(data => {
        if (data.length !== 0){
          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            this.produits.push(element);
            // console.log(' url ' + this.getUrlphoto(element.photo_id));
          }
        }
      })
      .catch();
    return this.produits;
  }

}
