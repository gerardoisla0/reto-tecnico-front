import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, inject, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AddTaskUseCase } from 'src/domain/use-cases/task/add-task.use-case';
import { TaskEntity } from 'src/domain/entities/task.entity';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskEntity,
              private addTaskUseCase: AddTaskUseCase) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.addTaskUseCase.execute(this.data).subscribe({
      next: (response) => {
        console.log("Tarea creada correctamente", response);
        this.dialogRef.close(1);
      },
      error: (error) => {
        console.error("Error al cargar las tareas", error);
      }
    });
  }
}
