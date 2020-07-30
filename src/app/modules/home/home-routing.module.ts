import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: ':dealers_id/:branch_id',
  component: HomeComponent
}, {
  path: ':dealers_id',
  component: HomeComponent
}, {
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
