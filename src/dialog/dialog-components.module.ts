import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

@NgModule(Framing((framing) => framing
  .declareAndEntryComponent(DialogComponent)
))
export class DialogComponentsModule {}
