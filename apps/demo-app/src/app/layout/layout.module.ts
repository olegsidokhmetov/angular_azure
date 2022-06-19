import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    // Basic Modules
    CommonModule,
    RouterModule.forChild([]),

    // UI-Moduules
    MatCommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class AppLayoutModule {}
