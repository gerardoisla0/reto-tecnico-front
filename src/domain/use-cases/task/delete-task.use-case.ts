import { Injectable } from "@angular/core";
import { TaskRepositoryPort } from "../../../domain/ports/repositories/task.respository.port";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DeleteTaskUseCase {

  constructor( private taskRespository: TaskRepositoryPort){}

  execute( taskId: number) : Observable<void> {
    return this.taskRespository.deleteTask( taskId );
  }

}
