import { Injector, NgModule } from '@angular/core';
import { Biz } from '@biznas/ng-core';

import { RibbonService } from './ribbon.service';

@NgModule(Biz
  .ngModule({
    providers: [
      RibbonService,
    ],
  })
  .frame())
export class RibbonModule {
  // constructor(injector: Injector) {
  //   injector.get(RibbonService); // bootstrap the RibbonService
  // }
}
