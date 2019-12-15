import { Component, OnInit } from '@angular/core';
import {Candidat} from '../shared/candidat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Logger} from '../../../core';
import {CandidatService} from '../shared/candidat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-candidat',
  templateUrl: './new-candidat.component.html',
  styleUrls: ['./new-candidat.component.scss']
})
export class NewCandidatComponent implements OnInit {

  title = 'Create Candidat';
  personalForm: FormGroup;
  workForm: FormGroup;
  addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: CandidatService,
    private logger: Logger) { }

  ngOnInit() {
    this.buildPersonalForm();
    this.buildWorkForm();
    this.buildAddressForm();
  }

  buildPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email] ]
    });
  }

  buildWorkForm(): void {
    this.workForm = this.formBuilder.group({
      'work': ['', Validators.required]
    });
  }

  buildAddressForm(): void {
    this.addressForm = this.formBuilder.group({
      'street': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required ],
      'zip': ['', Validators.required],
    });
  }

  save() {
    if (this.invalidForms())
      return;

    const newCandidat = this.getCandidat();
    this.logger.log(`New Candidat: ${newCandidat}`);

    this.contactService.addCandidat(newCandidat).subscribe(result => {
      if (result) {
        // go to Candidat List page
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Return true if at least either personForm, workForm or addressForm is invalid
   */
  invalidForms(): boolean {
    return (this.personalForm.invalid ||
      this.workForm.invalid ||
      this.addressForm.invalid);
  }

  /**
   * Return Candidat instance by combining the following.
   *   personalForm.value => firstName, lastName, email
   *   workForm.value => work
   *   addressForm.value => street, city, state, zip
   */
  getCandidat(): Candidat {
    return { ...this.personalForm.value, ...this.workForm.value, ...this.addressForm.value };
  }

}
