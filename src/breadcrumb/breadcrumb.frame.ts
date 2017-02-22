import { AutowireFramerService, Frame } from '@framing/ng-core';

import { BreadcrumbConfig } from './breadcrumb.config';
import { BreadcrumbService } from './breadcrumb.service';

export class BreadcrumbFrame extends Frame<BreadcrumbConfig> {

  /**
   * The instance of the framer service.
   */
  @AutowireFramerService(BreadcrumbService)
  public framerService: BreadcrumbService = undefined;
}
