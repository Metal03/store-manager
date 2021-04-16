import { Component, Input, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() product: ProductI;
  public photo: string = '';
  public colorHellow: boolean = false;
  public colorBlue: boolean = false;
  public colorWhite: boolean = false;
  public colorBrown: boolean = false;
  public colorLightBlue: boolean = false;
  public colorGray: boolean = false;
  public colorPurple: boolean = false;
  public colorOrange: boolean = false;
  public colorBlack: boolean = false;
  public colorPink: boolean = false;
  public colorRed: boolean = false;
  public colorGreen: boolean = false;
  public messageWhat: string = '';

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.photo = this.product.photo[0];
    this.product.colors.forEach( color => {
      if ( color === 'HELLOW' ) { this.colorHellow = true }
      else if ( color === 'BLUE' ) { this.colorBlue = true }
      else if ( color === 'WHITE' ) { this.colorWhite = true }
      else if ( color === 'BROWN' ) { this.colorBrown = true }
      else if ( color === 'LIGHTBLUE' ) { this.colorLightBlue = true }
      else if ( color === 'GRAY' ) { this.colorGray = true }
      else if ( color === 'PURPLE' ) { this.colorPurple = true }
      else if ( color === 'ORANGE' ) { this.colorOrange = true }
      else if ( color === 'BLACK' ) { this.colorBlack = true }
      else if ( color === 'PINK' ) { this.colorPink = true }
      else if ( color === 'RED' ) { this.colorRed = true }
      else if ( color === 'GREEN' ) { this.colorGreen = true }
    })
  }

  onChangePhoto(file: string) {
    this.photo = file;
  }
}


