import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalFormComponent implements OnInit {

  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
