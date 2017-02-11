import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Emitter, ReplayEmitter } from '@biznas/ng-core';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFramer } from './breadcrumb.framer';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbService {

  public breadcrumbs: Emitter<Breadcrumb[]> = new ReplayEmitter<Breadcrumb[]>();

  private subscriptions: AnonymousSubscription[] = [];

  private breadcrumbsStore: Breadcrumb[];

  constructor(
    private router: Router,
  ) {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbsStore = [];
        this.collectBreadcrumbs(this.router.routerState.snapshot.root);
        this.breadcrumbs.emit(_.clone(this.breadcrumbsStore));
      }
    }));
  }

  private collectBreadcrumbs(snapshot: ActivatedRouteSnapshot, lastCollectedFrom?: BreadcrumbFramer): void {
    if (snapshot.data && (snapshot.data as any).breadcrumb) {
      let framer = (snapshot.data as any).breadcrumbFramer as BreadcrumbFramer;
      if (framer !== lastCollectedFrom) {
        this.breadcrumbsStore.push((snapshot.data as any).breadcrumb as Breadcrumb);
        lastCollectedFrom = framer;
      }
    }
    for (let child of snapshot.children) {
      this.collectBreadcrumbs(child, lastCollectedFrom);
    }
  }
}
