import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { ContainerService } from '@biznas/ng-core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { Ribbon } from './ribbon';
import { RibbonFramer } from './ribbon.framer';

import * as _ from 'lodash';

@Injectable()
export class RibbonService {

  public get ribbon$(): Observable<Ribbon> { return this.ribbonSubject; }

  private ribbonSubject: ReplaySubject<Ribbon> = new ReplaySubject<Ribbon>(1);
  private ribbon: Ribbon;
  private ribbonContainerDeactivate: () => void;

  private subscriptions: AnonymousSubscription[] = [];

  constructor(
    private router: Router,
    private containerService: ContainerService,
  ) {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onNavigationEnd();
      }
    }));
  }

  private onNavigationEnd(): void {
    const prevRibbon = this.ribbon;
    this.ribbon = undefined;
    this.resolveRibbon(this.router.routerState.snapshot.root);
    if (this.ribbon && prevRibbon && this.ribbon.containerContent === prevRibbon.containerContent) {
      // ribbon container content has not changed
    } else {
      if (this.ribbonContainerDeactivate) { this.ribbonContainerDeactivate(); }
      if (this.ribbon && this.ribbon.containerContent) {
        this.ribbonContainerDeactivate = this.containerService.activate(this.ribbon.containerContent);
      }
    }
    this.ribbonSubject.next(_.clone(this.ribbon));
  }

  private resolveRibbon(snapshot: ActivatedRouteSnapshot, lastCollectedFrom?: RibbonFramer): void {
    if (snapshot.data && (snapshot.data as any).ribbon) {
      this.ribbon = _.clone((snapshot.data as any).ribbon as Ribbon);
      this.ribbon.routeSnapshot = snapshot;
    }
    for (let child of snapshot.children) {
      this.resolveRibbon(child, lastCollectedFrom);
    }
  }
}
