import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashscreenPageRoutingModule } from './splashscreen-routing.module';

import { SplashscreenPage } from './splashscreen.page';

// CAMBIO IDIOMA
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashscreenPageRoutingModule,
    TranslateModule
  ],
  declarations: [SplashscreenPage]
})
export class SplashscreenPageModule {}
