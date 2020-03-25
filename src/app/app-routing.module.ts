import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneComponent } from './pages/one/one.component';
import { TwoComponent } from './pages/two/two.component';


const routes: Routes = [
  {
    path: 'one',
    component: OneComponent
  },
  {
    path: 'two',
    component: TwoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
