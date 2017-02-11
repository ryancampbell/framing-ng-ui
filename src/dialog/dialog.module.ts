import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { DialogService } from './dialog.service';

@NgModule(Framing
  .ngModule({
    providers: [
      DialogService,
    ],
  })
  .frame())
export class DialogModule {}
