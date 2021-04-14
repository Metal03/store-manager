import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductI } from '../interfaces/interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsColletions: AngularFirestoreCollection<ProductI>;
  private products: Observable<ProductI[]>;
  private productDoc: AngularFirestoreDocument<ProductI>;
  private product: Observable<ProductI>;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { 
    this.productsColletions = afs.collection<ProductI>('product');
  }

  getProducts() {
    this.productsColletions = this.afs.collection<ProductI>('product');
    return this.products = this.productsColletions.snapshotChanges()
           .pipe(map( changes => {
              return changes.map( action => {
                const data = action.payload.doc.data() as ProductI;
                data.id = action.payload.doc.id;
                return data;
              });
           }));
  }

  addOrUpdateProduct(product: ProductI) {
    if (product.id !== '') {
      const id = product.id;
      delete product.id;
      this.productDoc = this.afs.doc<ProductI>(`product/${id}`);
      this.productDoc.update(product);
    } else {
      this.productsColletions.add(product).then( resp => {
        product.code = resp.id;
        resp.update(product);
      })
    }
  }

  delete(id: string) {

    this.productDoc = this.afs.doc<ProductI>(`product/${id}`);
    this.productDoc.delete();
  }

  async deleteImage(url: string ) {
    await this.storage.refFromURL(url).delete();
  }
}
