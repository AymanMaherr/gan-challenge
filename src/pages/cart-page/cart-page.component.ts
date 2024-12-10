import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CdsService } from '../../services/cds/cds.service';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { Cd } from '../../interfaces/api/cd';
import { CartService } from '../../services/cart/cart.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, CartItemCardComponent],
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartData: Cd[] = []
  cartTotal = 0
  constructor(private cartService: CartService, private cdServices: CdsService) { }

  refetchCartData$ = new BehaviorSubject<boolean>(true);

  ngOnInit() {
    this.refetchCartData$.pipe(switchMap(async () => this.cartService.getCart())).subscribe(
      (res) => {
        res.subscribe(res => {
          this.cartData = res
          this.cartTotal = 0
          res.map(res => res.price).forEach((el) => this.cartTotal += el);
        })
      }
    )
  }

  deleteItemFromCart(cd: Cd) {
    this.cartService.delete(cd).subscribe(() => {
      this.cdServices.edit(cd, false).subscribe(() =>
        this.refetchCartData$.next(false)
      )
    })
  }
}
