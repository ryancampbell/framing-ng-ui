import { NgModule } from '@angular/core';
import { Biz } from '@biznas/ng-core';

import { DialogService } from './dialog.service';

@NgModule(Biz
  .ngModule({
    providers: [
      DialogService,
    ],
  })
  .frame())
export class DialogModule {}
