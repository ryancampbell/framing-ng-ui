import { Injector, NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { RibbonService } from './ribbon.service';

@NgModule(Framing
  .ngModule()
  .providers([
    RibbonService,
  ])
  .frame())
export class RibbonModule {}
