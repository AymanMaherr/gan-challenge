import { Routes } from '@angular/router';
// import { CdDsipalyPageComponent } from '../pages/cd-dsipaly-page/cd-dsipaly-page.component';
import { CartPageComponent } from '../pages/cart-page/cart-page.component';
import { CdDsipalyPageComponent } from '../pages/cd-dsipaly-page/cd-dsipaly-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CdDsipalyPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  }
];
