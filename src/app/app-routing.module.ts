import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingPage } from './pages/upcoming/upcoming-page.component';
import { TextsPage } from './pages/texts/texts-page.component';


const routes: Routes = [
  {
    path: 'upcoming',
    component: UpcomingPage
  },
  {
    path: 'texts',
    component: TextsPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
