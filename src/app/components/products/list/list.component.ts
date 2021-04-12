import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductI } from '../../../interfaces/interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public products: ProductI[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    this.spinner.show();
    await this.productService.getProducts().subscribe( products => {
      setTimeout(() => {
        this.products = products;
        this.spinner.hide();
        console.log(products)
      }, 1000);
    });
  }
}
