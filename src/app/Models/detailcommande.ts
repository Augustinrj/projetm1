export class Detailcommande {
    idpro :number;
    idcommande : number;
    nombre : number;

    constructor(idpro:number,idcommande : number,nombre : number){
        this.idpro = idpro;
        this.idcommande = idcommande;
        this.nombre = nombre;
    }
}
