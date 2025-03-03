import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AddDialogComponent } from '../dialogs/add/add-task.component';
import { TaskEntity } from 'src/domain/entities/task.entity';
import { GetTaskUseCase } from 'src/domain/use-cases/task/get-tasks.use-case';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns = ['id', 'title', 'description', 'status', 'actions'];
  dataSource: TaskingDataSource | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild('filter') filter: ElementRef | null = null;

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private getTaskUseCase: GetTaskUseCase
  ) {}

  ngOnInit() {
      this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue: TaskEntity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  // startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string, author_association: string) {
  //   this.id = id;
  //   // index row is used just for debugging proposes and can be removed
  //   this.index = i;
  //   console.log(this.index);
  //   const dialogRef = this.dialog.open(EditDialogComponent, {
  //     data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at, author_association:author_association}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       // When using an edit things are little different, firstly we find record inside DataService by id
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
  //       // Then you update that record using data from dialogData (values you enetered)
  //       this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
  //       // And lastly refresh table
  //       this.refreshTable();
  //     }
  //   });
  // }

  // deleteItem(i: number, id: number, title: string, state: string, url: string, author_association: string) {
  //   this.index = i;
  //   this.id = id;
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: {id: id, title: title, state: state, url: url, author_association: author_association}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
  //       // for delete we use splice in order to remove single object from DataService
  //       this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //       this.refreshTable();
  //     }
  //   });
  // }


  // private refreshTable() {
  //   // Refreshing table using paginator
  //   // Thanks yeager-j for tips
  //   // https://github.com/marinantonio/angular-mat-table-crud/issues/12
  //   this.paginator._changePageSize(this.paginator.pageSize);
  // }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/

      loadData() {
        //if (this.paginator && this.sort) {
          this.dataSource = new TaskingDataSource(this.getTaskUseCase, this.paginator!, this.sort!);

          fromEvent(this.filter!.nativeElement, 'keyup').subscribe(() => {
            if (this.dataSource) {
              this.dataSource.filter = this.filter!.nativeElement.value;
            }
          });
       // }
      }
}

export class TaskingDataSource extends DataSource<TaskEntity> {
  _filterChange = new BehaviorSubject('');
  filteredData: TaskEntity[] = [];
  renderedData: TaskEntity[] = [];

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _getTaskUseCase: GetTaskUseCase,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<TaskEntity[]> {
    const displayDataChanges = [
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        this._getTaskUseCase.execute().subscribe((data: TaskEntity[]) => {
          this.filteredData = data.filter((issue: TaskEntity) => {
            const searchStr = (issue.id + issue.title + issue.description + issue.status).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

          const sortedData = this.sortData(this.filteredData.slice());

          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.slice(startIndex, startIndex + this._paginator.pageSize);

          return this.renderedData;
        });

        return [];
      })
    );
  }

  disconnect() {}

  sortData(data: TaskEntity[]): TaskEntity[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
