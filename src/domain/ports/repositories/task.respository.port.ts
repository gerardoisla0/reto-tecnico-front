import { Observable } from 'rxjs';
import { TaskEntity } from '../../entities/task.entity';

export abstract class TaskRepositoryPort {
  abstract getTasks(): Observable<TaskEntity[]>;
  abstract addTask(task: TaskEntity): Observable<TaskEntity>;
  abstract updateTask(task: TaskEntity): Observable<void>;
  abstract deleteTask(id: number): Observable<void>;
}
