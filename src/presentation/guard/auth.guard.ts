import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageAdapter } from 'src/infrastructure/adapters/storage/storage.adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = LocalStorageAdapter.getItem('authToken');

    if (token) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
