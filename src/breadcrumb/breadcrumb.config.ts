import { Injector, Type } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Breadcrumb } from './breadcrumb';

export interface BreadcrumbStatic {
  /**
   * The label for this breadcrumb.
   */
  label: string;

  /**
   * Optional icon name.
   */
  icon?: string;

  /**
   * Disables the link on the breadcrumb if set to false.
   */
  link?: string | boolean;
}

export interface BreadcrumbFactory {
  breadcrumb(): Breadcrumb | Observable<Breadcrumb> | Promise<Breadcrumb>;
}

export interface BreadcrumbFactoryBootstrap {
  factory: Type<BreadcrumbFactory>;
  injector: Injector;
}

export interface BreadcrumbConfig {
  breadcrumb: BreadcrumbStatic | Type<BreadcrumbFactory>;
}
