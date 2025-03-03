import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { GetTaskUseCase } from 'src/domain/use-cases/task/get-tasks.use-case';
import { LogoutUserUseCase } from 'src/domain/use-cases/user/logout-user.use-case';

import { TaskEntity } from 'src/domain/entities/task.entity';
import { DeleteTaskUseCase } from 'src/domain/use-cases/task/delete-task.use-case';
import { Router } from '@angular/router';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { AddDialogComponent } from '../dialogs/add/add-task.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.component';
import { EditDialogComponent } from '../dialogs/edit/edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let getTaskUseCaseMock: jasmine.SpyObj<GetTaskUseCase>;
  let logoutUserUseCaseMock: jasmine.SpyObj<LogoutUserUseCase>;
  let deleteUserUseCaseMock: jasmine.SpyObj<DeleteTaskUseCase>;
  let routerMock: jasmine.SpyObj<Router>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  const mockTasks: TaskEntity[] = [
    { id: 1, title: 'Test Task 1', description: 'Description 1', status: 'Pending' },
    { id: 2, title: 'Test Task 2', description: 'Description 2', status: 'Completed' }
  ];

  beforeEach(async () => {
    getTaskUseCaseMock = jasmine.createSpyObj('GetTaskUseCase', ['execute']);
    logoutUserUseCaseMock = jasmine.createSpyObj('LogoutUserUseCase', ['execute']);
    deleteUserUseCaseMock = jasmine.createSpyObj('DeleteTaskUseCase', ['execute']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, AddDialogComponent, EditDialogComponent, DeleteDialogComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatTableModule, MatMenuModule, MatIconModule, MatToolbarModule],
      providers: [
        { provide: GetTaskUseCase, useValue: getTaskUseCaseMock },
        { provide: LogoutUserUseCase, useValue: logoutUserUseCaseMock},
        { provide: DeleteTaskUseCase, useValue: deleteUserUseCaseMock},
        { provide: Router, useValue: routerMock},
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    getTaskUseCaseMock.execute.and.returnValue(of(mockTasks));
    fixture.detectChanges();
  });

  it('debe cargar los datos correctamente en ngOnInit', () => {

    component.ngOnInit();

    expect(getTaskUseCaseMock.execute).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockTasks);
  });

  it('debe abrir el modal de añadir tarea correctamente y agregarla al dataSource', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(1));
    dialogMock.open.and.returnValue(dialogRefMock);

    component.dataSource.data = [...mockTasks];

    const newTask: TaskEntity = { id: 3, title: 'Test Task 3', description: 'Description 3', status: 'Pending' };
    component.addNew();

    expect(dialogMock.open).toHaveBeenCalledWith(AddDialogComponent, jasmine.any(Object));

    component.dataSource.data.push(newTask);
    expect(component.dataSource.data.length).toBe(3);
  });

  it('debe abrir el modal de editar tarea y actualizar los datos en el dataSource', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(1));
    dialogMock.open.and.returnValue(dialogRefMock);

    component.dataSource.data = [...mockTasks];

    const editedTask: TaskEntity = { id: 1, title: 'Updated Task 1', description: 'Updated Description 1', status: 'Completed' };
    component.startEdit(editedTask);

    expect(dialogMock.open).toHaveBeenCalledWith(EditDialogComponent, { data: editedTask });

    component.dataSource.data[0] = editedTask;
    expect(component.dataSource.data[0].title).toBe('Updated Task 1');
    expect(component.dataSource.data[0].description).toBe('Updated Description 1');
  });

  it('debe abrir el modal de eliminar tarea y eliminarla del dataSource', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(1));
    dialogMock.open.and.returnValue(dialogRefMock);

    component.dataSource.data = [...mockTasks];

    const taskToDelete: TaskEntity = { id: 1, title: 'Test Task 1', description: 'Description 1', status: 'Pending' };
    component.deleteItem(taskToDelete);

    expect(dialogMock.open).toHaveBeenCalledWith(DeleteDialogComponent, { data: taskToDelete });

    component.dataSource.data = component.dataSource.data.filter(task => task.id !== taskToDelete.id);
    expect(component.dataSource.data.length).toBe(2);
  });
});
