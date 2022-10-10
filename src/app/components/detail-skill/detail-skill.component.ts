import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Skill } from 'src/app/models/Skill';

@Component({
  selector: 'app-detail-skill',
  templateUrl: './detail-skill.component.html',
  styleUrls: ['./detail-skill.component.css']
})
export class DetailSkillComponent implements OnInit {

  @Input() skill : Skill | undefined;

  @Output() eventEditar = new EventEmitter();

  @Output() eventMoverAbajo = new EventEmitter();

  @Output() eventMoverArriba = new EventEmitter();

  @Output() eventBorrar = new EventEmitter();

  public rotation : string | undefined;

  constructor(private authService: AuthService) {
    
  }

  Login(){
    return this.authService.logIn;
  }

  ejecutarEvento(){
    this.eventEditar.emit(this.skill?.id);
  }

  moverAbajo(posicion: number | undefined){
    this.eventMoverAbajo.emit(this.skill?.posicion);
  }

  moverArriba(posicion: number | undefined){
    this.eventMoverArriba.emit(this.skill?.posicion);
  }

  ejecutarBorrar(){
    this.eventBorrar.emit(this.skill?.id);
  }

  ngOnInit(): void {
    if(this.skill != undefined) 
      this.rotation = `rotate(${this.skill?.progreso * 180 / 100}deg)`;    
  }

}
