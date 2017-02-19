import { Route } from '@angular/router';
import { Framer, FramingNgModule } from '@framing/ng-core';

import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.config';

export class DialogFramer extends Framer<DialogConfig> {

  constructor(config: DialogConfig) {
    super('DialogFramer', config);
  }

  public frame(framingNgModule: FramingNgModule, route?: Route): void {
    super.frame(framingNgModule, route);

    framingNgModule
      .component(DialogComponent)
      .declare(this.config.component);
  }
}
