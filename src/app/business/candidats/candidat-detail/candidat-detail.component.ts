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

  title = 'Edit Candidat';
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CandidatDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public candidat: Candidat) { }

  ngOnInit() {
    this.buildForm();
    // this.form.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.candidat.id),
      nom: new FormControl(this.candidat.nom, Validators.required),
      prenom: new FormControl(this.candidat.prenom, Validators.required),
      sexe: new FormControl(this.candidat.sexe, Validators.required),
      nomJF: new FormControl(this.candidat.prenom),
      email: new FormControl(this.candidat.email, [Validators.required, Validators.email]),
      adresse: new FormControl(this.candidat.adresse, Validators.required),
      dateNaiss: new FormControl(new Date(this.candidat.dateNaiss), Validators.required),
      tel: new FormControl(this.candidat.tel, Validators.required),
      cin: new FormControl(this.candidat.cin, Validators.required),
      comm_enr: new FormControl(this.candidat.comm_enr, Validators.required),
      comm_resid: new FormControl(this.candidat.comm_resid, Validators.required),
    prenomP: new FormControl(this.candidat.prenomP, Validators.required),
      nomM: new FormControl(this.candidat.nomM, Validators.required),
      prenomM: new FormControl(this.candidat.prenomM, Validators.required),
    nation: new FormControl(this.candidat.nation, Validators.required),
      sang_grp: new FormControl(this.candidat.sang_grp, Validators.required),
      sit_fam: new FormControl(this.candidat.sit_fam, Validators.required),
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
