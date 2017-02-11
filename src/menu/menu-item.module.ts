import { NgModule } from '@angular/core';
import { Biz } from '@biznas/ng-core';

import { MenuItemService } from './menu-item.service';

@NgModule(Biz
  .ngModule({
    providers: [
      MenuItemService,
    ],
  })
  .frame())
export class MenuItemModule {}
