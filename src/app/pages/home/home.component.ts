import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showForm: boolean = false;
  public product: ProductI = { id: ''};
  constructor() { }

  ngOnInit(): void {
  }

  onEdit( obj ) {
    this.showForm = !this.showForm;
    this.product = obj;
  }

}
