import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { SobreMiServiceService } from 'src/app/services/sobre-mi-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SobreMi } from 'src/app/models/SobreMi';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  
  
  sobreMi: SobreMi | undefined;
  
  form : FormGroup;
  
  constructor(private authService: AuthService, private sobreMiService: SobreMiServiceService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
      urlAvatar: [''],
      urlFondo: ['']
    });

    sobreMiService.GetInfo().subscribe(response => {
      this.sobreMi = response;
    });
  }

  OpenModal(){
    this.sobreMiService.GetInfo().subscribe(response => {
      this.sobreMi = response;
      this.SetValues();
    });
  }

  SetValues(){
    this.form.controls['titulo'].setValue(this.sobreMi?.titulo);
    this.form.controls['descripcion'].setValue(this.sobreMi?.descripcion);
    this.form.controls['urlAvatar'].setValue(this.sobreMi?.urlAvatar);
    this.form.controls['urlFondo'].setValue(this.sobreMi?.urlFondo);
  }

  onEnviar(event: Event){
    event.preventDefault();
    if(this.form.valid){
      let token = localStorage.getItem('auth_token');
      this.sobreMiService.UpdateInfo(this.form.value, token).subscribe(res => {
        window.location.href = window.location.href;
      },
      err => {
        alert("Error al registrar los cambios");
      });
    } else {
      this.form.markAllAsTouched;
    }
  }

  get Titulo(){
    return this.form.get('titulo');
  }

  get Desc(){
    return this.form.get('descripcion');
  }

  Login(){
    return this.authService.logIn;
  }

  ValidAvatar(){
    return this.sobreMi?.urlAvatar.length !== 0;
  }

  ngOnInit(): void {
  }

}
