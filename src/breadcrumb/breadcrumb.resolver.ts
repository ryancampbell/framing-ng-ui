import { Injectable, Injector, Provider, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFactory, BreadcrumbFactoryInjector, BreadcrumbStatic } from './breadcrumb.config';
import { BreadcrumbFrame } from './breadcrumb.frame';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbResolver implements Resolve<Breadcrumb | BreadcrumbFactoryInjector> {

  static provider(f: BreadcrumbFrame): Provider {
    return {
      provide: BreadcrumbResolver,
      useFactory: (i: Injector) => new BreadcrumbResolver(f, i),
      deps: [ Injector ],
    };
  }

  constructor(
    private frame: BreadcrumbFrame,
    private injector: Injector,
  ) {}

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Breadcrumb | BreadcrumbFactoryInjector {
    if ((this.frame.config.breadcrumb as BreadcrumbStatic).label) {
      const breadcrumb = this.frame.config.breadcrumb as BreadcrumbStatic;
      const url = this.frame.buildUrlLink(route);
      const link = breadcrumb.link === false ? undefined : (_.isString(breadcrumb.link) ? breadcrumb.link : url);
      return {
        label: breadcrumb.label,
        icon: breadcrumb.icon,
        link,
      };
    } else {
      return new BreadcrumbFactoryInjector(this.frame.config.breadcrumb as Type<BreadcrumbFactory>, this.injector);
    }
  }
}
