import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { DeleteTaskUseCase } from 'src/domain/use-cases/task/delete-task.use-case';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _deleteTaskUseCase: DeleteTaskUseCase) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this._deleteTaskUseCase.execute(this.data).subscribe({
      next: (response) => {
        console.log("Tarea eliminada correctamente", response);
        this.dialogRef.close(1);
      },
      error: (error) => {
        console.error("Error al eliminar las tareas", error);
      }
    });
  }
}
