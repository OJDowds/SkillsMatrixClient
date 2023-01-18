import { Component } from "@angular/core";

@Component({
  selector: 'sm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li class='nav-item'><a class='nav-link' routerLinkActive='active'
          [routerLink]="['/home']">Home</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/skills'>Skill List</a></li>
          <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
          [routerLink]="['/skills/0/edit']">Add Skill</a></li>
          

        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Skills Matrix';


}


// <li><a class='nav-link' routerLinkActive='active' routerLink='/skills'>Create Skill</a></li>