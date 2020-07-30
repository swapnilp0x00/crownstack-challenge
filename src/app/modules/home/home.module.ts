import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemViewComponent } from './item-view/item-view.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, ItemViewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule
  ]
})
export class HomeModule { }
