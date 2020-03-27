import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextsComponent } from './pages/texts/texts.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { AboutComponent } from './pages/about/about.component';


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
    component: UpcomingComponent
  },
  {
    path: 'texts',
    component: TextsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
