import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { AutowireFramer } from '@biznas/ng-core';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFramer } from './breadcrumb.framer';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbResolver implements Resolve<Breadcrumb> {

  /**
   * Resolve hook.
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Breadcrumb {
    let framer = route.data && (route.data as any).breadcrumbFramer ? (route.data as any).breadcrumbFramer as BreadcrumbFramer : undefined;
    if (framer) {
      let url = this.buildUrlLink(route);
      let link = framer.config.link === false ? undefined : (_.isString(framer.config.link) ? framer.config.link : url);
      return {
        label: this.resolveBreadcrumbLabel(framer.config.label, link, url),
        active: link === state.url,
        icon: framer.config.icon,
        link,
      };
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

  /**
   * Helper function to build the URL of an ActivatedRouteSnapshot
   */
  private buildUrlLink(route: ActivatedRouteSnapshot): string {
    let urls: UrlSegment[] = [];
    for (; route.parent; route = route.parent) {
      urls = urls.concat(route.url.reverse());
    }
    urls = urls.reverse();
    return '/' + urls.join('/');
  }
}
