import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { FooterPageComponent } from './components/footer-page/footer-page.component';
import { ArgProgramaLogoComponent } from './components/arg-programa-logo/arg-programa-logo.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { SecExperienciaComponent } from './components/sec-experiencia/sec-experiencia.component';
import { SecEducacionComponent } from './components/sec-educacion/sec-educacion.component';
import { SecSkillsComponent } from './components/sec-skills/sec-skills.component';
import { SecProyectosComponent } from './components/sec-proyectos/sec-proyectos.component';
import { DetailExperienciaComponent } from './components/detail-experiencia/detail-experiencia.component';
import { DetailEducacionComponent } from './components/detail-educacion/detail-educacion.component';
import { LoginComponent } from './components/login/login.component';
import { BtnEditComponent } from './components/buttons/btn-edit/btn-edit.component';
import { BtnDeleteComponent } from './components/buttons/btn-delete/btn-delete.component';
import { BtnAddComponent } from './components/buttons/btn-add/btn-add.component';
import { BtnDesComponent } from './components/buttons/btn-des/btn-des.component';
import { BtnAscComponent } from './components/buttons/btn-asc/btn-asc.component';
import { DetailProyectoComponent } from './components/detail-proyecto/detail-proyecto.component';
import { DetailSkillComponent } from './components/detail-skill/detail-skill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    FooterPageComponent,
    ArgProgramaLogoComponent,
    SobreMiComponent,
    InicioComponent,
    Pagina404Component,
    SecExperienciaComponent,
    SecEducacionComponent,
    SecSkillsComponent,
    SecProyectosComponent,
    DetailExperienciaComponent,
    DetailEducacionComponent,
    LoginComponent,
    BtnEditComponent,
    BtnDeleteComponent,
    BtnAddComponent,
    BtnDesComponent,
    BtnAscComponent,
    DetailProyectoComponent,
    DetailSkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
