import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { SobreMiServiceService } from 'src/app/services/sobre-mi-service.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  sobreMi: any;
  urlFondo = "";

  constructor(public authService: AuthService, public sobreMiService: SobreMiServiceService){
    sobreMiService.GetInfo().subscribe(res => {
      this.sobreMi = res;
      this.urlFondo = this.sobreMi.urlFondo;
    });
  }

  ValidFondo(){
    if(this.urlFondo == null) return false;
    return this.urlFondo.length !== 0;
  }

  ngOnInit(): void {
  }

}
