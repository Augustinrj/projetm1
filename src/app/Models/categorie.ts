export class Categorie {
    id : number;
    libelle : string;
    actif : number;

    constructor(id:number,libelle : string,actif:number){
        this.id =  id;
        this.libelle = libelle;
        this.actif = actif;
    }
    
}
