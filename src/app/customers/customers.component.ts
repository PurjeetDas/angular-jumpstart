import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ICustomer} from '../shared/interfaces';
import { LoggerService } from '../core/services/logger.service';


@Component({
  selector: 'cm-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  title: string;
  customers: ICustomer[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
 
  constructor(
    private dataService: DataService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Customers';
    this.displayMode = DisplayModeEnum.Card;

    this.getCustomers();
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }


  getCustomers() {
    this.dataService.getCustomers()
        .subscribe((response: ICustomer[]) => {
          this.customers =response;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getCustomers retrieved customers '));
  }

}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}