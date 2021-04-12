import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductI } from '../interfaces/interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(
  private http: HttpClient
) { }

  getFeatures(orderBy: string = 'desc') {
    return this.http.get<ProductI[]>('/assets/data/products.json')
                    .pipe(
                      map(
                        data => {
                          const array: ProductI[] = data.reduce(
                            (prev, curr: ProductI) => {
                              if (curr.type === 1) {
                                prev.push(curr)
                              }
                              return prev
                            }, 
                            []
                          )
                          if ( orderBy === 'desc') {
                            return array.sort((a,b) => b.date - a.date );
                          } else {
                            return array.sort((a,b) => a.date - b.date );
                          }
                        }
                      )
                    )
  }

  getProduct(orderBy: string = 'desc') {
    return this.http.get<ProductI[]>('/assets/data/products.json')
                    .pipe(
                      map(
                        data => { console.log(data)
                          const array: ProductI[] = data;
                          if ( orderBy === 'desc') {
                            return array.sort((a,b) => b.date - a.date );
                          } else {
                            return array.sort((a,b) => a.date - b.date );
                          }
                        }
                      )
                    )
  }
}
