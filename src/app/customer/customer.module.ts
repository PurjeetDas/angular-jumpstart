import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CustomerRoutingModule, SharedModule,FormsModule,CommonModule],
  declarations: [CustomerRoutingModule.components]
})
export class CustomerModule { }