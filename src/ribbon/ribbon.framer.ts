import { Route } from '@angular/router';
import { AutowireFramerService, BizFramer, BizNgModule } from '@biznas/ng-core';

import { RibbonConfig } from './ribbon.config';
import { RibbonService } from './ribbon.service';

import * as _ from 'lodash';

export class RibbonFramer extends BizFramer<RibbonConfig> {

  /**
   * The instance of the framer service.
   */
  @AutowireFramerService(RibbonService)
  public framerService: RibbonService = undefined;

  /**
   * The frame function.
   */
  public frame(bizNgModule: BizNgModule, route?: Route): void {
    if (!route) {
      console.warn('RibbonFramer must be attached to route data');
      return;
    }

    super.frame(bizNgModule, route);

    if (!route.data) { route.data = {}; }

    (route.data as any).ribbon = {
      hasSave: this.config.hasSave,
      hasBack: this.config.hasBack,
    };
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
