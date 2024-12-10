import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CdsService } from '../../services/cds/cds.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Cd } from '../../interfaces/api/cd';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cd-dsipaly-page',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './cd-dsipaly-page.component.html',
  styleUrl: './cd-dsipaly-page.component.css'
})

export class CdDsipalyPageComponent implements OnInit {
  cdsData: Cd[] = [];
  categoryValue = '';
  sortingValue = '';
  constructor(private cartService: CartService, private cdServices: CdsService) { };

  refetchCartData$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {

    this.refetchCartData$.pipe(switchMap(async () => this.cdServices.all(this.categoryValue))).subscribe(
      (res) => {
        res.subscribe((res: Cd[]) => {
          this.cdsData = res
          if (this.sortingValue == 'lowest') {
            this.cdsData.sort((a, b) => a.price - b.price)
          } else if (this.sortingValue == 'heighest') {
            this.cdsData.sort((a, b) => b.price - a.price)
          } else if (this.sortingValue == 'oldest') {
            this.cdsData.sort((a, b) => a.release_date - b.release_date)
          } else if (this.sortingValue == 'newest') {
            this.cdsData.sort((a, b) => b.release_date - a.release_date)
          }
        })
      }
    );
  };

  handleCdInCart(cd: Cd) {
    if (cd.in_cart) {
      this.cartService.delete(cd).subscribe(() => {
        this.cdServices.edit(cd, false).subscribe(() => {
          this.refetchCartData$.next(true)
        })
      })
    } else {
      this.cartService.add(cd).subscribe(() => {
        this.cdServices.edit(cd, true).subscribe(() => {
          this.refetchCartData$.next(true)
        })
      })
    }
  };

  handleCategoryChange(event: Event) {
    this.categoryValue = (event.target as HTMLInputElement).value
    this.refetchCartData$.next(true)
  };

  handleSortingChange(event: Event) {
    this.sortingValue = (event.target as HTMLInputElement).value
    this.refetchCartData$.next(true)
  };
}
