import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../my-service.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { materialmodule } from '../materials-module.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, FormsModule, NgxPaginationModule,materialmodule,MatTableModule, 
  ],
  providers:[DataService]
})
export class SharedModuleModule { }
