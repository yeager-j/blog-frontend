import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Article } from '../common/classes/article';
import { ArticleService } from '../common/services/article.service';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Observable<Article[]>;

  constructor(public auth: AuthService, private articleService: ArticleService) { }

  ngOnInit() {
    this.articles = this.articleService.getAll();
  }
}
