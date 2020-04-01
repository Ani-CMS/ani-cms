import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { UpcomingEventComponent } from './pages/upcoming/upcoming-event/upcoming-event.component'
import { TextsComponent } from './pages/texts/texts.component'
import { UpcomingComponent } from './pages/upcoming/upcoming.component'
import { AboutComponent } from './pages/about/about.component'
import { WorksComponent } from './pages/works/works.component'
import { FilmsComponent } from './pages/films/films.component'
import { LinkedTextComponent } from './pages/texts/linked-text/linked-text.component'
import { SlideshowComponent } from './slideshow/slideshow.component'
import { HomeComponent } from './pages/home/home.component'
import { MutationObserverDirective } from './rich-text/mutation-observer.directive'
import { RichTextComponent } from './rich-text/rich-text.component'
import { SafePipe } from './safe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    UpcomingEventComponent,
    HeaderComponent,
    TextsComponent,
    UpcomingComponent,
    AboutComponent,
    WorksComponent,
    FilmsComponent,
    LinkedTextComponent,
    SlideshowComponent,
    HomeComponent,
    MutationObserverDirective,
    RichTextComponent,
    SafePipe,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
