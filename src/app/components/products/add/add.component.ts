import { Component, Input, OnInit } from '@angular/core';
import { ProductI, CategoryI, ClasificationI, ColorI, SizerI, SizepI, FileI } from '../../../interfaces/interface';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { SizeService } from '../../../services/size.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public title: string = 'Agregar producto';
  public featured: boolean = false;
  public typeProduct: boolean = false;
  public checkedColors: boolean[] = [];
  public checkedSizeR: boolean[] = [];
  public checkedSizeP: boolean[] = [];
  public checkedSizeZ: boolean[] = [];

  @Input() product: ProductI = {};
  public categories: CategoryI[] = [];
  public clasifications: ClasificationI[] = [];
  public colors: ColorI[] = [];
  public sizeR: SizerI[] = [];
  public sizeP: SizepI[] = [];
  public sizeZ: SizepI[] = [];  
  public imagenes: FileI[] = [];
  public imgPreview = [];
  
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private sizeService: SizeService
  ) { 
  }

  ngOnInit(): void {
    this.getCategories();
    this.getCalasifications();
    this.getColors();
    this.getSizeR();
    this.getSizeP();
    this.getSizeZ();
  }


  handleImage(e) {
    if (this.imagenes.length < 5) {
      this.imagenes.push(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgPreview.push(event.target.result);
      }
    } else {
      this.toastr.warning('No puede agregar mas de 3 fotos por producto', 'Advertencia', {
        timeOut: 2000
      })
    }
  }

  // LOAD DATA

  getCategories() {
    this.categoryService.getCategories().subscribe( resp => {
      this.categories = resp;
    })
  }

  getCalasifications() {
    this.categoryService.getClasifications().subscribe( resp => {
      this.clasifications = resp;
    })
  }

  getColors() {
    this.categoryService.getColors().subscribe( resp => {
      this.colors = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          this.checkedColors[i] = false;
        }
      }
    });
  }

  getSizeR() {
    this.sizeService.getSizer().subscribe( resp => {
      this.sizeR = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          this.checkedSizeR[i] = false;
        }
      }
    });
  }

  getSizeP() {
    this.sizeService.getSizep().subscribe( resp => {
      this.sizeP = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          this.checkedSizeP[i] = false;
        }
      }
    });
  }

  getSizeZ() {
    this.sizeService.getSizez().subscribe( resp => {
      this.sizeZ = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          this.checkedSizeZ[i] = false;
        }
      }
    });
  }
}
