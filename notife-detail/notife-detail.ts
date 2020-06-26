import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController, ToastOptions, AlertController, LoadingController } from 'ionic-angular';
import { NotifesService } from '../../services/notifes.service';
import { Notife } from '../../models/notife';
import { NotifeSauvegarde } from '../../models/interface-notife';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notife-detail',
  templateUrl: 'notife-detail.html'
})
export class NotifeDetailPage {
  index: number;
  notife: Notife;
  sauvegardeNotife : NotifeSauvegarde[];


  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public modal: ModalController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public toastCtrl : ToastController,
    public notifesService: NotifesService) {
    
  }
  ngOnInit() {
    this.index = this.navParams.get('index');
    this.notife = this.notifesService.notifesList[this.index];
  }
  dismissModal() {
    this.viewCtrl.dismiss();
  }

  addToPref(notife : Notife): void {
    let added : boolean = false;
    this.storage.get("Pref").then((data : NotifeSauvegarde[]) =>{
      if(data === null || data.length === 0 ) {
        data = [];
        data.push ({
          item: notife,
          quoi: notife.quoi, 
           quand: notife.quand,
           titre : notife.titre, 
           commune: notife.commune, 
           codePostal: notife.codePostal,
           infoPra: notife.infoPra,
           adresse: notife.adresse,
           email: notife.email,
           horaire: notife.horaire,
           infosSupp: notife.infosSupp,
           nameContact: notife.nameContact,
           emailContact: notife.emailContact,
           statusContact: notife.statusContact,
           statusNotife: notife.statusNotife,
           profilePic: notife.profilePic,   
        })
      }
      else{
  
        for(let i = 0; i< data.length; i++) {
          const element : NotifeSauvegarde = data[i];
          if(notife.quand === element.item.quand){
            added = true;
          }
        } 
        if (!added){
          data.push ({
            item: notife,
            quoi: notife.quoi, 
             quand: notife.quand,
             titre : notife.titre, 
             commune: notife.commune, 
             codePostal: notife.codePostal,
             infoPra: notife.infoPra,
             adresse: notife.adresse,
             email: notife.email,
             horaire: notife.horaire,
             infosSupp: notife.infosSupp,
             nameContact: notife.nameContact,
             emailContact: notife.emailContact,
             statusContact: notife.statusContact,
             statusNotife: notife.statusNotife,
             profilePic: notife.profilePic,   
  
          })
        }
      }
      this.storage.set("Pref", data)
      .then(data => {
        let options : ToastOptions = {
          message : "Cette événement est dans vos favoris",
          duration :2000,
          showCloseButton: true,
          closeButtonText: "Fermer",
          position: 'top',
      };
        this.toastCtrl.create(options).present();
      })
      .catch(err => {

      })
    })
  } 
  
  onSaveList() {
    let loader = this.loadingCtrl.create({
    });
    loader.present();
    this.notifesService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 1000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 1000,
          position: 'bottom'
        }).present();
      }
    );
  }
  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.notifesService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 1000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 1000,
          position: 'bottom'
        }).present();

        this.onSaveList();
      }
    );
  }  

changerStatusContact() {
    if(this.notife.statusContact === 'jvais') {
      this.notifesService.switchOnGo(this.index);
    } else if(this.notife.statusContact === 'jvaispas') {
      this.notifesService.switchOffGo(this.index);
  }

}
retourStatusContact() {
  return this.notife.statusContact;
}

}
