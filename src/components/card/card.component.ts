import { Component, EventEmitter, inject, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import './card.component.css'
import { CommonModule } from '@angular/common';
import { CdsService } from '../../services/cds/cds.service';
import { Cd } from '../../interfaces/api/cd';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  cdsService = inject(CdsService);
  dateString = ''
  @Input({ required: true }) cd!: Cd;
  @Output() addToCart = new EventEmitter<Cd>()

  ngOnChanges(newCd: SimpleChanges) {
    const releaseDate = new Date(newCd['cd'].currentValue.release_date).toString();
    this.dateString = releaseDate.split(' ')[1] + ' ' + releaseDate.split(' ')[3]
  }

  handleItemPrsenceCart() {
    this.addToCart.emit(this.cd)
  }
}
