import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login(): void {
    console.log("starting login");
    this.authService.login(this.email, this.password).subscribe(res => {
      console.log("login succes")
      console.log(res)
    });
  }
}