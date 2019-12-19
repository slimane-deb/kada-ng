import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Candidat} from '../../candidats/candidat';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmedDialogComponent} from '../../../shared/dialogs';
import {CandidatService} from '../../candidats/candidat.service';
import {Logger} from '../../../core';
import {ExamenService} from '../examen.service';
import {ActivatedRoute} from '@angular/router';
import {Examen} from '../examen';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-examen-detail',
  templateUrl: './examen-detail.component.html',
  styleUrls: ['./examen-detail.component.scss']
})
export class ExamenDetailComponent implements OnInit {

  displayedColumns: string[];
  dsExam = new MatTableDataSource();
  screenHeight: any;
  screenWidth: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  id: string;
  examen$: Observable<Examen>;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.logger.log(`Resize() height: ${this.screenHeight}; width: ${this.screenWidth}`);
    this.setDisplayedColumns();
  }

  constructor( private examenService: ExamenService,
               private candidatService: CandidatService,
               private logger: Logger,
               private dialog: MatDialog,
               private route: ActivatedRoute) {

    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
    this.logger.log(`Init() height: ${this.screenHeight}; width: ${this.screenWidth}`);
    this.setDisplayedColumns();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.examen$ = this.examenService.findOne(this.id);
    this.loadCandidatsExamen();
    this.dsExam.paginator = this.paginator;
    this.dsExam.sort = this.sort;
    console.log(this.dsExam);
  }

  private loadCandidatsExamen() {
    this.candidatService.loadCandidatsByExamen(this.id).subscribe(data => {
      this.dsExam.data = data;
    });
  }

  deleteCandidatExamen(candidat: Candidat): void {
    // Create configuration for the dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      title: `Delete  ${candidat.nom} ${candidat.prenom}`,
      message: 'Are you sure?'
    };

    const dialogRef = this.dialog.open(ConfirmedDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dsExam.data = this.dsExam.data.filter(e => e !== candidat);
        this.examenService.deleteCandidatExamen(candidat.id).subscribe();
      }
    });
  }

  getFullName(candidat: Candidat): string {
    return `${candidat.nom} ${candidat.prenom}`;
  }

  setDisplayedColumns() {
    if (this.screenWidth < 420) {
      this.displayedColumns = ['id', 'fullName', 'adresse', 'action'];
    } else if (this.screenWidth >= 420 && this.screenWidth <= 800) {
      this.displayedColumns = ['id', 'fullName', 'tel', 'adresse', 'action'];
    } else {
      this.displayedColumns = ['id', 'fullName', 'tel', 'adresse', 'dateNaiss', 'action'];
    }
  }


}
