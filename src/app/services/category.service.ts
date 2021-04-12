import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryI, ClasificationI, ColorI } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }
  
    getCategories() {
      return this.http.get<CategoryI[]>('/assets/data/categories.json');
    }
  
    getClasifications() {
      return this.http.get<ClasificationI[]>('/assets/data/clasifications.json');
    }

    getColors() {
      return this.http.get<ColorI[]>('/assets/data/colors.json');
    }

}
