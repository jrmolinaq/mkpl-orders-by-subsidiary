import { Component, OnInit } from '@angular/core';
import { OrderService } from './services/order.service';
import { DataPaginator } from './interfaces/paginator.interface';
import { Order } from './interfaces/order.interface';
import { EMPTY_ORDERS } from './constants/orders-by-subsidiary-constants';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-orders-by-subsidiary/app/app.component.html'
})
export class AppComponent implements OnInit {

	data: Order[];
	paginator: DataPaginator;
	subsidiaryId: string;
	emptyOrders = EMPTY_ORDERS;
  
	constructor(private orderService: OrderService) { }
  
	ngOnInit() {
	  this.subsidiaryId = this.getURLParameter("id");
	  this.getOrders();
	}
  
	getOrders(page = 0, status = 'all') {
	  this.orderService
		.getOrders({ page, status, subsidiaryId: this.subsidiaryId})
		.subscribe(({ data, dataPaginator }) => {
		  this.data = data;
		  this.paginator = dataPaginator;
		});
	}
  
	currentPageChange(page: number) {
	  this.getOrders(page);
	}
  
	changeFilter(value: string) {
	  this.getOrders(0, value);
	}

	// this.getURLParameter("id")
	private getURLParameter(paramName: string){
	  var pageURL = window.location.search.substring(1);
	  var variables = pageURL.split('&');
	  for (var i = 0; i < variables.length; i++) {
	    var param = variables[i].split('=');
	    if (param[0] == paramName) {
	      return param[1];
	    }
	  }
	}​
  
  }