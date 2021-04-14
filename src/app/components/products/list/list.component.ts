import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ProductI } from '../../../interfaces/interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public products: ProductI[] = [];
  @Output() productEdit = new EventEmitter<ProductI>();
  @Output() productDetail = new EventEmitter<ProductI>();
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
      }, 1000);
    });
  }

  deletePhoto(product: ProductI) {
    Swal.fire({
      title: `Desea eliminar el producto ${ product.name }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(product.id);
        Swal.fire(
          'Exitoso!',
          'Imagen eliminada correctamente.',
          'success'
        )
      }
    })
  }
}
