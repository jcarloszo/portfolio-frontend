import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-sec-proyectos',
  templateUrl: './sec-proyectos.component.html',
  styleUrls: ['./sec-proyectos.component.css']
})
export class SecProyectosComponent implements OnInit {

  proyecto: Proyecto | undefined;
  proyectos: Proyecto[] | undefined;

  form: FormGroup;
  formTitle = "Agregar Proyecto";

  IsEdit: boolean = false;

  constructor(
    private authService: AuthService,
    private proyectoService: ProyectoService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      urlImagen: [''],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]]
    });

    proyectoService.GetProyectos().subscribe(res => {
      this.proyectos = res;
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
        
        let proy = this.form.value;
        proy.posicion = this.proyecto?.posicion;

        this.proyectoService.EditProy(this.proyecto?.id, this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al actualizar el proyecto");
        });
      } else {      
        
        let proy = this.form.value;
        proy.posicion = this.nuevaPosicion();

        this.proyectoService.CreateProy(this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al registrar el proyecto");
        });
      }

    } else {
      this.form.markAllAsTouched;
    }

  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  nuevaPosicion(){
    if(this.proyectos != null){
      return this.proyectos.length + 1;
    }
    return 1;
  }

  get Titulo() {
    return this.form.get('titulo');
  }

  get Desc() {
    return this.form.get('descripcion')
  }

  getEventEditar(id: number) {
    this.IsEdit = true;
    this.proyectoService.GetProyectoById(id).subscribe(res => {
      this.proyecto = res;
      this.SetValues();
    })
    this.formTitle = "Editar Proyecto";
  }

  SetValues() {
    this.form.controls['titulo'].setValue(this.proyecto?.titulo);
    this.form.controls['urlImagen'].setValue(this.proyecto?.urlImagen);
    this.form.controls['descripcion'].setValue(this.proyecto?.descripcion);
  }

  clickAgregar() {
    this.IsEdit = false;
    this.proyecto = undefined;
    this.SetValues();
    this.formTitle = "Agregar Proyecto";
  }

  getEventMoverAbajo(posicion: number){
    if(posicion == 1 || this.proyectos == undefined){
      alert("Acción inválida.");
      return;
    }

    for(let i = 0; i < this.proyectos?.length; i++){
      if(this.proyectos[i].posicion == posicion){
        let proyAux = this.proyectos[i + 1];
        this.proyectos[i + 1] = this.proyectos[i];
        this.proyectos[i] = proyAux;
        
        this.proyectos[i].posicion = posicion;
        this.proyectos[i + 1].posicion = posicion - 1;
        
        this.actualizarPosicion(this.proyectos[i]);
        this.actualizarPosicion(this.proyectos[i + 1]);
        
        break;
      }
    }
  }

  getEventMoverArriba(posicion: number){
    if(this.proyectos == null || posicion == this.proyectos.length){
      alert("Acción inválida.");
      return;
    }

    for(let i = 0; i < this.proyectos.length; i++){
      if(this.proyectos[i].posicion == posicion){
        let proyAux = this.proyectos[i - 1];
        this.proyectos[i - 1] = this.proyectos[i];
        this.proyectos[i] = proyAux;
        
        this.proyectos[i].posicion = posicion;
        this.proyectos[i - 1].posicion = posicion + 1;

        this.actualizarPosicion(this.proyectos[i]);
        this.actualizarPosicion(this.proyectos[i - 1]);

        break;
      }
    }
  }

  actualizarPosicion(proy: Proyecto){
    this.proyectoService.EditProy(proy.id, proy, this.getToken()).subscribe();
  }

  getEventBorrar(id: number){
    let mje = confirm(`¿Seguro de quitar su Proyecto ${this.getNombreById(id)}?`);
      
    if(!mje) return;
    this.proyectoService.DeleteProy(id, this.getToken()).subscribe(res => {
      this.deleteProyectoInArray(id);
      window.location.href = "";
    }, err => {
      alert("Error al dar de baja el registro");
    });
  }

  getNombreById(id: number){
    for(var proy in this.proyectos){
      if(this.proyectos[Number(proy)].id == id) return this.proyectos[Number(proy)].titulo;
    }
    return "";
  }

  deleteProyectoInArray(id: number){
    if(this.proyectos == undefined) return;
    
    let bandera = false;
    for(let i = this.proyectos?.length - 1; i >= 0; i--){
      if(bandera) {
        var proy = this.proyectos[i];
        proy.posicion = proy.posicion - 1;
        this.proyectoService.EditProy(proy.id, proy, this.getToken()).subscribe();
      }

      if(this.proyectos[i].id == id) bandera = true;
    }
  }
}
