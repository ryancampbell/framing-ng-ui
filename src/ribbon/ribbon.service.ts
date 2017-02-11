import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Emitter, ReplayEmitter } from '@biznas/ng-core';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { Ribbon } from './ribbon';
import { RibbonFramer } from './ribbon.framer';

import * as _ from 'lodash';

@Injectable()
export class RibbonService {

  public ribbon: Emitter<Ribbon> = new ReplayEmitter<Ribbon>();

  private subscriptions: AnonymousSubscription[] = [];

  private ribbonStore: Ribbon;

  constructor(
    private router: Router,
  ) {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ribbonStore = {
          hasSave: false,
          hasBack: false,
        };
        this.resolveRibbon(this.router.routerState.snapshot.root);
        this.ribbon.emit(_.clone(this.ribbonStore));
      }
    }));
  }

  private resolveRibbon(snapshot: ActivatedRouteSnapshot, lastCollectedFrom?: RibbonFramer): void {
    if (snapshot.data && (snapshot.data as any).ribbon) {
      this.ribbonStore = (snapshot.data as any).ribbon as Ribbon;
    }
    for (let child of snapshot.children) {
      this.resolveRibbon(child, lastCollectedFrom);
    }
  }
}
