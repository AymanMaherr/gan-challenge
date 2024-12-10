import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cd } from '../../interfaces/api/cd';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  getCart(): Observable<Cd[]> {
    return this.http.get<Cd[]>('http://localhost:3000/cart');
  }
  add(cd: Cd) {
    return this.http.post('http://localhost:3000/cart', cd);
  }

  delete(cd: Cd) {
    return this.http.delete(`http://localhost:3000/cart/${cd.id}`, {});
  }

  edit(cd: Cd, in_cart: boolean) {
    const cdInCart = { ...cd, in_cart }
    return this.http.put(`http://localhost:3000/cds/${cd.id}`, cdInCart);
  }
}
