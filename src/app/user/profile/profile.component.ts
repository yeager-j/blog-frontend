import { Component, OnInit } from '@angular/core';
import { User } from '../../common/classes/user';
import { UserService } from '../../common/services/user.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  async ngOnInit() {
    let id = 0;

    this.route.params.subscribe(params => {
      id = params['id'];
    });

    this.userService.get(id).subscribe(user => {
      this.user = user;
    });
  }

}
