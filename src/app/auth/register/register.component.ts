import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';
import { NavigationComponent } from '../../common/navigation/navigation.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  confirm_password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.create({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe(res => {
      NavigationComponent.updateLinks.next(true);
      this.router.navigate(['/home']);
    });
  }
}
