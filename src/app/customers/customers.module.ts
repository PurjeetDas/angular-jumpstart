import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CustomersRoutingModule,CommonModule, SharedModule],
  declarations: [CustomersRoutingModule.components]
})
export class CustomersModule { }