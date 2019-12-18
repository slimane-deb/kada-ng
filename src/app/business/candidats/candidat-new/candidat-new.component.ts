import { Component, OnInit } from '@angular/core';
import {Candidat} from '../candidat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Logger} from '../../../core';
import {CandidatService} from '../candidat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-candidat',
  templateUrl: './candidat-new.component.html',
  styleUrls: ['./candidat-new.component.scss']
})
export class CandidatNewComponent implements OnInit {

  title = 'Ajouter Candidat';
  personalForm: FormGroup;
  persoNext: FormGroup;
  // addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: CandidatService,
    private logger: Logger) { }

  ngOnInit() {
    this.buildPersonalForm();
    this.buildPersoNextForm();
    // this.buildAddressForm();
  }

  buildPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      nomJF: ['', Validators.required],
      dateNaiss: ['', Validators.required],
      cin: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')] ],
      email: ['', [Validators.required, Validators.email] ]
    });
  }

  buildPersoNextForm(): void {
    this.persoNext = this.formBuilder.group({
      comm_enr: ['', Validators.required],
      comm_resid: ['', Validators.required],
      prenomP: '', nomM: '', prenomM: '', nation: '',
      adresse: ['', Validators.required],
      sang_grp: '', sit_fam: ''
    });
  }

  // buildAddressForm(): void {
  //   this.addressForm = this.formBuilder.group({
  //     street: ['', Validators.required],
  //     city: ['', Validators.required],
  //     state: ['', Validators.required ],
  //     zip: ['', Validators.required],
  //   });
  // }

  save() {
    if (this.invalidForms()) {
      return;
    }

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
      this.persoNext.invalid
      // || this.addressForm.invalid
    );
  }

  /**
   * Return Candidat instance by combining the following.
   *   personalForm.value => firstName, lastName, email
   *   workForm.value => work
   *   addressForm.value => street, city, state, zip
   */
  getCandidat(): Candidat {
    return { ...this.personalForm.value, ...this.persoNext.value };
  }

}
