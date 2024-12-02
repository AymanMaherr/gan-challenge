import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardComponent],
  template: `
    <p>hello</p>
    <app-card/>
    <router-outlet/>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gan-challange';
}
