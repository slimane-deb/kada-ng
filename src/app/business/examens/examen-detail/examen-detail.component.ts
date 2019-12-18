import {Component, OnInit, ViewChild} from '@angular/core';
import {Candidat} from '../../candidats/candidat';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmedDialogComponent} from '../../../shared/dialogs';
import {CandidatService} from '../../candidats/candidat.service';
import {Logger} from '../../../core';
import {ExamenService} from '../examen.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-examen-detail',
  templateUrl: './examen-detail.component.html',
  styleUrls: ['./examen-detail.component.scss']
})
export class ExamenDetailComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  screenHeight: any;
  screenWidth: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  id: string;

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
    this.loadCandidatsExamen();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.dataSource.data = this.dataSource.data.filter(e => e !== candidat);
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

  private loadCandidatsExamen() {
    this.candidatService.loadCandidatsExamen(this.id).subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
