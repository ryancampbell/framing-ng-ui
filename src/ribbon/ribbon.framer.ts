import { Route } from '@angular/router';
import { AutowireFramerService, Framer, FramingNgModule } from '@framing/ng-core';

import { RibbonConfig } from './ribbon.config';
import { RibbonResolver } from './ribbon.resolver';
import { RibbonService } from './ribbon.service';

import * as _ from 'lodash';

export class RibbonFramer extends Framer<RibbonConfig> {

  /**
   * The instance of the framer service.
   */
  @AutowireFramerService(RibbonService)
  public framerService: RibbonService = undefined;

  /**
   * The frame function.
   */
  public frame(framingNgModule: FramingNgModule, route?: Route): void {
    if (!route) {
      console.warn('RibbonFramer must be attached to route data');
      return;
    }

    if (this.config.contentComponent) {
      framingNgModule
        .declare(this.config.contentComponent)
        .entryComponent(this.config.contentComponent);
    }

    super.frame(framingNgModule, route);

    if (!route.resolve) { route.resolve = {}; }

    (route.resolve as any).ribbon = RibbonResolver;
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
