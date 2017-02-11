import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { AutowireFramer } from '@framing/ng-core';

import { Ribbon } from './ribbon';
import { RibbonFramer } from './ribbon.framer';

import * as _ from 'lodash';

@Injectable()
export class RibbonResolver implements Resolve<Ribbon> {

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
  ) {}

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ribbon {
    let framer = route.data && (route.data as any).ribbonFramer ? (route.data as any).ribbonFramer as RibbonFramer : undefined;
    if (framer) {
      return {
        hasSave: framer.config.hasSave,
        hasBack: framer.config.hasBack,
        contentComponent: framer.config.contentComponent,
        contentComponentInjector: this.injector,
        contentComponentResolver: this.resolver,
      };
    } else {
      console.warn('Expecting ribbonFramer in route data');
      return undefined;
    }
  }
}
