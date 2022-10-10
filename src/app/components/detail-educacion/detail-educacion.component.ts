import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';
import { Educacion } from 'src/app/models/Educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { formatDate } from 'src/app/utils';

@Component({
  selector: 'app-detail-educacion',
  templateUrl: './detail-educacion.component.html',
  styleUrls: ['./detail-educacion.component.css']
})
export class DetailEducacionComponent implements OnInit {
  @Input() educacion : Educacion | undefined;

  @Output() eventEditar = new EventEmitter();

  @Output() eventMoverAbajo = new EventEmitter();

  @Output() eventMoverArriba = new EventEmitter();

  @Output() eventBorrar = new EventEmitter();

  constructor(private authService: AuthService) {}

  Login(){
    return this.authService.logIn;
  }

  FormatDate(fecha : Date | undefined){
    return formatDate(fecha);
  }

  ejecutarEvento(){
    this.eventEditar.emit(this.educacion?.id);
  }

  ValidImg(){
    return this.educacion?.urlImagen !== null && this.educacion?.urlImagen.length !== 0;
  }

  moverAbajo(posicion: number | undefined){
    this.eventMoverAbajo.emit(this.educacion?.posicion);
  }

  moverArriba(posicion: number | undefined){
    this.eventMoverArriba.emit(this.educacion?.posicion);
  }

  ejecutarBorrar(){
    this.eventBorrar.emit(this.educacion?.id);
  }

  ngOnInit(): void {
  }
}
