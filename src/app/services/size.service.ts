import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SizepI, SizepmI, SizerI, SizesmI, SizezI } from '../interfaces/interface';

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

  getSizepm() {
    return this.http.get<SizepmI[]>('/assets/data/sizepm.json');
  }

  getSizesm() {
    return this.http.get<SizesmI[]>('/assets/data/sizeshortm.json');
  }
}
