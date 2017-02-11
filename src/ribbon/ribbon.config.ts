import { Type } from '@angular/core';

export interface RibbonConfig {
  /**
   * Defaults to false.
   */
  hasSave?: boolean;

  /**
   * Defaults to false.
   */
  hasBack?: boolean;

  /**
   * Ribbon content component.
   * Defaults to undefined.
   */
  contentComponent?: Type<any>;
}
