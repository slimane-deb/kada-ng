import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Candidat} from '../candidat';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.scss']
})
export class CandidatDetailComponent implements OnInit {

  title = 'Edit Contact';
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CandidatDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Candidat) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.contact.id),
      firstName: new FormControl(this.contact.nom, Validators.required),
      lastName: new FormControl(this.contact.prenom, Validators.required),
      email: new FormControl(this.contact.email, [Validators.required, Validators.email]),
      work: new FormControl(this.contact.sexe, Validators.required),
      street: new FormControl(this.contact.adresse, Validators.required),
      city: new FormControl(this.contact.dateNaiss, Validators.required),
      state: new FormControl(this.contact.nrotel, Validators.required),
      zip: new FormControl(this.contact.cin, Validators.required)
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close(null);
  }

}
