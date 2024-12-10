import { Component, EventEmitter, inject, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { CdsService } from '../../services/cds/cds.service';
import { Cd } from '../../interfaces/api/cd';

@Component({
  selector: 'app-cart-item-card',
  imports: [],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css'
})
export class CartItemCardComponent implements OnChanges {
  cdsService = inject(CdsService);
  dateString = ''
  @Input({ required: true }) cd!: Cd;
  @Output() deleteFromCart = new EventEmitter<Cd>();

  ngOnChanges(newCd: SimpleChanges) {
    const releaseDate = new Date(newCd['cd'].currentValue.release_date).toString();
    this.dateString = releaseDate.split(' ')[1] + ' ' + releaseDate.split(' ')[3]
  }


  handleDeleteFromCart() {
    this.deleteFromCart.emit(this.cd);
  }
}
