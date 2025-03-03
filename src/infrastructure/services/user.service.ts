import { Injectable } from '@angular/core';
import { HttpAdapter } from '../adapters/http/http.adapter';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { UserDTO } from '../dto/user.dto';
import { ResponseDTO } from '../dto/response.dto';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { LocalStorageAdapter } from '../adapters/storage/storage.adapter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint_create = `/v1/user/create`;
  private endpoint_auth = `/v1/user/login`;

  constructor( private httpAdapter: HttpAdapter){}

  addUser( user: UserEntity ):Observable<UserEntity> {
    const apiUser  = UserMapper.fromDomainToDto(user);
    return this.httpAdapter.post<ResponseDTO>(this.endpoint_create, apiUser).pipe(
      map(UserMapper.fromDtoToDomain),
      catchError(this.handleError)
    );
  }

  loginUser( user: AuthEntity): Observable<UserEntity> {
    const userApi = UserMapper.fromDomainToDtoAuth(user);
    return this.httpAdapter.post<ResponseDTO>(this.endpoint_auth, userApi).pipe(
      map((response) => {
        const token = response.authUserRS?.token;
        if (token) {
          LocalStorageAdapter.setItem('authToken', token);
          LocalStorageAdapter.setItem('email', user.email);
        }
        return UserMapper.fromDtoToDomain(response);
      }),
      catchError((error) => {
        if (error.status === 422) {
          LocalStorageAdapter.removeItem('authToken');
          LocalStorageAdapter.removeItem('email');
        }
        return this.handleError(error);
      })
    );
  }

  logout() {
        LocalStorageAdapter.removeItem('authToken');
        LocalStorageAdapter.removeItem('email');
  }

  private handleError(error: any): Observable<never> {
    if (error.status === 422) {
      return throwError(() => new Error(error.error.message || 'Cliente ya existe'));
    }
    return throwError(() => new Error('Un error ocurrió. Intenta nuevamente más tarde.'));
  }
}
