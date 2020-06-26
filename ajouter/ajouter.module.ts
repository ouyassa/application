import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AjouterPage } from './ajouter';

@NgModule({
  declarations: [
    AjouterPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterPage),
    TranslateModule.forChild()
  ],
  exports: [
    AjouterPage
  ]
})
export class AjouterPageModule { }
