import { Injectable } from '@angular/core';
import { HttpAdapter } from '../adapters/http/http.adapter';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { UserDTO } from '../dto/user.dto';
import { ResponseDTO } from '../dto/response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private endpoint = `/v1/user/create`;

  constructor( private httpAdapter: HttpAdapter){}

  addUser( user: UserEntity ):Observable<UserEntity> {
    const apiUser  = UserMapper.fromDomainToDto(user);
    return this.httpAdapter.post<ResponseDTO>(this.endpoint, apiUser).pipe(
      map(UserMapper.fromDtoToDomain),
      catchError(this.handleError)
    );
  }

  loginUser( user: UserEntity): Observable<any> {
    const url = `${this.endpoint}/${user.id}`;
    const userApi = UserMapper.fromDomainToDto(user);
    return this.httpAdapter.post<UserDTO>(this.endpoint, userApi).pipe(
      //map(UserMapper.fromDtoToDomain)
    );

  }
  private handleError(error: any): Observable<never> {
    if (error.status === 422) {
      return throwError(() => new Error(error.error.message || 'Cliente ya existe'));
    }
    return throwError(() => new Error('Un error ocurrió. Intenta nuevamente más tarde.'));
  }
}
