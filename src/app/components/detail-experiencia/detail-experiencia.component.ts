import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';
import { Experiencia } from 'src/app/models/Experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { formatDate } from 'src/app/utils';

@Component({
  selector: 'app-detail-experiencia',
  templateUrl: './detail-experiencia.component.html',
  styleUrls: ['./detail-experiencia.component.css']
})
export class DetailExperienciaComponent implements OnInit {
  @Input() experiencia : Experiencia | undefined;

  @Output() eventEditar = new EventEmitter();

  @Output() eventBorrar = new EventEmitter();

  @Output() eventMoverAbajo = new EventEmitter();

  @Output() eventMoverArriba = new EventEmitter();

  constructor(private authService: AuthService) {}

  Login(){
    return this.authService.logIn;
  }

  FormatDate(fecha : Date | undefined){
    return formatDate(fecha);
  }

  ejecutarEvento(){
    this.eventEditar.emit(this.experiencia?.id);
  }

  ejecutarBorrar(){
    this.eventBorrar.emit(this.experiencia?.id);
  }

  ValidImg(){
    return this.experiencia?.urlImagen !== null && this.experiencia?.urlImagen.length !== 0;
  }

  moverAbajo(posicion: number | undefined){
    this.eventMoverAbajo.emit(this.experiencia?.posicion);
  }

  moverArriba(posicion: number | undefined){
    this.eventMoverArriba.emit(this.experiencia?.posicion);
  }

  ngOnInit(): void {
  }


}
