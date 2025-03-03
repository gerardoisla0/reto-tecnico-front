
import { UserDTO } from "src/infrastructure/dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import { ResponseDTO } from "src/infrastructure/dto/response.dto";

export class UserMapper {
  static fromDtoToDomain(dto: ResponseDTO):UserEntity {
    return new UserEntity(
      dto.saveUserRS?.name ?? '',
      dto.saveUserRS?.email ?? ''
    );
  }
  static fromDomainToDto( entity: UserEntity) : UserDTO {
    return {
      saveUserRQ: {
        password: entity.password ?? '',
        name: entity.nombre,
        email: entity.email
      }
    }
  }
}

