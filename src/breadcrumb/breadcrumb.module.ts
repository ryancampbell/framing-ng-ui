import { Injector, NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { BreadcrumbService } from './breadcrumb.service';

@NgModule(Framing
  .ngModule({
    providers: [
      BreadcrumbService,
    ],
  })
  .frame())
export class BreadcrumbModule {
  // constructor(injector: Injector) {
  //   injector.get(BreadcrumbService); // bootstrap the BreadcrumbService
  // }
}
