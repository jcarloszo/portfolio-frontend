import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  email = '';
  password = '';

  constructor(public authService: AuthService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      password:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]]
    })
  }

  onEnviar(event: Event){
    event.preventDefault();

    if(this.form.valid){
      this.authService.login(this.form.get("email")?.value, this.form.get("password")?.value);
    } else {
      this.form.markAllAsTouched;
    }
  }

  ngOnInit(): void {
  }

  get Email(){
    return this.form.get("email");
  }

  get Password(){
    return this.form.get("password");
  }
}
