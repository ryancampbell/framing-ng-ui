import { Injector, NgModule } from '@angular/core';
import { Biz } from '@biznas/ng-core';

import { BreadcrumbService } from './breadcrumb.service';

@NgModule(Biz
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
