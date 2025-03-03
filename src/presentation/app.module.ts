import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AddDialogComponent } from './components/dialogs/add/add-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskRepositoryPort } from 'src/domain/ports/repositories/task.respository.port';
import { UserRepositoryPort } from 'src/domain/ports/repositories/user.respository.port';
import { TaskRepositoryImpl } from 'src/infrastructure/repositories/task.respository.impl';
import { UserRespositoryImpl } from 'src/infrastructure/repositories/user.respository.impl';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from 'src/infrastructure/adapters/http/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddDialogComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: TaskRepositoryPort, useClass: TaskRepositoryImpl},
    { provide: UserRepositoryPort, useClass: UserRespositoryImpl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Esto asegura que el interceptor se ejecute en todas las solicitudes HTTP
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
