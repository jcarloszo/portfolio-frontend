import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Proyecto } from 'src/app/models/Proyecto';

@Component({
  selector: 'app-detail-proyecto',
  templateUrl: './detail-proyecto.component.html',
  styleUrls: ['./detail-proyecto.component.css']
})
export class DetailProyectoComponent implements OnInit {
  @Input() proyecto : Proyecto | undefined;

  @Output() eventEditar = new EventEmitter();

  @Output() eventMoverAbajo = new EventEmitter();

  @Output() eventMoverArriba = new EventEmitter();

  @Output() eventBorrar = new EventEmitter();

  constructor(private authService: AuthService) {}

  Login(){
    return this.authService.logIn;
  }

  ejecutarEvento(){
    this.eventEditar.emit(this.proyecto?.id);
  }

  ValidImg(){
    return this.proyecto?.urlImagen !== null && this.proyecto?.urlImagen.length !== 0;
  }

  moverAbajo(posicion: number | undefined){
    this.eventMoverAbajo.emit(this.proyecto?.posicion);
  }

  moverArriba(posicion: number | undefined){
    this.eventMoverArriba.emit(this.proyecto?.posicion);
  }

  ejecutarBorrar(){
    this.eventBorrar.emit(this.proyecto?.id);
  }

  ngOnInit(): void {
  }

}
