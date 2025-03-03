import { Injectable } from "@angular/core";
import { TaskRepositoryPort } from "../../../domain/ports/repositories/task.respository.port";
import { Observable } from "rxjs";
import { TaskEntity } from "src/domain/entities/task.entity";

@Injectable({
  providedIn: 'root'
})

export class DeleteTaskUseCase {

  constructor( private taskRespository: TaskRepositoryPort){}

  execute( task: TaskEntity) : Observable<void> {
    return this.taskRespository.deleteTask( task );
  }

}
