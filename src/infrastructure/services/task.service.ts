import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TaskDTO, Task } from '../dto/task.dto';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskMapper } from '../../domain/mappers/task.mapper';
import { HttpAdapter } from '../adapters/http/http.adapter';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endpoint = '/v1/task/create';
  private endpoin_all = '/v1/task/all';
  private endpoin_update = '/v1/task/update';
  private endpoin_delete = '/v1/task/delete';


  constructor(private httpAdapter: HttpAdapter) {}
  getTasks(): Observable<TaskEntity[]> {
    return this.httpAdapter.get<TaskDTO>(this.endpoin_all).pipe(
      map((apiTasks) => apiTasks.listTaskRS.tasks.map(TaskMapper.fromDtoToDomain))
    );
  }

  addTask(task: TaskEntity): Observable<TaskEntity> {
    const apiTask = TaskMapper.fromDomainToDto(task);
    return this.httpAdapter.post<Task>(this.endpoint, apiTask).pipe(
      map(TaskMapper.fromDtoToDomain)
    );
  }

  updateTask(task: TaskEntity): Observable<void> {
    const url = `${this.endpoin_update}/${task.id}`;
    const apiTask = TaskMapper.fromDomainToDto(task);
    return this.httpAdapter.put<void>(url, apiTask);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.endpoin_delete}/${id}`;
    return this.httpAdapter.delete<void>(url);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Recuperamos el token
  }
}
