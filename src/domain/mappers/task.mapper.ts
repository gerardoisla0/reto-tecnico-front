import { TaskDTO } from '../../infrastructure/dto/task.dto';
import { TaskEntity } from '../entities/task.entity';

export class TaskMapper {
  static fromDtoToDomain(dto: TaskDTO): TaskEntity {
    return new TaskEntity(dto.id, dto.title, dto.description, dto.status);
  }

  static fromDomainToDto(entity: TaskEntity): TaskDTO {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      status: entity.status
    };
  }
}
