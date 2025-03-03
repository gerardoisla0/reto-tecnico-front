import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { UserEntity } from 'src/domain/entities/user.entity';
import { AddUserUseCase } from 'src/domain/use-cases/user/add-user.use-case';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _addUserUseCase: AddUserUseCase) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
      }
    )
  }

  ngOnInit(): void {
  }

  register(){
    const name = this.form.value.name;
    const email = this.form.value.email;
    const password = this.form.value.password;

    const userCreated: UserEntity = {
      nombre: name,
      email: email,
      password: password
    }

    this._addUserUseCase.execute(userCreated).subscribe({
      next: (response) => {
        this._snackBar.open('User created successfully!', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      error: (error) => {
        if (error.message === 'Cliente ya existe') {
          this._snackBar.open(error.message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        } else {
          this._snackBar.open('An error occurred. Please try again later.', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
        this.form.reset();
      }
    });
  }

  error() {
    this._snackBar.open('An error occurred. Please try again later.', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }



}
