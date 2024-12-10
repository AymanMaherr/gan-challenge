
import { Injectable } from '@angular/core';
import { Cd } from '../../interfaces/api/cd';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CdsService {
  constructor(private http: HttpClient) { }

  all(category?: string): Observable<Cd[]> {
    return this.http.get<Cd[]>(`http://localhost:3000/cds?category=${category ? category : ''}`);
  }

  edit(cd: Cd, in_cart: boolean) {
    const cdInCart = { ...cd, in_cart }
    return this.http.put(`http://localhost:3000/cds/${cd.id}`, cdInCart);
  }
}
