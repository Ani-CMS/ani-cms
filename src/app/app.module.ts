import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneComponent } from './pages/one/one.component';
import { TwoComponent } from './pages/two/two.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    OneComponent,
    TwoComponent,
    HeaderComponent
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
