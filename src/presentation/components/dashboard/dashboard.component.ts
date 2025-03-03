import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { AddDialogComponent } from '../dialogs/add/add-task.component';
import { TaskEntity } from 'src/domain/entities/task.entity';
import { GetTaskUseCase } from 'src/domain/use-cases/task/get-tasks.use-case';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LogoutUserUseCase } from 'src/domain/use-cases/user/logout-user.use-case';
import { DeleteTaskUseCase } from 'src/domain/use-cases/task/delete-task.use-case';
import { DeleteDialogComponent } from '../dialogs/delete/delete.component';
import { EditDialogComponent } from '../dialogs/edit/edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];
  dataSource: MatTableDataSource<TaskEntity> = new MatTableDataSource();

  constructor(private _getTaskUseCase: GetTaskUseCase,
     private _logoutUserUseCase: LogoutUserUseCase,
     private _deleteTaskUseCase: DeleteTaskUseCase,
     private dialog: MatDialog,
     private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._getTaskUseCase.execute().subscribe((data: TaskEntity[]) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
     });
  }

  refresh() {
    this.loadData();
  }

  logout(){
    this._logoutUserUseCase.execute();  // Llamada al servicio para cerrar sesión (si ya tienes implementado el logout)
    this.router.navigate(['/login']);
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue: TaskEntity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  startEdit(row: TaskEntity) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const index = this.dataSource.data.findIndex(task => task.id === row.id);
          if (index !== -1) {
            this.dataSource.data[index] = row;
            this.dataSource = new MatTableDataSource(this.dataSource.data);
          }
      }
    });
  }

  deleteItem(row: TaskEntity) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const index = this.dataSource.data.findIndex(task => task.id === row.id);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
          }
      }
    });
  }

}
