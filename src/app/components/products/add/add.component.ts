import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductI, CategoryI, ClasificationI, ColorI, SizerI, SizepI, FileI } from '../../../interfaces/interface';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { SizeService } from '../../../services/size.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Input() product: ProductI = {};
  @Output() closeForm = new EventEmitter<boolean>(); 
  public title: string = 'Agregar producto';
  public featured: boolean = false;
  public typeProduct: boolean = false;
  public checkedColors: boolean[] = [];
  public checkedSizeR: boolean[] = [];
  public checkedSizeP: boolean[] = [];
  public checkedSizeZ: boolean[] = [];
  public showSizeR: boolean = false;
  public showSizeP: boolean = false;
  public showSizeZ: boolean = false;

  public categories: CategoryI[] = [];
  public clasifications: ClasificationI[] = [];
  public colors: ColorI[] = [];
  public sizeR: SizerI[] = [];
  public sizeP: SizepI[] = [];
  public sizeZ: SizepI[] = [];  
  public imagenes: string[] = [];
  public imgPreview: FileI[] = [];
  
  constructor(
    private spinner: NgxSpinnerService,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private sizeService: SizeService
  ) {
    this.product.id = '';
    this.product.discount = 0;
    this.product.status = 1;
    this.product.photo = [];
  }

  ngOnInit(): void {
    console.log(this.product)
    this.getCategories();
    this.getCalasifications();
    this.getColors();
    this.getSizeR();
    this.getSizeP();
    this.getSizeZ();
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

  // SELECT CATEGORY
  onSelectCategory(e) {
    let option = e.target.value;

    if ( option == 1 || option == 2 ) {
      this.showSizeR = true; this.showSizeP = false; this.showSizeZ = false;
    } else  if ( option == 3 || option == 4 ) {
      this.showSizeR = false; this.showSizeP = true; this.showSizeZ = false;
    } else if ( option == 5 ) {
      this.showSizeR = false; this.showSizeP = false; this.showSizeZ = true;
    } else {
      this.showSizeR = false; this.showSizeP = false; this.showSizeZ = false;
    } 
    
  }

  // UPLOAD IMAGE
  async handleImage(e) {
    const archivos = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async (event: any) => {
      const archivo  = event.target.result.split('/');
      const type = archivo[0].split(':');
      await this.uploadFoto(archivos, type[1]).then( resp => {
      }).catch((err) => {
        console.log('ERROR', err);
      });
    };
  }

  uploadFoto(archivo: any, type: any) {
    this.spinner.show();
    const id = Math.random().toString(36).substring(2);
    const file = archivo;
    let filePath = `photos/post_p_${ id }`;

    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return new Promise( (resolve, reject) => {
      task.snapshotChanges()
          .pipe(
            finalize( async () => {
              ref.getDownloadURL().subscribe(async (resp) => {
                const upload: FileI = {};
                upload.type = type;
                upload.url = resp;
                this.imgPreview.push(upload);
                this.spinner.hide();
                resolve(resp);
              }, err => {
                console.log('e', err);
              });
            })
          ).subscribe();
    });
  }

  // OnSubmit
  async onSubmit( fregister: NgForm ) {
    this.spinner.show();
    const valit = await this.validations();
    if(valit) {
      this.spinner.hide();
    } else {
      this.product.date = new Date().getTime();
      
      this.productService.addOrUpdateProduct(this.product);
      this.toastr.success('Registro exito', 'Proceso exito', { timeOut: 1500 });
      this.spinner.hide();
      this.closeForm.emit(false);
    }
  }

  // VALIDATIONS INPUT
  validations(){
    this.product.accesory = this.typeProduct;
    this.product.type = this.featured ? 1 : 0;
    // Validate name
    if (this.product.name === undefined || this.product.name === '') {
      this.toastr.warning('El nombre es requerido', 'Advertencia', { timeOut: 1000 });
      return true;
    } 
    // Validate description
    if (this.product.description === undefined || this.product.description === '') {
      this.toastr.warning('La descripcion es requerido', 'Advertencia', { timeOut: 1000 });
      return true;
    }
    // Validate price
    if (this.product.price === undefined || this.product.price === 0) {
      this.toastr.warning('La precio es requerido', 'Advertencia', { timeOut: 1000 });
      return true;
    }
    // Validate clasification
    if ( this.product.clasification === 0 || this.product.clasification === undefined ) {
      this.toastr.warning('Seleccione una clasificacion de su producto', 'Advertencia', { timeOut: 1000 });
      return true;
    }
    // Validate category
    if ( this.product.category === 0 || this.product.category === undefined ) {
      this.toastr.warning('Seleccione una categoria de su producto', 'Advertencia', { timeOut: 1000 });
      return true;
    }
    this.product.colors = [];
    // Shit selected colors
    for (let i = 0; i < this.colors.length; i++) {
      if( this.checkedColors[i] ) {
        this.product.colors.push(this.colors[i].code);
      }
    }
    if (this.product.colors.length === 0) {
      this.toastr.warning('Al menos seleccione un color', 'Advertencia', { timeOut: 1000 });
      return true;
    }
    // If it is not an accessory, validate selected sizes
    if ( !this.product.accesory ) {
      this.product.sizer = [];
      this.product.sizep = [];
      this.product.sizez = [];
      if (this.product.category == 1 || this.product.category == 2) {
        // Shit clothing sizes
        for (let i = 0; i < this.sizeR.length; i++) {
          if( this.checkedSizeR[i] ) {
            this.product.sizer.push(this.sizeR[i].size);
          }
        }
        if (this.product.sizer.length === 0) {
          this.toastr.warning('Al menos seleccione una talla', 'Advertencia', { timeOut: 1000 });
          return true;
        }
      }
      if (this.product.category == 3 || this.product.category == 3) {
        // Shit pants sizes
        for (let i = 0; i < this.sizeP.length; i++) {
          if( this.checkedSizeP[i] ) {
            this.product.sizep.push(this.sizeP[i].size);
          }
        }
        if (this.product.sizep.length == 0) {
          this.toastr.warning('Al menos seleccione una talla', 'Advertencia', { timeOut: 1000 });
          return true;
        }
      }
      if (this.product.category == 5 ) {
        // Shit shoes sizes
        for (let i = 0; i < this.sizeZ.length; i++) {
          if( this.checkedSizeZ[i] ) {
            this.product.sizez.push(this.sizeZ[i].size);
          }
        }
        if (this.product.sizez.length === 0) {
          this.toastr.warning('Al menos seleccione una talla', 'Advertencia', { timeOut: 1000 });
          return true;
        }
      }
    }
    // Validate images
    if ( this.imgPreview.length === 0 ) {
      this.toastr.warning('Al menos debe subir una foto de su producto', 'Advertencia', { timeOut: 1000 });
      return true;
    }

    this.imgPreview.forEach(file => {
      this.product.photo.push( file.url );
    })

    // Todo bien
    return false;
  }

}
