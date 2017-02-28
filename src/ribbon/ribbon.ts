import { ComponentFactoryResolver, Injector, Type } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BizContainerOutletContent } from '@biznas/ng-core';

export interface Ribbon {
  /**
   * Defaults to false.
   */
  hasSave?: boolean;

  /**
   * Defaults to false.
   */
  hasBack?: boolean;

  /**
   * Ribbon container content.
   * Defaults to undefined.
   */
  containerContent?: BizContainerOutletContent;

  /**
   * The route snapshot associated with this ribbon
   */
  routeSnapshot?: ActivatedRouteSnapshot;
}
