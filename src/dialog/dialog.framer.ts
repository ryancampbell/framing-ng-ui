import { Route } from '@angular/router';
import { Framer, FramingNgModule } from '@framing/ng-core';

import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.config';
import { DialogFrame } from './dialog.frame';

export class DialogFramer extends Framer<DialogConfig> {

  /**
   * Constructor.
   */
  constructor(
    config?: DialogConfig,
  ) {
    super(new DialogFrame(config));
  }

  /**
   * The frame function.
   */
  public frame(framingNgModule: FramingNgModule, route?: Route): void {

    framingNgModule
      .component(DialogComponent)
      .declare(this.config.component);
  }
}
