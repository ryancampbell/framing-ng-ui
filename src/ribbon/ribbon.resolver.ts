import { ComponentFactoryResolver, Injectable, Injector, Provider } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Ribbon } from './ribbon';
import { RibbonFrame } from './ribbon.frame';

import * as _ from 'lodash';

@Injectable()
export class RibbonResolver implements Resolve<Ribbon> {

  static provider(f: RibbonFrame): Provider {
    return {
      provide: RibbonResolver,
      useFactory: (i, r) => new RibbonResolver(f, i, r),
      deps: [ Injector, ComponentFactoryResolver ],
    };
  }

  constructor(
    private frame: RibbonFrame,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
  ) {}

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ribbon {
    let ribbon: Ribbon = {
      hasSave: this.frame.config.hasSave,
      hasBack: this.frame.config.hasBack,
    };
    return ribbon;
  }
}
