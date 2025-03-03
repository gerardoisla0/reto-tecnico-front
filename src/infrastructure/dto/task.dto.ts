export interface TaskDTO {
  listTaskRS: ListTaskRS;
  message:    string;
}

export interface ListTaskRS {
  tasks: Task[];
}

export interface Task {
  id:          number;
  title:       string;
  description: string;
  status:      string;
}
