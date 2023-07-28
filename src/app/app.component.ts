import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private filesServices: FilesService,
  ) {}

  ngAfterViewInit(): void {
    this.createUser();
    this.login();
  }

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
    this.authService.profile();
  }

  downLoadPdf() {
    this.filesServices.getFiles(
      'juanito.pdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf'
    )
  }
}
