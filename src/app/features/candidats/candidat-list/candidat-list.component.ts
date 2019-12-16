import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Candidat} from '../shared/candidat';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmedDialogComponent} from '../../../shared/dialogs';
import {CandidatDetailComponent} from '../candidat-detail/candidat-detail.component';
import {CandidatService} from '../shared/candidat.service';
import {Logger} from '../../../core';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.scss']
})
export class CandidatListComponent implements OnInit {

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
    private candidatService: CandidatService,
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
    this.candidatService.getCandidats().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  editCandidat(id: number): void {

    this.candidatService.getCandidat(id).subscribe(data => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.height = '300px';
      dialogConfig.width = '450px';
      dialogConfig.data = data;

      const dialogRef = this.dialog.open(CandidatDetailComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        this.candidatService.updateCandidat(result)
          .subscribe(_ => this.loadCandidats());
      });
    });
  }

  deleteCandidat(candidat: Candidat): void {
    // Create configuration for the dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      title: `Delete  ${candidat.firstName} ${candidat.lastName}`,
      message: 'Are you sure?'
    };

    const dialogRef = this.dialog.open(ConfirmedDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(e => e !== candidat);
        this.candidatService.deleteCandidat(candidat).subscribe();
      }
    });
  }

  getFullName(candidat: Candidat): string {
    return `${candidat.firstName} ${candidat.lastName}`;
  }

  getAddress(candidat: Candidat): string {
    return `${candidat.address} ${candidat.dob}, ${candidat.phone}, ${candidat.cin}`;
  }

  /**
   * Update a list of table columns to be displayed based on the width of the screen.
   */
  setDisplayedColumns() {
    if (this.screenWidth < 420) {
      this.displayedColumns = ['id', 'fullName', 'work', 'action'];
    } else if (this.screenWidth >= 420 && this.screenWidth <= 800) {
      this.displayedColumns = ['id', 'fullName', 'email', 'work', 'state', 'action'];
    } else {
      this.displayedColumns = ['id', 'fullName', 'email', 'work', 'address', 'action'];
    }
  }

}
