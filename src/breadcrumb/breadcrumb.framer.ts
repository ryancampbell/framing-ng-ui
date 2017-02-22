import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { AutowireFramerService, Framer, FramingNgModule } from '@framing/ng-core';

import { BreadcrumbConfig } from './breadcrumb.config';
import { BreadcrumbFrame } from './breadcrumb.frame';
import { BreadcrumbResolver } from './breadcrumb.resolver';

export class BreadcrumbFramer extends Framer<BreadcrumbConfig> {

  /**
   * Constructor.
   */
  constructor(
    config?: BreadcrumbConfig,
  ) {
    super(new BreadcrumbFrame(config));
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

    framingNgModule.provide(BreadcrumbResolver.provider(this.theFrame as BreadcrumbFrame));
  }
}
