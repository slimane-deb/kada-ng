import {Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Candidat} from '../candidat';
import {CandidatService} from '../candidat.service';
import {Logger} from '../../../core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.scss']
})
export class CandidatDetailComponent implements OnInit {

  title = 'Edit Candidat';
  form: FormGroup;
  id: string;
  imgSrc: string;

  constructor(
    private candidatService: CandidatService,
    private logger: Logger,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<CandidatDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public candidat: Candidat) { }

  ngOnInit() {
    if (!this.candidat.id) {

      this.id = this.route.snapshot.paramMap.get('id');
      this.candidatService.getCandidat(this.id).subscribe( data => {
        this.candidat = data;
        // this.candidat.image = new File([window.atob(this.candidat.image)],
        //   this.candidat.nom + '' + this.candidat.prenom);
        // this.imgSrc =
        this.buildForm();
        }
      );
    } else {
      this.buildForm();
    }

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
      image: new FormControl(this.candidat.image, Validators.required),
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
