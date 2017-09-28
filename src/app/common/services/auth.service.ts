import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  private url = 'http://localhost:3000/api/users/';

  constructor(private http: Http) { }

  loggedIn() {
    return tokenNotExpired('blog.token');
  }

  login(creds) {
    return this.http.post(this.url + 'login', creds)
  }

  logout() {
    localStorage.removeItem('blog.token');
  }
}
