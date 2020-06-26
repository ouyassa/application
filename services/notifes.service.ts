import { Notife } from '../models/notife';
import { Subject } from 'rxjs/Subject';
import DataSnapshot = firebase.database.DataSnapshot;
import firebase from 'firebase';


export class NotifesService {

  notifes$ = new Subject<Notife[]>();

  notifesList: Notife [] =[];
   
  public infoPras = [
    { id: 1, info: 'Buvette'},
    { id: 2, info: 'Entrée Gratuite'},
    { id: 3, info: 'Petite Restauration'},
    { id: 4, info: 'Ateliers'}, 
    { id: 5, info: 'jeux pour Enfants'},
    { id: 6, info: 'Réservation obligatoire'}
  ];
    public quois: any[]= [
    {id: 0, quoi: ' Fête de village'},
    {id: 21, quoi: 'Bal'},
    {id: 9, quoi: 'Ball-Trap'},
    {id: 9, quoi: 'Bourse aux jouet'},
    {id: 1, quoi: 'Brocante'},
    {id: 10, quoi: 'Cave Porte Ouverte'},
    {id: 24, quoi: 'Chantier Participatif'},
    {id: 28, quoi: 'Collecte'},
    {id: 22, quoi: 'Concert'},
    {id: 3, quoi: 'Concours de Carte'},
    {id: 7, quoi: 'Concours Petanque'},
    {id: 8, quoi: 'Concours de : '},
    {id: 25, quoi: 'Coup de pouce'},
    {id: 18, quoi: 'Festival de rue'},
    {id: 19, quoi: 'Festival de Musique'},
    {id: 20, quoi: 'Festival de : '},
    {id: 2, quoi: 'Loto/Bingo'},
    {id: 13, quoi: 'Marché'},
    {id: 31, quoi: 'Marché de Noël'},
    {id: 32, quoi: 'Marché Paysan'},    
    {id: 11, quoi: 'Porte Ouverte'},
    {id: 15, quoi: 'Randonnée'},
    {id: 23, quoi: 'Rassemblement de :'},
    {id: 29, quoi: 'Réunion Publique'},    
    {id: 14, quoi: 'Salon'},
    {id: 16, quoi: 'Théatre'},
    {id: 4, quoi: 'Tournoi de foot'},
    {id: 5, quoi: 'Tournoi Sportif'},
    {id: 6, quoi: 'Tournoi de : '},
    {id: 30, quoi: 'Vente de :  '},
    {id: 26, quoi: 'Vernissage'},
    {id: 12, quoi: 'Vide Grenier'},
    {id: 17, quoi: 'Visite '},
    {id: 27, quoi: '(autre, on vous rappel)'},
  ];
      
      addNotife(notife: Notife) {
        this.notifesList.push(notife);
        this.emitNotifes();

      }
      emitNotifes() {
        this.notifes$.next(this.notifesList.slice());
      }
      saveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('notifes').set(this.notifesList).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      retrieveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('notifes').once('value').then(
            (data: DataSnapshot) => {
              this.notifesList = data.val();
              this.emitNotifes();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
      }
      delete(notifesList: Notife) {
      }
      switchOnGo(i: number) {
        this.notifesList[i].statusContact = "jvaispas";
        this.saveData();
      }
    
      switchOffGo(i: number) {
        this.notifesList[i].statusContact = "jvais";
        this.saveData();
      }
    }