import { Route } from '@angular/router';
import { BizFramer, BizNgModule } from '@biznas/ng-core';

import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.config';

export class DialogFramer extends BizFramer<DialogConfig> {

  public frame(bizNgModule: BizNgModule, route?: Route): void {
    super.frame(bizNgModule, route);

    bizNgModule
      .component(DialogComponent)
      .declare(this.config.component);
  }
}
