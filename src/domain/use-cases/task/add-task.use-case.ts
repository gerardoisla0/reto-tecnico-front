import { Injectable } from "@angular/core";
import { TaskRepositoryPort } from "../../../domain/ports/repositories/task.respository.port";
import { TaskEntity } from "../../../domain/entities/task.entity";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class AddTaskUseCase {

  constructor(private taskRespository: TaskRepositoryPort){}

  execute(task: TaskEntity):Observable<TaskEntity> {
    return this.taskRespository.addTask(task);
  }

}
