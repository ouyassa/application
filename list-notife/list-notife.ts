import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ViewController, MenuController } from 'ionic-angular';

import { Notife } from '../../models/notife';
import { NotifeCreatePage } from '../notife-create/notife-create';
import { NotifeDetailPage } from '../notife-detail/notife-detail';
import { Subscription } from 'rxjs/Subscription';
import { NotifesService } from '../../services/notifes.service';
import { PrefsPage } from '../prefs/prefs';

@IonicPage()
@Component({
  selector: 'page-list-notife',
  templateUrl: 'list-notife.html'
})
export class ListNotifePage {
  notifesList: any= [];
  notifesSubscription: Subscription;
  Notife: any;
  codePostal: number = 12;
  


  constructor(
    public navCtrl: NavController, 
    private menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private notifesService: NotifesService,  
    public viewCtrl: ViewController,) { 
  }


  ngOnInit() {
    this.notifesSubscription = this.notifesService.notifes$.subscribe(
      (notifes: Notife[]) => {
        this.notifesList = notifes.slice();
      }
    );
    this.notifesService.emitNotifes();
  }

fonctionNotifeList() {
  this.notifesList = this.notifesService.notifesList;
}

  filterNotifeData (ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.notifesList = [];
      return;
    }
    this.notifesList = this.notifesList.filter((notife)=>{
      return (notife.codePostal.toLowerCase().indexOf(val.toLowerCase())>-1);
    });
  }
  
  ionViewWillEnter() {
    this.notifesList = this.notifesService.notifesList.slice();


  }
  ngOnDestroy() {
    this.notifesSubscription.unsubscribe();
  }
  addNotife() {
    this.navCtrl.push(NotifeCreatePage);
}
 
  onLoadNotife(index: number) {
    let modal = this.modalCtrl.create(NotifeDetailPage, {index: index});
    modal.present();
  }

  openNotife(notife: Notife) {
    this.navCtrl.push(NotifeDetailPage, {
      notife: notife
    });
  }
  onLoadPref(index: number) {
    let modal = this.modalCtrl.create(PrefsPage, {index: index});
    modal.present();
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }
  
}
