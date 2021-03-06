import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { TemplateHeaderDirective } from './custom-table/template-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    TemplateHeaderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
