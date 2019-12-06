import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  nombrePagina = "Pagina datalle";

  datosUsuario: any;

  constructor(
    private actRoute: ActivatedRoute
  ) { 
     this.datosUsuario = this.actRoute.queryParams.subscribe(datosRecibidos => {
      this.datosUsuario = JSON.parse(datosRecibidos['dUsuario']);
      console.log(this.datosUsuario);
    })
  }

  ngOnInit() {
   
    
  }
}
