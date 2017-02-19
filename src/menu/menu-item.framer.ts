import { Route } from '@angular/router';
import { Framer, FramingNgModule } from '@framing/ng-core';

import { MenuItemConfig } from './menu-item.config';

export class MenuItemFramer extends Framer<MenuItemConfig> {

  constructor(config: MenuItemConfig) {
    super('MenuItemFramer', config);
  }

  public frame(framingNgModule: FramingNgModule, route?: Route): void {
    if (!route) {
      console.warn('MenuItemFramer must be attached to route data');
      return;
    }

    super.frame(framingNgModule, route);
  }
}
