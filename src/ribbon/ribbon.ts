import { ComponentFactoryResolver, Injector, Type } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
   * Ribbon content component.
   * Defaults to undefined.
   */
  contentComponent?: Type<any>;

  /**
   * Injector for the component factory resolver.
   */
  contentComponentInjector?: Injector;

  /**
   * The component factory resolver for the contentComponent.
   */
  contentComponentResolver?: ComponentFactoryResolver;

  /**
   * The route snapshot associated with this ribbon
   */
  routeSnapshot?: ActivatedRouteSnapshot;
}
