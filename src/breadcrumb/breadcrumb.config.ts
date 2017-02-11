import { Type } from '@angular/core';

import { BreadcrumbResolver } from './breadcrumb.resolver';

export interface BreadcrumbConfig {
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

  /**
   * Optional custom resolver derived from BreadcrumbResolver.
   */
  resolver?: Type<BreadcrumbResolver>;

  /**
   * If resolver is specified, resolverProvider can be set to true
   * if the resolver is already provider. Otherwise, the BreadcrumbFramer
   * will add it to the module's providers.
   */
  resolverProvider?: boolean;
}
