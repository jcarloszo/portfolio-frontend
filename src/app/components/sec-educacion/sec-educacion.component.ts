import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';
import { Educacion } from 'src/app/models/Educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-sec-educacion',
  templateUrl: './sec-educacion.component.html',
  styleUrls: ['./sec-educacion.component.css']
})
export class SecEducacionComponent implements OnInit {

  educacion: Educacion | undefined;
  educacions: Educacion[] | undefined;

  form: FormGroup;
  formTitle = "Agregar Educación";

  IsEdit: boolean = false;

  constructor(
    private authService: AuthService,
    private educacionService: EducacionService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombreInstitucion: ['', Validators.required],
      urlImagen: [''],
      titulo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['']
    });

    educacionService.GetEducacions().subscribe(res => {
      this.educacions = res;
    });
  }

  ngOnInit(): void {
  }

  Login() {
    return this.authService.logIn;
  }

  onEnviar(event: Event) {
    event.preventDefault();

    if (this.form.valid) {

      if (this.IsEdit) {

        let edu = this.form.value;
        edu.posicion = this.educacion?.posicion;

        this.educacionService.EditEdu(this.educacion?.id, this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al actualizar la educación");
        });
      } else {

        let edu = this.form.value;
        edu.posicion = this.nuevaPosicion();

        this.educacionService.CreateEdu(this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al registrar la educación");
        });
      }

    } else {
      this.form.markAllAsTouched;
    }

  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  get NombreInst() {
    return this.form.get('nombreInstitucion');
  }

  get Titulo() {
    return this.form.get('titulo');
  }

  get FechaInicio() {
    return this.form.get('fechaInicio');
  }

  getEventEditar(id: number) {
    this.IsEdit = true;
    this.educacionService.GetEducacionById(id).subscribe(res => {
      this.educacion = res;
      this.SetValues();
    })
    this.formTitle = "Editar Educación";
  }

  SetValues() {
    this.form.controls['nombreInstitucion'].setValue(this.educacion?.nombreInstitucion);
    this.form.controls['urlImagen'].setValue(this.educacion?.urlImagen);
    this.form.controls['titulo'].setValue(this.educacion?.titulo);
    this.form.controls['fechaInicio'].setValue(this.ChangeDateFormat(this.educacion?.fechaInicio));
    this.form.controls['fechaFin'].setValue(this.ChangeDateFormat(this.educacion?.fechaFin));
  }

  ChangeDateFormat(fecha: any) {
    if (fecha) {
      let parsedDate = moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
      return parsedDate;
    }
    return "";
  }

  clickAgregar() {
    this.IsEdit = false;
    this.educacion = undefined;
    this.SetValues();
    this.formTitle = "Agregar Educación";
  }

  nuevaPosicion() {
    if (this.educacions != null) {
      return this.educacions.length + 1;
    }
    return 1;
  }

  getEventMoverArriba(posicion: number) {
    if (this.educacions == null || posicion == this.educacions.length) {
      alert("Acción inválida.");
      return;
    }

    for (let i = 0; i < this.educacions.length; i++) {
      if (this.educacions[i].posicion == posicion) {
        let eduAux = this.educacions[i - 1];
        this.educacions[i - 1] = this.educacions[i];
        this.educacions[i] = eduAux;

        this.educacions[i].posicion = posicion;
        this.educacions[i - 1].posicion = posicion + 1;

        this.actualizarPosicion(this.educacions[i]);
        this.actualizarPosicion(this.educacions[i - 1]);

        break;
      }
    }
  }

  getEventMoverAbajo(posicion: number) {
    if (posicion == 1 || this.educacions == undefined) {
      alert("Acción inválida.");
      return;
    }

    for (let i = 0; i < this.educacions?.length; i++) {
      if (this.educacions[i].posicion == posicion) {
        let eduAux = this.educacions[i + 1];
        this.educacions[i + 1] = this.educacions[i];
        this.educacions[i] = eduAux;

        this.educacions[i].posicion = posicion;
        this.educacions[i + 1].posicion = posicion - 1;

        this.actualizarPosicion(this.educacions[i]);
        this.actualizarPosicion(this.educacions[i + 1]);

        break;
      }
    }
  }

  getEventBorrar(id: number) {
    let mje = confirm(`¿Seguro de quitar su educación en ${this.getNombreById(id)}?`);

    if (!mje) return;
    this.educacionService.DeleteEdu(id, this.getToken()).subscribe(res => {
      this.deleteEduInArray(id);
      window.location.href = "";
    }, err => {
      alert("Error al dar de baja el registro");
    });
  }

  actualizarPosicion(edu: Educacion) {
    this.educacionService.EditEdu(edu.id, edu, this.getToken()).subscribe();
  }

  getNombreById(id: number){
    for(var exp in this.educacions){
      if(this.educacions[Number(exp)].id == id) return this.educacions[Number(exp)].nombreInstitucion;
    }
    return "";
  }

  deleteEduInArray(id: number){
    if(this.educacions == undefined) return;
    
    let bandera = false;
    for(let i = this.educacions?.length - 1; i >= 0; i--){
      if(bandera) {
        var edu = this.educacions[i];
        edu.posicion = edu.posicion - 1;
        this.educacionService.EditEdu(edu.id, edu, this.getToken()).subscribe();
      }

      if(this.educacions[i].id == id) bandera = true;
    }
  }
}

