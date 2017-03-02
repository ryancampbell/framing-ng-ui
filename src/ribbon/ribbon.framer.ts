import { Route } from '@angular/router';
import { Framer, FramingNgModule } from '@framing/ng-core';

import { RibbonConfig } from './ribbon.config';
import { RibbonFrame } from './ribbon.frame';
import { RibbonResolver } from './ribbon.resolver';

export class RibbonFramer extends Framer<RibbonConfig> {

  /**
   * Constructor.
   */
  constructor(
    config?: RibbonConfig,
  ) {
    super(new RibbonFrame(config));
  }

  /**
   * The frame function.
   */
  public frame(framing: FramingNgModule): void {
    this.requireRoute();

    if (this.config.contentComponent && this.config.contentComponentContainer) {
      framing.container(this.config.contentComponentContainer, this.config.contentComponent, this.route);
    }

    framing
      .resolves({ ribbon: RibbonResolver }, this.route)
      .provide(RibbonResolver.provider(this.theFrame as RibbonFrame));
  }

  /**
   * Default configuration override.
   */
  public defaultConfig(): RibbonConfig {
    return {
      hasSave: false,
      hasBack: false,
    };
  }
}
