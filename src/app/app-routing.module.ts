import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TextsComponent } from './pages/texts/texts.component'
import { UpcomingComponent } from './pages/upcoming/upcoming.component'
import { AboutComponent } from './pages/about/about.component'
import { WorksComponent } from './pages/works/works.component'
import { FilmsComponent } from './pages/films/films.component'
import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'works',
    component: WorksComponent,
  },
  {
    path: 'works/:id',
    component: WorksComponent,
  },
  {
    path: 'films',
    component: FilmsComponent,
  },
  {
    path: 'films/:id',
    component: FilmsComponent,
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
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
