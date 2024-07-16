import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, AppRoutingModule, ProgressBarComponent],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
