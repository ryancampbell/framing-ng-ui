import { Injectable, Injector, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AutowireFramer } from '@framing/ng-core';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFactory, BreadcrumbFactoryBootstrap, BreadcrumbStatic } from './breadcrumb.config';
import { BreadcrumbFramer } from './breadcrumb.framer';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbResolver implements Resolve<Breadcrumb | BreadcrumbFactoryBootstrap> {

  constructor(
    private injector: Injector,
  ) {}

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Breadcrumb | BreadcrumbFactoryBootstrap {
    let framer = route.data && (route.data as any).breadcrumbFramer ? (route.data as any).breadcrumbFramer as BreadcrumbFramer : undefined;
    if (framer) {
      if ((framer.config.breadcrumb as BreadcrumbStatic).label) {
        const breadcrumb = framer.config.breadcrumb as BreadcrumbStatic;
        const url = framer.buildUrlLink(route);
        const link = breadcrumb.link === false ? undefined : (_.isString(breadcrumb.link) ? breadcrumb.link : url);
        return {
          label: this.resolveBreadcrumbLabel(breadcrumb.label, link, url),
          icon: breadcrumb.icon,
          link,
        };
      } else {
        let result = { factory: framer.config.breadcrumb as Type<BreadcrumbFactory>, injector: this.injector };
        console.error(result);
        return result;
      }
    } else {
      console.warn('Expecting breadcrumbFramer in route data');
      return undefined;
    }
  }

  /**
   * Resolves the breadcrumb label given the configured label, link & url.
   * To be overridden if needed.
   */
  protected resolveBreadcrumbLabel(label: string, link: string, url: string): string {
    return label;
  }
}
