import { Component, OnInit } from '@angular/core';
import {Candidat} from '../candidat';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Logger} from '../../../core';
import {CandidatService} from '../candidat.service';
import {Router} from '@angular/router';
import {toResponseBody, uploadProgress} from '../../../shared/utils';

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
  progress = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: CandidatService,
    private logger: Logger) { }

  ngOnInit() {
    this.buildPersonalForm();
    this.buildPersoNextForm();
    this.personalForm.valueChanges.subscribe( value => {
      console.log(value); });
    this.persoNext.valueChanges.subscribe(val => {
      console.log(val); });
    // this.buildAddressForm();
  }

  buildPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['h', Validators.required],
      nomJF: ['', ],
      dateNaiss: ['', Validators.required],
      image:['', Validators.required],
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

    this.contactService.addCandidat(newCandidat).pipe(
      uploadProgress(p => (this.progress = p)),
      toResponseBody()
    ).subscribe(result => {
          console.log(result);
          // go to Candidat List page
          this.router.navigate(['/']);
      }
    );
  }
  invalidForms(): boolean {
    return (this.personalForm.invalid ||
      this.persoNext.invalid
      // || this.addressForm.invalid
    );
  }

  getCandidat(): Candidat {
    return { ...this.personalForm.value, ...this.persoNext.value };
  }

}
