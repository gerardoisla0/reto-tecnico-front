import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskRepositoryPort } from '../../domain/ports/repositories/task.respository.port';
import { TaskService } from '../services/task.service';


@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryImpl implements TaskRepositoryPort {
  constructor(private taskService: TaskService) {}

  getTasks(): Observable<TaskEntity[]> {
    return this.taskService.getTasks();
  }

  addTask(task: TaskEntity): Observable<TaskEntity> {
    return this.taskService.addTask(task);
  }

  updateTask(task: TaskEntity): Observable<void> {
    return this.taskService.updateTask(task);
  }

  deleteTask(id: number): Observable<void> {
    return this.taskService.deleteTask(id);
  }
}
