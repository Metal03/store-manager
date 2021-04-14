import { Component, Input, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() product: ProductI;
  public photo: string = '';
  public colorP: boolean = false;
  public colorW: boolean = false;
  public colorB: boolean = false;
  public colorD: boolean = false;
  public colorS: boolean = false;
  public colorI: boolean = false;
  public colorG: boolean = false;
  public messageWhat: string = '';
  public numAdmin: string = '+505 86604980';

  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
  }

  getProduct(id: string) {
    // this.productService.getProduct(id).subscribe(
    //   resp => {
    //     this.product = resp;
    //     this.photo = this.product.photo[0];
    //     this.product.colors.forEach( color => {
    //       if ( color === 'A' ) { this.colorP = true }
    //       else if ( color === 'W' ) { this.colorW = true }
    //       else if ( color === 'N' ) { this.colorB = true }
    //       else if ( color === 'R' ) { this.colorD = true }
    //       else if ( color === 'V' ) { this.colorS = true }
    //       else if ( color === 'C' ) { this.colorI = true }
    //       else if ( color === 'G' ) { this.colorG = true }
    //     });

    //     this.messageWhat = `https://api.whatsapp.com/send?phone= ${ this.numAdmin } 
    //                         &text=Hola%20estoy%20interesado%20en%20el%20producto:%20${ this.product.name }`;
    //   }
    // )
  }

  onChangePhoto(file: string) {
    this.photo = file;
  }
}
function Inpyut() {
  throw new Error('Function not implemented.');
}

