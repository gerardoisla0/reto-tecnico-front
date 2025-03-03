import { SaveTaskDTO } from 'src/infrastructure/dto/saveTask.dto';
import { TaskDTO, Task } from '../../infrastructure/dto/task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDTO } from 'src/infrastructure/dto/updateTask.dto';

export class TaskMapper {
  static fromDtoToDomain(dto: Task): TaskEntity {
    return new TaskEntity(dto.id, dto.title, dto.description, dto.status);
  }

  static fromDomainToDto(entity: TaskEntity): SaveTaskDTO {
    return {
      saveTaskRQ: {
        title: entity.title,
        description: entity.description,
        status: entity.status
      }
    };
  }

  static fromDomainToDtoUpdate(entity: TaskEntity): UpdateTaskDTO {
    return {
      updateTaskRQ: {
        title: entity.title,
        description: entity.description,
        status: entity.status
      }
    };
  }
}

