import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public static updateLinks: Subject<boolean> = new Subject();
  user: User;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public auth: AuthService, private userService: UserService, private router: Router) {
    NavigationComponent.updateLinks.subscribe(res => {
      this.loadUser();
    });
  }

  ngOnInit() {
    this.loadUser();
  }

  logout() {
    this.auth.logout();
    NavigationComponent.updateLinks.next(true);
    this.router.navigate(['/home']);
  }

  loadUser() {
    let token = localStorage.getItem('blog.token');

    if (token) {
      let id = this.jwtHelper.decodeToken(token);
      this.userService.get(id._id).subscribe(user => {
        this.user = user;
      });
    }
  }
}
