import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private url = 'http://localhost:3000/api/users/';
  private currentUser: User;

  constructor(private authHttp: AuthHttp, private http: Http) { }

  get(id) {
    return this.http.get(this.url + id)
      .map(res => {
        let response = res.json();

        return new User(
          response._id,
          response.name,
          response.email,
          response.rank,
          response.articles,
          response.comments,
          response.date_created
        );
      });
  }

  getCurrent() {
    if (!tokenNotExpired('blog.token')) {
      return new Observable(observer => {
        observer.next(new User('', 'Guest', '', 3, [], [], new Date()));
      });
    }

    let jwtHelper: JwtHelper = new JwtHelper();
    let id = jwtHelper.decodeToken(localStorage.getItem('blog.token'))._id;

    return this.get(id).map(user => {
      return new User(
        user._id,
        user.name,
        user.email,
        user.rank,
        user.articles,
        user.comments,
        user.date_created
      );
    }, () => {
      localStorage.removeItem('blog.token');
      return this.getCurrent();
    });
  }

  getAll() {
    return this.http.get(this.url)
      .map(res => {
        return res.json().map(user => {
          return new User(
            user._id,
            user.name,
            user.email,
            user.rank,
            user.articles,
            user.comments,
            user.date_created
          );
        });
      });
  }

  create(user) {
    return this.http.post(this.url, user)
      .map(res => {
        let response = res.json();
        localStorage.setItem('blog.token', response.token);
        return response;
      });
  }

  remove(id) {
    return this.authHttp.delete(this.url + id);
  }
}
