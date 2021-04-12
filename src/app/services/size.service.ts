import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SizepI, SizerI, SizezI } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  
  constructor(
    private http: HttpClient
  ) { }
  
    getSizer() {
      return this.http.get<SizerI[]>('/assets/data/sizer.json');
    }
  
    getSizez() {
      return this.http.get<SizezI[]>('/assets/data/sizez.json');
    }
  
    getSizep() {
      return this.http.get<SizepI[]>('/assets/data/sizep.json');
    }
}
