export class TaskEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status: string,
  ) {}
}
