import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { Logger } from './logger/logger.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MaterialModule} from '../material/material.module';
import {ExamenService} from './examen/examen.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    ToolbarComponent
  ],
  exports: [
    MainLayoutComponent
  ],
  providers: [
    Logger,
    ExamenService
  ]
})

export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
