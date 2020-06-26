import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NotifeCreatePage } from './notife-create';

@NgModule({
  declarations: [
    NotifeCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(NotifeCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    NotifeCreatePage
  ]
})
export class NotifeCreatePageModule { }
