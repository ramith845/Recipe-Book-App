import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'First-Project';
  secVisible = 'shopping-book';
  onNavTo(section: string) {
    this.secVisible = section;
  }
}
