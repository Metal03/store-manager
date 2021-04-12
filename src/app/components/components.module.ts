import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './products/list/list.component';
import { AddComponent } from './products/add/add.component';

// Components



@NgModule({
  declarations: [
  ListComponent,
  AddComponent
  ],
  exports: [  
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ComponentsModule { }
