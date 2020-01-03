import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kada Auto Ecole';

  menu: Array<any> = [
    { name: 'Candidats', url: '/candidats', icon: 'people' },
    { name: 'Examens', url: '/examens', icon: 'directions_car' },
  ];
}
