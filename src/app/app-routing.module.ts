import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextsComponent } from './pages/texts/texts.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';


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
    component: null
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
