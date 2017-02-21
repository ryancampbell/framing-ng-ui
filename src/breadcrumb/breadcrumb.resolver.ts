import { Injectable, Injector, Provider, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AutowireFramer } from '@framing/ng-core';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFactory, BreadcrumbFactoryInjector, BreadcrumbStatic } from './breadcrumb.config';
import { BreadcrumbFramer } from './breadcrumb.framer';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbResolver implements Resolve<Breadcrumb | BreadcrumbFactoryInjector> {

  static provider(f: BreadcrumbFramer): Provider {
    return {
      provide: BreadcrumbResolver,
      useFactory: (i) => new BreadcrumbResolver(f, i),
      deps: [ Injector ],
    };
  }

  constructor(
    private framer: BreadcrumbFramer,
    private injector: Injector,
  ) {}

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Breadcrumb | BreadcrumbFactoryInjector {
    if ((this.framer.config.breadcrumb as BreadcrumbStatic).label) {
      const breadcrumb = this.framer.config.breadcrumb as BreadcrumbStatic;
      const url = this.framer.buildUrlLink(route);
      const link = breadcrumb.link === false ? undefined : (_.isString(breadcrumb.link) ? breadcrumb.link : url);
      return {
        label: breadcrumb.label,
        icon: breadcrumb.icon,
        link,
      };
    } else {
      return new BreadcrumbFactoryInjector(this.framer.config.breadcrumb as Type<BreadcrumbFactory>, this.injector);
    }
  }
}
