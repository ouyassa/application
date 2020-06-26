import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListNotifePage } from './list-notife';

@NgModule({
  declarations: [
    ListNotifePage,
  ],
  imports: [
    IonicPageModule.forChild(ListNotifePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListNotifePage
  ]
})
export class ListNotifePageModule { }
