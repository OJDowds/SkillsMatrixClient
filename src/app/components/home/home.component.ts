import { Component, VERSION } from '@angular/core';

@Component({
  templateUrl: './home.component.html'
  
})
export class HomeComponent {
  public pageTitle = 'Home';
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
}
}