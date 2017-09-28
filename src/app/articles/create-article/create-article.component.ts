import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../common/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  title: string;
  body: string;
  errors: Array<string> = [];

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.articleService.create({
      title: this.title,
      body: this.body
    }).subscribe(res => {
      this.router.navigate(['/articles']);
    }, (error => {
      this.errors = error.json().errors;
    }));
  }
}
