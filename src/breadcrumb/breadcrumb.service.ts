import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFramer } from './breadcrumb.framer';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbService {

  public breadcrumbs$: ReplaySubject<Breadcrumb[]> = new ReplaySubject<Breadcrumb[]>(1);

  private subscriptions: AnonymousSubscription[] = [];

  private breadcrumbs: Breadcrumb[];

  constructor(
    private router: Router,
  ) {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.collectBreadcrumbs(this.router.routerState.snapshot.root);
        this.breadcrumbs$.next(_.clone(this.breadcrumbs));
      }
    }));
  }

  private collectBreadcrumbs(snapshot: ActivatedRouteSnapshot, lastCollectedFrom?: BreadcrumbFramer): void {
    if (snapshot.data && (snapshot.data as any).breadcrumb) {
      let framer = (snapshot.data as any).breadcrumbFramer as BreadcrumbFramer;
      if (framer !== lastCollectedFrom) {
        this.breadcrumbs.push((snapshot.data as any).breadcrumb as Breadcrumb);
        lastCollectedFrom = framer;
      }
    }
    for (let child of snapshot.children) {
      this.collectBreadcrumbs(child, lastCollectedFrom);
    }
  }
}
