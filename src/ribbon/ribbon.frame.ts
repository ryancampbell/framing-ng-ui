import { AutowireFramerService, Frame } from '@framing/ng-core';

import { RibbonConfig } from './ribbon.config';
import { RibbonService } from './ribbon.service';

export class RibbonFrame extends Frame<RibbonConfig> {

  /**
   * The instance of the framer service.
   */
  @AutowireFramerService(RibbonService)
  public framerService: RibbonService = undefined;
}
