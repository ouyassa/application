import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NotifeDetailPage } from './notife-detail';

@NgModule({
  declarations: [
    NotifeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotifeDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    NotifeDetailPage
  ]
})
export class NotifeDetailPageModule { }
