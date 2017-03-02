import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { Framer, FramingNgModule } from '@framing/ng-core';

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
  public frame(framing: FramingNgModule): void {
    this.requireRoute();

    framing
      .resolves({ breadcrumb: BreadcrumbResolver }, this.route)
      .provide(BreadcrumbResolver.provider(this.theFrame as BreadcrumbFrame));
  }
}
