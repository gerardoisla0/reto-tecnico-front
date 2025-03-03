import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserService } from '../services/user.service';
import { UserRepositoryPort } from 'src/domain/ports/repositories/user.respository.port';
import { AuthEntity } from 'src/domain/entities/auth.entity';

@Injectable({
  providedIn: 'root'
})
export class UserRespositoryImpl implements UserRepositoryPort {

  constructor( private _userService: UserService){}

  addUser(user: UserEntity): Observable<UserEntity> {
    return this._userService.addUser(user);
  }
  loginUser(user: AuthEntity): Observable<UserEntity> {
    return this._userService.loginUser(user);
  }
}
