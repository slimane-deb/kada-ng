import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kada Auto Ecole';

  menu: Array<any> = [
    { name: 'Candidats', url: '/candidats' },
    { name: 'Examens', url: '/examens' },
  ];
}
