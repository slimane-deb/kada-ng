import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Logger} from '../../../core';
import {ConfirmedDialogComponent} from '../../../shared/dialogs';
import {ExamenService} from '../examen.service';
import {Examen} from '../examen';

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.scss']
})
export class ExamenListComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  screenHeight: any;
  screenWidth: any;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.logger.log(`Resize() height: ${this.screenHeight}; width: ${this.screenWidth}`);
    this.setDisplayedColumns();
  }

  constructor(
    private examenService: ExamenService,
    private logger: Logger,
    private dialog: MatDialog) {

    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
    this.logger.log(`Init() height: ${this.screenHeight}; width: ${this.screenWidth}`);
    this.setDisplayedColumns();
  }

  ngOnInit() {
    this.loadCandidats();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadCandidats() {
    this.examenService.findAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // editExamen(id: string): void {
  //
  //   this.examenService.findById(id).subscribe(data => {
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.height = '80%';
  //     dialogConfig.width = '80%';
  //     dialogConfig.data = data;
  //
  //     const dialogRef = this.dialog.open(ExamenDetailComponent, dialogConfig);
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (!result) {
  //         return;
  //       }
  //       this.examenService.update(result)
  //         .subscribe(_ => this.loadCandidats());
  //     });
  //   });
  // }

  deleteCandidat(examen: Examen): void {
    // Create configuration for the dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      title: `Supprimer  ${examen.date}`,
      message: 'Confirmer?'
    };

    const dialogRef = this.dialog.open(ConfirmedDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(e => e !== examen);
        this.examenService.delete(examen).subscribe();
      }
    });
  }

  setDisplayedColumns() {
    if (this.screenWidth < 420) {
      this.displayedColumns = ['id', 'date', 'adresse', 'action'];
    } else {
      this.displayedColumns = ['id', 'date', 'adresse', 'dicipline', 'action'];
    }
  }

}
