import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpcomingPage } from './pages/upcoming/upcoming-page.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponent } from './components/event/event.component';
import { TextsComponent } from './pages/texts/texts.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    UpcomingPage,
    HeaderComponent,
    TextsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
