import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { LaunchdarklyService } from './launchdarkly.service';
import { ProjectsService } from './projects.service';
import { TimesService } from './times.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent],
  providers: [LaunchdarklyService, ProjectsService, TimesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
