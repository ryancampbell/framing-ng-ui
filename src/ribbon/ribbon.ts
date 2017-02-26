import { ComponentFactoryResolver, Injector, Type } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ContainerOutletContent } from '@biznas/ng-core';

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
  containerContent?: ContainerOutletContent;

  /**
   * The route snapshot associated with this ribbon
   */
  routeSnapshot?: ActivatedRouteSnapshot;
}
