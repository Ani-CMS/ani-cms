import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingPage } from './pages/upcoming/upcoming-page.component';
import { TextsComponent } from './pages/texts/texts.component';


const routes: Routes = [
  {
    path: 'works',
    component: null
  },
  {
    path: 'films',
    component: null
  },
  {
    path: 'upcoming',
    component: UpcomingPage
  },
  {
    path: 'texts',
    component: TextsComponent
  },
  {
    path: 'about',
    component: null
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
