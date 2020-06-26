import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AuthService } from '../services/auth.service';
import { AuthPage } from '../pages/auth/auth';
import { ListNotifePage } from '../pages/list-notife/list-notife';
import { NotifeCreatePage } from '../pages/notife-create/notife-create';
import { NotifeDetailPage } from '../pages/notife-detail/notife-detail';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AjouterPage } from '../pages/ajouter/ajouter';
import { NotifesService } from '../services/notifes.service';
import { IndexPage } from '../pages/index';
import { CguPage } from '../pages/CGU/cgu';
import { PrefsPage } from '../pages/prefs/prefs';



// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    ListNotifePage,
    NotifeCreatePage,
    NotifeDetailPage,
    TutorialPage,
    CguPage,
    IndexPage,
    AjouterPage,
    PrefsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    ListNotifePage,
    CguPage,
    NotifeCreatePage,
    NotifeDetailPage,
    TutorialPage,
    IndexPage,
    AjouterPage,
    PrefsPage
  ],
  providers: [
    AuthService,
    NotifesService,
    Camera,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
