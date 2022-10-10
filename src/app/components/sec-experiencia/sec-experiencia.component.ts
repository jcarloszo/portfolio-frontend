import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';
import { Experiencia } from 'src/app/models/Experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-sec-experiencia',
  templateUrl: './sec-experiencia.component.html',
  styleUrls: ['./sec-experiencia.component.css']
})
export class SecExperienciaComponent implements OnInit {

  experiencia: Experiencia | undefined;
  experiencias: Experiencia[] | undefined;

  form: FormGroup;
  formTitle = "Agregar Experiencia";

  IsEdit: boolean = false;

  constructor(
    private authService: AuthService,
    private experienciaService: ExperienciaService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombreOrganizacion: ['', Validators.required],
      urlImagen: [''],
      puesto: ['', Validators.required],
      descripcionPuesto: ['', [Validators.required, Validators.maxLength(1000)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['']
    });

    experienciaService.GetExperiencias().subscribe(res => {
      this.experiencias = res;
      
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
        
        let exp = this.form.value;
        exp.posicion = this.experiencia?.posicion;

        this.experienciaService.EditExp(this.experiencia?.id, this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al actualizar la experiencia");
        });
      } else {      
        
        let exp = this.form.value;
        exp.posicion = this.nuevaPosicion();

        this.experienciaService.CreateExp(this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al registrar la experiencia");
        });
      }

    } else {
      this.form.markAllAsTouched;
    }

  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  get NombreOrg() {
    return this.form.get('nombreOrganizacion');
  }

  get Puesto() {
    return this.form.get('puesto');
  }

  get DescPuesto() {
    return this.form.get('descripcionPuesto')
  }

  get FechaInicio() {
    return this.form.get('fechaInicio');
  }

  getEventEditar(id: number) {
    this.IsEdit = true;
    this.experienciaService.GetExperienciaById(id).subscribe(res => {
      this.experiencia = res;
      this.SetValues();
    })
    this.formTitle = "Editar Experiencia";
  }

  SetValues() {
    this.form.controls['nombreOrganizacion'].setValue(this.experiencia?.nombreOrganizacion);
    this.form.controls['urlImagen'].setValue(this.experiencia?.urlImagen);
    this.form.controls['puesto'].setValue(this.experiencia?.puesto);
    this.form.controls['descripcionPuesto'].setValue(this.experiencia?.descripcionPuesto);
    this.form.controls['fechaInicio'].setValue(this.ChangeDateFormat(this.experiencia?.fechaInicio));
    this.form.controls['fechaFin'].setValue(this.ChangeDateFormat(this.experiencia?.fechaFin));
  }

  ChangeDateFormat(fecha: any) {
    if(fecha){
      let parsedDate = moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
      return parsedDate;
    }
    return "";
  }

  clickAgregar() {
    this.IsEdit = false;
    this.experiencia = undefined;
    this.SetValues();
    this.formTitle = "Agregar Experiencia";
  }
  
  nuevaPosicion(){
    if(this.experiencias != null){
      return this.experiencias.length + 1;
    }
    return 1;
  }

  getEventMoverAbajo(posicion: number){
    if(posicion == 1 || this.experiencias == undefined){
      alert("Acción inválida.");
      return;
    }

    for(let i = 0; i < this.experiencias?.length; i++){
      if(this.experiencias[i].posicion == posicion){
        let expAux = this.experiencias[i + 1];
        this.experiencias[i + 1] = this.experiencias[i];
        this.experiencias[i] = expAux;
        
        this.experiencias[i].posicion = posicion;
        this.experiencias[i + 1].posicion = posicion - 1;
        
        this.actualizarPosicion(this.experiencias[i]);
        this.actualizarPosicion(this.experiencias[i + 1]);
        
        break;
      }
    }
  }

  getEventMoverArriba(posicion: number){
    if(this.experiencias == null || posicion == this.experiencias.length){
      alert("Acción inválida.");
      return;
    }

    for(let i = 0; i < this.experiencias.length; i++){
      if(this.experiencias[i].posicion == posicion){
        let expAux = this.experiencias[i - 1];
        this.experiencias[i - 1] = this.experiencias[i];
        this.experiencias[i] = expAux;
        
        this.experiencias[i].posicion = posicion;
        this.experiencias[i - 1].posicion = posicion + 1;

        this.actualizarPosicion(this.experiencias[i]);
        this.actualizarPosicion(this.experiencias[i - 1]);

        break;
      }
    }
  }

  actualizarPosicion(exp: Experiencia){
    this.experienciaService.EditExp(exp.id, exp, this.getToken()).subscribe();
  }

  getEventBorrar(id: number){
    let mje = confirm(`¿Seguro de quitar su experiencia en ${this.getNombreById(id)}?`);
      
    if(!mje) return;
    this.experienciaService.DeleteExp(id, this.getToken()).subscribe(res => {
      this.deleteExpInArray(id);
      window.location.href = "";
    }, err => {
      alert("Error al dar de baja el registro");
    });
  }

  getNombreById(id: number){
    for(var exp in this.experiencias){
      if(this.experiencias[Number(exp)].id == id) return this.experiencias[Number(exp)].nombreOrganizacion;
    }
    return "";
  }

  deleteExpInArray(id: number){
    if(this.experiencias == undefined) return;
    
    let bandera = false;
    for(let i = this.experiencias?.length - 1; i >= 0; i--){
      if(bandera) {
        var exp = this.experiencias[i];
        exp.posicion = exp.posicion - 1;
        this.experienciaService.EditExp(exp.id, exp, this.getToken()).subscribe();
      }

      if(this.experiencias[i].id == id) bandera = true;
    }
  }
}
