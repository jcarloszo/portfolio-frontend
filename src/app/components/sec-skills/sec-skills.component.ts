import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Skill } from 'src/app/models/Skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-sec-skills',
  templateUrl: './sec-skills.component.html',
  styleUrls: ['./sec-skills.component.css']
})
export class SecSkillsComponent implements OnInit {

  skill: Skill | undefined;
  skills: Skill[] | undefined;

  form: FormGroup;
  formTitle = "Agregar Skill";

  IsEdit: boolean = false;

  constructor(
    private authService: AuthService,
    private skillService: SkillService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      progreso: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    skillService.GetSkills().subscribe(res => {
      this.skills = res;
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
        let skill = this.form.value;
        skill.posicion = this.skill?.posicion;

        this.skillService.EditSkill(this.skill?.id, this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al actualizar la skill");
        });
      } else {
        let skill = this.form.value;
        skill.posicion = this.nuevaPosicion();
        
        this.skillService.CreateSkill(this.form.value, this.getToken()).subscribe(res => {
          window.location.href = "";
        }, err => {
          console.log(err);
          alert("Error al registrar la skill");
        });
      }

    } else {
      this.form.markAllAsTouched;
    }


  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  nuevaPosicion() {
    if (this.skills != null) {
      return this.skills.length + 1;
    }
    return 1;
  }

  get Nombre() {
    return this.form.get('nombre');
  }

  get Progreso() {
    return this.form.get('progreso')
  }

  get ProgresoValue() {
    if (this.form.get('progreso')?.value == null) return 50;
    return this.form.get('progreso')?.value;
  }

  SetValues() {
    this.form.controls['nombre'].setValue(this.skill?.nombre);
    this.form.controls['progreso'].setValue(this.skill?.progreso);
  }

  getEventEditar(id: number) {
    this.IsEdit = true;
    this.skillService.GetSkillById(id).subscribe(res => {
      this.skill = res;
      this.SetValues();
    })
    this.formTitle = "Editar Skill";
  }

  clickAgregar() {
    this.IsEdit = false;
    this.skill = undefined;
    this.SetValues();
    this.formTitle = "Agregar Skill";
    this.setInitialRangeValue();
  }

  setInitialRangeValue() {
    this.form.controls['progreso'].setValue(50);
  }

  actualizarPosicion(skill: Skill) {
    this.skillService.EditSkill(skill.id, skill, this.getToken()).subscribe();
  }

  getEventMoverAbajo(posicion: number) {
    if (posicion == 1 || this.skills == undefined) {
      alert("Acción inválida.");
      return;
    }

    for (let i = 0; i < this.skills?.length; i++) {
      if (this.skills[i].posicion == posicion) {
        let skillAux = this.skills[i + 1];
        this.skills[i + 1] = this.skills[i];
        this.skills[i] = skillAux;

        this.skills[i].posicion = posicion;
        this.skills[i + 1].posicion = posicion - 1;

        this.actualizarPosicion(this.skills[i]);
        this.actualizarPosicion(this.skills[i + 1]);

        break;
      }
    }
  }

  getEventMoverArriba(posicion: number) {
    if (this.skills == null || posicion == this.skills.length) {
      alert("Acción inválida.");
      return;
    }

    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].posicion == posicion) {
        let skillAux = this.skills[i - 1];
        this.skills[i - 1] = this.skills[i];
        this.skills[i] = skillAux;

        this.skills[i].posicion = posicion;
        this.skills[i - 1].posicion = posicion + 1;

        this.actualizarPosicion(this.skills[i]);
        this.actualizarPosicion(this.skills[i - 1]);

        break;
      }
    }
  }

  getEventBorrar(id: number) {
    let mje = confirm(`¿Seguro de quitar su skill ${this.getNombreById(id)}?`);

    if (!mje) return;
    this.skillService.DeleteSkill(id, this.getToken()).subscribe(res => {
      this.deleteSkillInArray(id);
      window.location.href = "";
    }, err => {
      alert("Error al dar de baja el registro");
    });
  }

  getNombreById(id: number) {
    for (var proy in this.skills) {
      if (this.skills[Number(proy)].id == id) return this.skills[Number(proy)].nombre;
    }
    return "";
  }

  deleteSkillInArray(id: number) {
    if (this.skills == undefined) return;

    let bandera = false;
    for (let i = this.skills?.length - 1; i >= 0; i--) {
      if (bandera) {
        var skill = this.skills[i];
        skill.posicion = skill.posicion - 1;
        this.skillService.EditSkill(skill.id, skill, this.getToken()).subscribe();
      }

      if (this.skills[i].id == id) bandera = true;
    }
  }
}
