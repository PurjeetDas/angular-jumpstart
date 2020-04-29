import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';


import { TrackByService } from '../../core/services/trackBy.service';
import { ICustomer } from '../../shared/interfaces';

@Component({
  selector: 'app-customers-grid',
  templateUrl: './customers-grid.component.html',
  styleUrls: ['./customers-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersGridComponent implements OnInit {

  @Input() customers: ICustomer[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() {

  }

 

}