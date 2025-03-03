import { Injectable } from "@angular/core";;
import { Observable } from "rxjs";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/repositories/user.respository.port";


@Injectable({
  providedIn: 'root'
})

export class AddUserUseCase {

  constructor(private UserRespository: UserRepositoryPort){}

  execute(user: UserEntity):Observable<UserEntity> {
    return this.UserRespository.loginUser(user);
  }

}
