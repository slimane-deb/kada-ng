import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Logger} from '../../../core';
import {ExamenService} from '../examen.service';
import {Examen} from '../examen';

@Component({
  selector: 'app-examen-new',
  templateUrl: './examen-new.component.html',
  styleUrls: ['./examen-new.component.scss']
})
export class ExamenNewComponent implements OnInit {

  title = 'Ajouter Examen';
  examenFrom: FormGroup;
  // addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private examenService: ExamenService,
    private logger: Logger) { }

  ngOnInit() {
    this.buildExamenForm();
    // this.examenFrom.valueChanges.subscribe(val => {
    //   console.log(val); });
  }

  buildExamenForm(): void {
    this.examenFrom = this.formBuilder.group({
      date: ['', Validators.required],
      adresse: ['', Validators.required],
      dicipline: ['', Validators.required ],
    });
  }

  save() {
    if (this.invalidForms()) {
      return;
    }

    const newExamen = this.getExamen();
    this.logger.log(`New Examen: ${newExamen}`);

    this.examenService.save(newExamen).subscribe(result => {
      if (result) {
        this.router.navigate(['/examens']);
      }
    });
  }
  invalidForms(): boolean {
    return this.examenFrom.invalid;
  }

  getExamen(): Examen {
    return { ...this.examenFrom.value };
  }
}
