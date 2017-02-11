import { Route } from '@angular/router';
import { BizFramer, BizNgModule } from '@biznas/ng-core';

import { MenuItemConfig } from './menu-item.config';

export class MenuItemFramer extends BizFramer<MenuItemConfig> {

  public frame(bizNgModule: BizNgModule, route?: Route): void {
    if (!route) {
      console.warn('MenuItemFramer must be attached to route data');
      return;
    }

    super.frame(bizNgModule, route);
  }
}
