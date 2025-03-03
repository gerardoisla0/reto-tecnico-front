import { Observable } from 'rxjs';
import { UserEntity } from '../../entities/user.entity';

export abstract class UserRepositoryPort {
  abstract addUser(user: UserEntity): Observable<UserEntity>;
  abstract loginUser(user: UserEntity): Observable<UserEntity>;
}
