import { Notife } from'./notife';

export interface NotifeSauvegarde {

    item: Notife,
    quoi: string,
    titre: string,
    quand: string,
    codePostal: number, 
    commune: string,
     profilePic : string, 
     infoPra: string, 
     adresse: string, 
     email: string, 
     horaire: string, 
     infosSupp: string, 
     nameContact: string, 
     emailContact: string, 
     statusContact: string, 
     statusNotife: string,
}