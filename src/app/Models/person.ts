export class Person {
     id: number;
     nom: string;
     email: string;
     password: string;
     // tslint:disable-next-line:variable-name
     role_id!: number;
     verification: number;

    // tslint:disable-next-line:variable-name
    constructor(id: number, nom: string, email: string, password: string, role_id: number, verification: number){
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
        this.verification = verification;
    }

    public getNom(): string{
        return this.nom;
    }

    // tslint:disable-next-line:typedef
    public getVerification(){
        return this.verification;
    }
}
