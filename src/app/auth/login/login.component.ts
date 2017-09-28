import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { NavigationComponent } from '../../common/navigation/navigation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errors: string[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
        res = res.json();
        localStorage.setItem('blog.token', res.token);
        NavigationComponent.updateLinks.next(true);
        this.router.navigate(['/home']);
      }, (error) => {
        error = error.json();
        this.errors = error.errors;
      });
  }
}
