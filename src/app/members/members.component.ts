import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { User } from '../common/classes/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users: Observable<User[]>;
  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getAll();
    this.userService.getCurrent().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  remove(id) {
    this.userService.remove(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
