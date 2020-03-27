import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EventComponent } from './components/event/event.component';
import { TextsComponent } from './pages/texts/texts.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { AboutComponent } from './pages/about/about.component';
import { WorksComponent } from './pages/works/works.component';
import { FilmsComponent } from './pages/films/films.component';
import { ExternalTextComponent } from './pages/texts/external-text/external-text.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    HeaderComponent,
    TextsComponent,
    UpcomingComponent,
    AboutComponent,
    WorksComponent,
    FilmsComponent,
    ExternalTextComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
