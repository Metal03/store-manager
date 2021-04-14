import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showForm: boolean = false;
  public showDetail: boolean = false;

  public product: ProductI = { id: ''};
  public textSearch: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSearch( e ) {
    this.textSearch = e.target.value;
  }

  onEdit( obj ) {
    this.showForm = !this.showForm;
    this.product = obj;
  }

  onDetail( obj ) {
    this.showDetail = !this.showDetail;
    this.product = obj;
  }

}
