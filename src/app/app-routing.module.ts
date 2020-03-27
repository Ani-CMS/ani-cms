import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextsComponent } from './pages/texts/texts.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { AboutComponent } from './pages/about/about.component';
import { WorksSubHeaderComponent } from './sub-headers/works-sub-header/works-sub-header.component';
import { FilmsSubHeaderComponent } from './sub-headers/films-sub-header/films-sub-header.component';


const routes: Routes = [
  {
    path: 'works',
    component: WorksSubHeaderComponent,
    outlet: 'sub-headers'
  },
  {
    path: 'films',
    component: FilmsSubHeaderComponent,
    outlet: 'sub-headers'
  },
  {
    path: 'upcoming',
    component: UpcomingComponent,
  },
  {
    path: 'texts',
    component: TextsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
