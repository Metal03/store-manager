import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Components
import { ListComponent } from './products/list/list.component';
import { AddComponent } from './products/add/add.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
  ListComponent,
  AddComponent,
  DetailComponent
  ],
  exports: [  
    ListComponent,
    AddComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    PipesModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule
  ]
})
export class ComponentsModule { }
