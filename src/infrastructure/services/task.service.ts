import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TaskDTO } from '../dto/task.dto';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskMapper } from '../../domain/mappers/task.mapper';
import { HttpAdapter } from '../adapters/http/http.adapter';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endpoint = '/tasks';

  constructor(private httpAdapter: HttpAdapter) {}
  getTasks(): Observable<TaskEntity[]> {
    return this.httpAdapter.get<TaskDTO[]>(this.endpoint).pipe(
      map((apiTasks) => apiTasks.map(TaskMapper.fromDtoToDomain))
    );
  }

  addTask(task: TaskEntity): Observable<TaskEntity> {
    const apiTask = TaskMapper.fromDomainToDto(task);
    return this.httpAdapter.post<TaskDTO>(this.endpoint, apiTask).pipe(
      map(TaskMapper.fromDtoToDomain)
    );
  }

  updateTask(task: TaskEntity): Observable<void> {
    const url = `${this.endpoint}/${task.id}`;
    const apiTask = TaskMapper.fromDomainToDto(task);
    return this.httpAdapter.put<void>(url, apiTask);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.endpoint}/${id}`;
    return this.httpAdapter.delete<void>(url);
  }
}
