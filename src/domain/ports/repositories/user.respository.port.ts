import { Observable } from 'rxjs';
import { UserEntity } from '../../entities/user.entity';
import { AuthEntity } from 'src/domain/entities/auth.entity';

export abstract class UserRepositoryPort {
  abstract addUser(user: UserEntity): Observable<UserEntity>;
  abstract loginUser(user: AuthEntity): Observable<UserEntity>;
  abstract logout(): void;
}
