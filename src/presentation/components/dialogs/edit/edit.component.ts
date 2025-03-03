import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UpdateTaskUseCase } from 'src/domain/use-cases/task/update-task.use-case';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _updateTaskUseCase: UpdateTaskUseCase
            ) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this._updateTaskUseCase.execute(this.data).subscribe({
      next: (response) => {
        console.log("Tarea editada correctamente", response);
        this.dialogRef.close(1);
      },
      error: (error) => {
        console.error("Error al editar las tareas", error);
      }
    });
  }
}
