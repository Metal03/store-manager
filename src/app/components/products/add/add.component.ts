import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductI, CategoryI, ClasificationI, ColorI, SizerI, SizepI, FileI, SizepmI, SizesmI } from '../../../interfaces/interface';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { SizeService } from '../../../services/size.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Input() product: ProductI = {};
  @Output() closeForm = new EventEmitter<boolean>(); 
  public title: string = 'Agregar producto';
  public featured: boolean[] = [];
  public typeProduct: boolean[] = [];
  public checkedColors: boolean[] = [];
  public checkedSizeR: boolean[] = [];
  public checkedSizeP: boolean[] = [];
  public checkedSizePM: boolean[] = [];
  public checkedSizeSM: boolean[] = [];
  public checkedSizeZ: boolean[] = [];
  public showSizeR: boolean = false;
  public showSizeP: boolean = false;
  public showSizePM: boolean = false;
  public showSizeSM: boolean = false;
  public showSizeZ: boolean = false;

  public categories: CategoryI[] = [];
  public clasifications: ClasificationI[] = [];
  public colors: ColorI[] = [];
  public sizeR: SizerI[] = [];
  public sizeP: SizepI[] = [];
  public sizePM: SizepmI[] = [];
  public sizeSM: SizesmI[] = [];
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
    this.featured[0] = false;
    this.featured[1] = true;
    this.typeProduct[0] = true;
    this.typeProduct[1] = false;
  }

  ngOnInit(): void {

    if ( this.product.id !== '' ) {
      this.title = 'Editar producto';
      this.spinner.show();
      this.onSelectCategory(null, true);
      if ( this.product.category == 1 || this.product.category == 2 ) { 
        this.getSizeR(true); 
      }
      else if ( this.product.category == 3 ) {
        this.getSizeP(true); 
        this.getSizePM(true);
      }
      else if ( this.product.category == 4 ) {
        this.getSizeP(true); 
        this.getSizeSM(true);
      }
      else { this.getSizeZ(true); }
      // Load images
      this.product.photo.forEach( img => {
        let i: FileI = { url: img };
        this.imgPreview.push(i);
      })
      this.getColors(true);
      this.typeProduct[0] = this.product.accesory ? true : false;
      this.typeProduct[1] = this.product.accesory ? false : true;
      this.featured[0] = this.product.type == 1 ? true : false;
      this.featured[1] = this.product.type == 1 ? false : true;
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    } else {
      this.getSizeR();
      this.getSizeP();
      this.getSizePM();
      this.getSizeSM();
      this.getSizeZ();
      this.getColors();
    }
    this.getCategories();
    this.getCalasifications();
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

  getColors(band: boolean = false) {
    this.categoryService.getColors().subscribe( resp => {
      this.colors = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          if ( !band) {
            this.checkedColors[i] = false;
          } else {
            const item = this.product.colors.find( e => e === resp[i].code);
            if (item) {
              this.checkedColors[i] = true;
            } else {
              this.checkedColors[i] = false;
            }
          }
        }
      }
    });
  }

  getSizeR(band: boolean = false) {
    this.sizeService.getSizer().subscribe( resp => {
      this.sizeR = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          if ( !band) {
            this.checkedSizeR[i] = false;
          } else {
            const item = this.product.sizer.find( e => e === resp[i].size);
            if (item) {
              this.checkedSizeR[i] = true;
            } else {
              this.checkedSizeR[i] = false;
            }
          }
        }
      }
    });
  }

  getSizeP(band: boolean = false) {
    this.sizeService.getSizep().subscribe( resp => {
      this.sizeP = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          if ( !band) {
            this.checkedSizeP[i] = false;
          } else {
            const item = this.product.sizep.find( e => e === resp[i].size);
            if (item) {
              this.checkedSizeP[i] = true;
            } else {
              this.checkedSizeP[i] = false;
            }
          }
        }
      }
    });
  }

  getSizePM(band: boolean = false) {
    this.sizeService.getSizepm().subscribe( resp => {
      this.sizePM = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          if ( !band) {
            this.checkedSizePM[i] = false;
          } else {
            const item = this.product.sizepm.find( e => e === resp[i].size);
            if (item) {
              this.checkedSizePM[i] = true;
            } else {
              this.checkedSizePM[i] = false;
            }
          }
        }
      }
    });
  }

  getSizeSM(band: boolean = false) {
    this.sizeService.getSizesm().subscribe( resp => {
      this.sizeSM = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          if ( !band) {
            this.checkedSizeSM[i] = false;
          } else {
            const item = this.product.sizesm.find( e => e === resp[i].size);
            if (item) {
              this.checkedSizeSM[i] = true;
            } else {
              this.checkedSizeSM[i] = false;
            }
          }
        }
      }
    });
  }

  getSizeZ(band: boolean = false) {
    this.sizeService.getSizez().subscribe( resp => {
      this.sizeZ = resp;
      if ( resp.length > 0) {
        for( let i = 0; i < resp.length; i++) {
          if ( !band) {
            this.checkedSizeZ[i] = false;
          } else {
            const item = this.product.sizez.find( e => e === resp[i].size);
            if (item) {
              this.checkedSizeZ[i] = true;
            } else {
              this.checkedSizeZ[i] = false;
            }
          }
        }
      }
    });
  }
  changeFeatured( option: number ) {
    if ( option == 0 ){
      this.featured[0] = true; this.featured[1] = false;
    } else {
      this.featured[0] = false; this.featured[1] = true;
    }
  }

  changeTypeProduct( option: number ) {
    if ( option == 0 ){
      this.typeProduct[0] = true; this.typeProduct[1] = false;
    } else {
      this.typeProduct[0] = false; this.typeProduct[1] = true;
    }
    this.product.accesory = this.typeProduct[0] ? false : true;
    if (this.product.accesory) {
      this.product.category = null;
    }
  }
  // SELECT CATEGORY
  onSelectCategory(e, band: boolean = false) {
    let option = band ? this.product.category : e.target.value;
    this.product.clasification = null;
    if ( option !== undefined ) {
      if ( option == 1 || option == 2 ) {
        this.showSizeR = true; this.showSizeP = false; this.showSizePM = false; this.showSizeSM = false; this.showSizeZ = false;
      } else  if ( option == 3 ) {
        this.showSizeR = false; this.showSizeP = true; this.showSizePM = true; this.showSizeSM = false; this.showSizeZ = false;
      } else if ( option == 4 ){
        this.showSizeR = false; this.showSizeP = true; this.showSizePM = false; this.showSizeSM = true; this.showSizeZ = false;
      } else if ( option == 5 ) {
        this.showSizeR = false; this.showSizeP = false; this.showSizePM = false; this.showSizeSM = false; this.showSizeZ = true;
      } else {
        this.showSizeR = false; this.showSizeP = false; this.showSizePM = false; this.showSizeSM = false; this.showSizeZ = false;
      } 
    }
  }

  // SELECT CLASIFICATIONS
  onSelectClasifications(e, band: boolean = false) {
    let option = band ? this.product.category : e.target.value;
    if ( option !== undefined ) {
      if ( this.product.category == 3 && option == 1) {
        this.showSizePM = true; this.showSizeP = false; this.showSizeSM = false; this.showSizeR = false; this.showSizeZ = false;
      } else if ( this.product.category == 3 &&  option == 2 ) {
        this.showSizePM = false; this.showSizeP = true; this.showSizeSM = false; this.showSizeR = false; this.showSizeZ = false;
      } else if ( this.product.category == 4 &&  option == 1 ) {
        this.showSizePM = false; this.showSizeP = false; this.showSizeSM = true; this.showSizeR = false; this.showSizeZ = false;
      } else if ( this.product.category == 4 &&  option == 2 ) {
        this.showSizePM = false; this.showSizeP = true; this.showSizeSM = false; this.showSizeR = false; this.showSizeZ = false;
      } else if ( option == 3 ) {
        this.showSizePM = false; this.showSizeP = false; this.showSizeSM = false; this.showSizeR = false; this.showSizeZ = false;
      }
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
    this.product.accesory = this.typeProduct[0] ? false : true;
    this.product.type = this.featured[0] ? 1 : 0;
    // Validate name
    if (this.product.name === undefined || this.product.name === '') {
      this.toastr.warning('El nombre es requerido', 'Advertencia', { timeOut: 1000 });
      return true;
    } 
    // // Validate description
    // if (this.product.description === undefined || this.product.description === '') {
    //   this.toastr.warning('La descripcion es requerido', 'Advertencia', { timeOut: 1000 });
    //   return true;
    // }
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
      this.product.sizepm = [];
      this.product.sizesm = [];
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
      if (this.product.category == 3 ) {
        // Shit pants sizes H
        if ( this.product.clasification == 1 ) {
          for (let i = 0; i < this.sizePM.length; i++) {
            if( this.checkedSizePM[i] ) {
              this.product.sizepm.push(this.sizePM[i].size);
            }
          }
          if (this.product.sizepm.length == 0) {
            this.toastr.warning('Al menos seleccione una talla', 'Advertencia', { timeOut: 1000 });
            return true;
          }
        } else { // Shit pants sizes M
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
      }
      if (this.product.category == 4 ) {
        // Shit pants sizes H
        if ( this.product.clasification == 1 ) {
          for (let i = 0; i < this.sizeSM.length; i++) {
            if( this.checkedSizeSM[i] ) {
              this.product.sizesm.push(this.sizeSM[i].size);
            }
          }
          if (this.product.sizesm.length == 0) {
            this.toastr.warning('Al menos seleccione una talla', 'Advertencia', { timeOut: 1000 });
            return true;
          }
        } else { // Shit pants sizes M
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
    this.product.photo = [];
    this.imgPreview.forEach(file => {
      this.product.photo.push( file.url );
    })
    console.log('FIN VALIDATION' ,this.product)
    // Todo bien
    return false;
  }

  deletePhoto(url: string, i: number) {
    Swal.fire({
      title: 'Desea eliminar la imagen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        // si la imagen ya estaba almacenada en el registro del producto
        if ( this.imgPreview.length === this.product.photo.length ) { console.log('IMG EXIT REGISTER')
          this.imgPreview.splice(1, i);
          this.product.photo = [];
          this.imgPreview.forEach(file => {
              this.product.photo.push( file.url );
          })
          this.productService.addOrUpdateProduct(this.product);
        } else { console.log('La immagen solo esta en local')
          this.imgPreview = [];
          this.product.photo.forEach( img => {
            let i: FileI = { url: img };
            this.imgPreview.push(i);
          })
        }
        this.productService.deleteImage(url);
        Swal.fire(
          'Exitoso!',
          'Imagen eliminada correctamente.',
          'success'
        )
      }
    })
  }
}
