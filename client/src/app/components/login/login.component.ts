import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormField, ButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: '',
      password: ''
    })
  }

  login(form: FormGroup): void {
    console.log("starting login");
    console.log(form.value.email);
    this.authService.login(form.value.email, form.value.password).subscribe(res => {
      console.log("login success")
      console.log(res)
      this.router.navigate(['/home']);
    });
  }
}