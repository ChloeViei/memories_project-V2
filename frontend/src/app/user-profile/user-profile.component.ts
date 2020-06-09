import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
      },
      err => {
        console.log(err);

      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
