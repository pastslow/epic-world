import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { JoystickService } from './shared/services/joystick.service';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, AppRoutingModule, ProgressBarComponent],
   providers: [JoystickService],
   bootstrap: [AppComponent],
})
export class AppModule {}
