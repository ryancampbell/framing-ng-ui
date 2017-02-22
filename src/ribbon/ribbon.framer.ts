import { Route } from '@angular/router';
import { AutowireFramerService, Framer, FramingNgModule } from '@framing/ng-core';

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
  public frame(framingNgModule: FramingNgModule, route?: Route): void {
    if (!route) {
      console.warn('RibbonFramer must be attached to route data');
      return;
    }

    super.frame(framingNgModule, route);

    if (this.config.contentComponent && this.config.contentComponentContainer) {
      framingNgModule
        .container(this.config.contentComponentContainer, this.config.contentComponent, route);
    }

    if (!route.resolve) { route.resolve = {}; }

    (route.resolve as any).ribbon = RibbonResolver;

    framingNgModule.provide(RibbonResolver.provider(this.theFrame as RibbonFrame));
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
