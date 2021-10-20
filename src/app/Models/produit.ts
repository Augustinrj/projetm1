export class Produit {
    nomprod: string;
    // tslint:disable-next-line:variable-name
    id_vendeur: number;
    // tslint:disable-next-line:variable-name
    id_cat: number;
    prix: number;
    actif: number;
    ref: number;
    description: string;
    stock: number;
    // tslint:disable-next-line:variable-name
    photoUrl: string;

    // tslint:disable-next-line:variable-name
    constructor(nomprod: string, id_vendeur: number, id_cat: number,
                // tslint:disable-next-line:variable-name
                prix: number, actif: number, ref: number, description: string, stock: number, photoUrl: string){
            this.nomprod = nomprod;
            this.id_vendeur = id_vendeur;
            this.id_cat = id_cat;
            this.prix = prix;
            this.actif = actif;
            this.ref = ref;
            this.description = description;
            this.stock = stock;
            this.photoUrl = photoUrl;
    }
}
