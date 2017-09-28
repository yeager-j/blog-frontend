import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Article } from '../classes/article';
import 'rxjs/add/operator/map';
import { User } from '../classes/user';
import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';

@Injectable()
export class ArticleService {
  private url = 'http://localhost:3000/api/articles/';
  constructor(private authHttp: AuthHttp, private http: Http) { }

  get(id: string): Observable<Article> {
    return this.http.get(this.url + id)
      .map(res => {
        let article = res.json();

        return new Article(
          article._id,
          article.title,
          article.body,
          new User(
            article.user._id,
            article.user.name,
            article.user.email,
            article.user.rank,
            article.user.articles,
            article.user.comments,
            article.user.date_created
          ),
          article.date_created,
          article.date_updated
        );
      });
  }

  getAll() {
    return this.http.get(this.url)
      .map(res => {
        return res.json().map(article => {
          return new Article(
            article._id,
            article.title,
            article.body,
            new User(
              article.author._id,
              article.author.name,
              article.author.email,
              article.author.rank,
              article.author.articles,
              article.author.comments,
              article.author.date_created
            ),
            article.date_created,
            article.date_updated
          );
        });
      });
  }

  create(article) {
    return this.authHttp.post(this.url, article);
  }
}
