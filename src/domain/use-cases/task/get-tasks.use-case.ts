import { Injectable } from "@angular/core";
import { TaskRepositoryPort } from "../../../domain/ports/repositories/task.respository.port";
import { Observable } from "rxjs";
import { TaskEntity } from "../../../domain/entities/task.entity";


@Injectable({
    providedIn: 'root'
})

export class GetTaskUseCase {

    constructor( private _taskRepository: TaskRepositoryPort){}
    execute():Observable<TaskEntity[]>{
        return this._taskRepository.getTasks();
    }
}
