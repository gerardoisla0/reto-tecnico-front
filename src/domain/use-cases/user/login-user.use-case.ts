import { Injectable } from "@angular/core";;
import { Observable } from "rxjs";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepositoryPort } from "src/domain/ports/repositories/user.respository.port";
import { AuthEntity } from "src/domain/entities/auth.entity";


@Injectable({
  providedIn: 'root'
})

export class LoginUserUseCase {

  constructor(private UserRespository: UserRepositoryPort){}

  execute(user: AuthEntity):Observable<UserEntity> {
    return this.UserRespository.loginUser(user);
  }

}
