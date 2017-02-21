import { ComponentFactoryResolver, Injectable, Injector, Provider } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Ribbon } from './ribbon';
import { RibbonFramer } from './ribbon.framer';

import * as _ from 'lodash';

@Injectable()
export class RibbonResolver implements Resolve<Ribbon> {

  static provider(f: RibbonFramer): Provider {
    return {
      provide: RibbonResolver,
      useFactory: (i, r) => new RibbonResolver(f, i, r),
      deps: [ Injector, ComponentFactoryResolver ],
    };
  }

  constructor(
    private framer: RibbonFramer,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
  ) {}

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ribbon {
    let ribbon: Ribbon = {
      hasSave: this.framer.config.hasSave,
      hasBack: this.framer.config.hasBack,
    };
    return ribbon;
  }
}
