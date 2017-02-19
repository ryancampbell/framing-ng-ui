import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { AutowireFramerService, Framer, FramingNgModule } from '@framing/ng-core';

import { BreadcrumbConfig } from './breadcrumb.config';
import { BreadcrumbResolver } from './breadcrumb.resolver';
import { BreadcrumbService } from './breadcrumb.service';

import * as _ from 'lodash';

export class BreadcrumbFramer extends Framer<BreadcrumbConfig> {

  /**
   * The instance of the framer service.
   */
  @AutowireFramerService(BreadcrumbService)
  public framerService: BreadcrumbService = undefined;

  constructor(config: BreadcrumbConfig) {
    super('BreadcrumbFramer', config);
  }

  /**
   * The frame function.
   */
  public frame(framingNgModule: FramingNgModule, route?: Route): void {
    if (!route) {
      console.warn('BreadcrumbFramer must be attached to route data');
      return;
    }

    super.frame(framingNgModule, route);

    if (!route.resolve) { route.resolve = {}; }

    (route.resolve as any).breadcrumb = BreadcrumbResolver;

    framingNgModule.providers([ BreadcrumbResolver ]);
  }
}
