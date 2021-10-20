import { Photo } from './../Models/photo';
import { Produit } from './../Models/produit';
import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../Service/produit.service';
import { PhotoService } from '../Service/photo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  url: string;
  produits: Produit[] = [];
  constructor(private produitservice: ProduitService) {
     this.produits = this.getProduit();
     this.url = 'http://localhost:3000/api/images/5PJRFQj1fCmMlZNfzf2XSFAp.png';
  }

  ngOnInit(): void {
  }

  getProduit(): Produit[] {
    this.produits = this.produitservice.getProduit();
    return this.produits;
  }

  // getImageUrl(photoId: number): string{
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.url = 'http://localhost:3000/api/images/5PJRFQj1fCmMlZNfzf2XSFAp.png';
  //   // let photo: Photo;
  //   // // photo = this.produitservice.getUrlphoto(1);
  //   // // url = this.photoservice.getImageFromUrl(photo.url);
  //   // this.url = 'http://localhost:3000/api/images/' + photo.url;
  //   return this.url;
  // }

  finder(e: any): void {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.produits.length; index++) {
      this.produits.pop();
    }
    this.produits = this.produitservice.getProduitByText(e.target.value);
    this.produits.push();
    // this.produits = this.produitservice.getProduitByText(e.target.value);
    console.log(this);
  }
}
