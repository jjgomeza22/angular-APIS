import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: 'juan',
      email: 'juan@gmail.com',
      password: 'kek'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login() {
    this.authService.login('juan@gmail.com','kek')
    .subscribe(rta => {
      this.token = rta.accesToken;
    });
  }

  getProfile() {
    this.authService.profile(this.token);
  }
}
