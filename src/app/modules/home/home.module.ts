import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemViewComponent } from './item-view/item-view.component';
import {MatCardModule} from '@angular/material/card';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [HomeComponent, ItemViewComponent, GridComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule
  ]
})
export class HomeModule { }
