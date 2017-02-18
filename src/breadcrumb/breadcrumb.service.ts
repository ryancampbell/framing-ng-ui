import { Injectable, Injector, Type } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbFactory, BreadcrumbFactoryBootstrap } from './breadcrumb.config';
import { BreadcrumbFramer } from './breadcrumb.framer';

import * as _ from 'lodash';

@Injectable()
export class BreadcrumbService {

  public breadcrumbs$: ReplaySubject<Breadcrumb[]> = new ReplaySubject<Breadcrumb[]>(1);

  private subscriptions: AnonymousSubscription[] = [];

  private breadcrumbs: BreadcrumbHolder[] = [];

  constructor(
    private router: Router,
    private injector: Injector,
  ) {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.disposeBreadcrumbs();
        this.collectBreadcrumbs(this.router.routerState.snapshot.root);
        this.emitBreadcrumbs();
      }
    }));
  }

  private emitBreadcrumbs(): void {
    this.breadcrumbs$.next(this.breadcrumbs.map((breadcrumb) => breadcrumb.breadcrumb));
  }

  private disposeBreadcrumbs(): void {
    this.breadcrumbs.forEach((breadcrumb) => {
      if (breadcrumb.subscription) { breadcrumb.subscription.unsubscribe(); }
    });
    this.breadcrumbs = [];
  }

  private collectBreadcrumbs(snapshot: ActivatedRouteSnapshot, lastCollectedFrom?: BreadcrumbFramer): void {
    if (snapshot.data && (snapshot.data as any).breadcrumb) {
      const framer = (snapshot.data as any).breadcrumbFramer as BreadcrumbFramer;
      if (framer !== lastCollectedFrom) {
        const breadcrumbData: Breadcrumb | BreadcrumbFactoryBootstrap = (snapshot.data as any).breadcrumb;
        let breadcrumbHolder: BreadcrumbHolder = { breadcrumb: { label: '' } };
        if ((breadcrumbData as Breadcrumb).label) {
          // plain old breadcrumb
          breadcrumbHolder = { breadcrumb: breadcrumbData as Breadcrumb };
        } else {
          // breadcrumb factory
          console.error('holy shit', { breadcrumbData });
          const breadcrumbFactoryBootstrap = breadcrumbData as BreadcrumbFactoryBootstrap;
          const breadcrumbFactory = breadcrumbFactoryBootstrap.injector.get(breadcrumbFactoryBootstrap.factory);
          const breadcrumbResult = breadcrumbFactory ? breadcrumbFactory.breadcrumb() : undefined;
          console.error('holy shit', { breadcrumbData, breadcrumbFactory, breadcrumbResult });
          if (!breadcrumbFactory || !breadcrumbResult) {
            console.error('Failed to get breadcrumb factory result', { breadcrumbData });
          } else if ((breadcrumbResult as Breadcrumb).label) {
            // plain old breadcrumb
            breadcrumbHolder = { breadcrumb: breadcrumbResult as Breadcrumb };
          } else if ((breadcrumbResult as Observable<Breadcrumb>).subscribe) {
            // observable breadcrumb
            breadcrumbHolder.subscription = (breadcrumbResult as Observable<Breadcrumb>).subscribe((breadcrumb) => {
              if (!_.isEqual(breadcrumb, breadcrumbHolder.breadcrumb)) {
                breadcrumbHolder.breadcrumb = breadcrumb;
                this.emitBreadcrumbs();
              }
            });
          } else if ((breadcrumbResult as Promise<Breadcrumb>).then) {
            // promise breadcrumb
            (breadcrumbResult as Promise<Breadcrumb>).then((breadcrumb) => {
              if (!_.isEqual(breadcrumb, breadcrumbHolder.breadcrumb)) {
                breadcrumbHolder.breadcrumb = breadcrumb;
                this.emitBreadcrumbs();
              }
            });
          } else {
            console.error('Unrecognized breadcrumb data', { breadcrumbData, snapshot });
          }
        }
        this.breadcrumbs.push(breadcrumbHolder);
        lastCollectedFrom = framer;
      }
    }
    for (let child of snapshot.children) {
      this.collectBreadcrumbs(child, lastCollectedFrom);
    }
  }
}

class BreadcrumbHolder {
  public breadcrumb: Breadcrumb;
  public subscription?: AnonymousSubscription;
}
