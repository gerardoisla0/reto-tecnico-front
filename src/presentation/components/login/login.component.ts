import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { LoginUserUseCase } from 'src/domain/use-cases/user/login-user.use-case';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _loginUserUseCase: LoginUserUseCase) {
    this.form = this.fb.group(
      {
        usuario: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  login(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    const userLogin: AuthEntity = {
      email: usuario,
      password: password
    }

    this.loading = true;
    this._loginUserUseCase.execute(userLogin).subscribe({
      next: (response) => {
        this._snackBar.open('Login successfully!', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.loading = false;
        this.router.navigate(['dashboard'])
      },
      error: (error) => {
        if (error.message == 'Las credenciales son incorrectas') {
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
        this.loading = false;
      }
    });
  }

  error(){
    this._snackBar.open('Invalid Username or Password!', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
