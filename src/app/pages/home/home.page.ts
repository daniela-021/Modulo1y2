import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import{ UsersService } from '../../services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  titpag = "Página inicio <3";

  listado: any;
  estadoOK: boolean = true; 
  estadoOKCreate: boolean = true; 
  
  constructor(
    public navCtrl: NavController,
    private userService: UsersService,
    private AlertController: AlertController,
    public toastController: ToastController


  ) {
  console.log("aquí parte todo")
  this.listarUsuarios();
  }

  listarUsuarios() {
    this.userService.obtenerListadoDeUsuarios()
    .then(data => {
      this.listado = data;
    console.log(data);
    }, (error) => { 
      console.error(error);
      this.estadoOK =false;
    })
    
}

  irA(usuario) {
    let parametros: NavigationExtras = {
      queryParams: {
      dUsuario: JSON.stringify(usuario)
      }
      };

    this.navCtrl.navigateForward(['/detalle'], parametros);
    }

    async alertaCrearUsuario() {
      const alert = await this.AlertController.create({
        header: 'Crear nuevo usuario!',
        inputs: [
          {
            name: 'nombre',
            type: 'text',
            placeholder: 'Nombre'
          },
          {
            name: 'trabajo',
            type: 'text',
            placeholder: 'Trabajo'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok');
              this.userService.agregarNuevoUsuario(data.nombre, data.trabajo)
              .then(respuesta => {
                console.log(respuesta); 
                this.usuarioAddOK()
              }, (error)=>{
                console.error(error);
                this.usuarioAddERROR();
              })
            }
          }
        ]
      });
  
      await alert.present();
    }

    async usuarioAddOK() {
      const toast = await this.toastController.create({
        message: 'Usuario agregado con exito',
        duration: 2000
      });
      toast.present();
    }

    async usuarioAddERROR() {
      const toast = await this.toastController.create({
        message: 'Problema al agregar usuario',
        duration: 2000
      });
      toast.present();
    }
    
    async mostrarToast(texto: string) {
      const toast = await this.toastController.create({
        message: texto,
        duration: 2000
      });
      toast.present();
    }

    editarUsuario(idUsuario: number, nombreOrg: string, trabajoOrg: string ){
    this.alertaeditarUsuario(idUsuario, nombreOrg, trabajoOrg);
    }

    async alertaeditarUsuario(idUsr: number, nombreOrg: string, trabajoOrg) {
      const alert = await this.AlertController.create({
        header: 'Crear nuevo usuario!',
        inputs: [
          {
            name: 'nombre',
            type: 'text',
            value: nombreOrg,
            placeholder: 'Nombre'
          },
          {
            name: 'trabajo',
            type: 'text',
            value: trabajoOrg,
            placeholder: 'Trabajo'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok');
              this.userService.editarUsuario(idUsr, data.nombre, data.trabajo)
              .then(respuesta => {
                console.log(respuesta); 
                this.usuarioAddOK()
              }, (error)=>{
                console.error(error);
                this.usuarioAddERROR();
              })
            }
          }
        ]
      });
  
      await alert.present();
    }

   eliminar(idUsr: number){
     this.userService.eliminarUsuario(idUsr)
     .then(data => {
       console.log(data);
       this.mostrarToast('Usuario eliminado correctamente');
     }, (error) => {
       console.log(error)
       this.mostrarToast('Problemas al eliminar usuario')
     })
   }    
    
}
