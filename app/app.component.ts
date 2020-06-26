import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, NavController, MenuController, ToastController, LoadingController} from 'ionic-angular';
import * as firebase from 'firebase';

import { AuthPage } from '../pages/auth/auth';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { NotifeCreatePage } from '../pages/notife-create/notife-create';
import { ListNotifePage } from '../pages/list-notife/list-notife';
import { IndexPage } from '../pages/index';
import { CguPage } from '../pages/CGU/cgu';
import { NotifesService } from '../services/notifes.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  authPage: any = AuthPage;
  cguPage: any = CguPage;
  tutorialPage: any = TutorialPage;
  notifeCreatePage: any = NotifeCreatePage;
  listNotifePage: any = ListNotifePage;
  indexPage = IndexPage;
  @ViewChild('content') content: NavController;
  @ViewChild(Nav) nav: Nav;

    isAuth: boolean;
    email = '';
    userId ='';
    method ='';

  constructor(
    private menuCtrl: MenuController, 
    private translate: TranslateService, 
    platform: Platform, 
    private config: Config, 
    private statusBar: StatusBar,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public notifesService: NotifesService,
    private splashScreen: SplashScreen) {
      
      let configur = {
        apiKey: "AIzaSyD4eLCeOtGrY5-MwJTaDH9HTaDH--ZBVPc",
        authDomain: "client-ouyassa-d709d.firebaseapp.com",
        databaseURL: "https://client-ouyassa-d709d.firebaseio.com",
        projectId: "client-ouyassa-d709d",
        storageBucket: "client-ouyassa-d709d.appspot.com",
        messagingSenderId: "971308298926",
        appId: "1:971308298926:web:fa53f9441f369f621af33f",
        measurementId: "G-LQFEJJSG62"
      };
      firebase.initializeApp(configur);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(IndexPage);
            console.log(user.email)
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'new'});
          }
        }
      );
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    
    });
    this.initTranslate();
  }


  
  ngOnInit(){
    this.onFetchList()

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
}
onDisconnect() {
  firebase.auth().signOut();
  this.menuCtrl.close();
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
        duration: 3000,
        position: 'bottom'
      }).present();
    },
    (error) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  );
}  
}
