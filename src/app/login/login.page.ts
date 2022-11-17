import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuariotemporal } from '../interfaces/usuariotemporal';
import { FirebaseService } from '../services/firebase.service';
//import { LoginService } from './login.service';
import { Usuario } from './usuario';
import * as firebase from "firebase/auth"
import { AuthProvider, getAuth } from 'firebase/auth'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuariotemporal
  private usuarios = []
  mensaje: string
  claseMensaje   : string

  //private servicio: LoginService

  constructor(private servicio: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.obtenerUsuario();
    this.verificarLogin();
  }

  async verificarLogin(){
    const auth = getAuth();
    firebase.onAuthStateChanged(auth,function(user) {
      if (user) {
        console.log('Usuario inciado :',user.displayName)
      }else {
        console.log('Error')
      }
    });
  }

  async onGitHubLogin() {
    var provider = new firebase.GithubAuthProvider();
    const auth = getAuth();
    firebase.signInWithPopup(auth,provider).then(
      (res) => {
        this.router.navigate(['/home'])
        this.servicio.verificacion()
        console.log('User->', res.user)
      },
      (err) => {
        console.log('Error->', err)
      }
    )
  }

  



  onGoogleLogin() {
    var provider = new firebase.GoogleAuthProvider();
    const auth = getAuth();
    firebase.signInWithPopup(auth,provider).then(
      (res) => {
        this.router.navigate(['/home'])
        this.servicio.verificacion()
        console.log('User->', res.user)
      },
      (err) => {
        console.log('Error->', err)
      }
    )
  }

  async login(email, pass) {
    this.usuario = this.obtenerUsEs(email.value, pass.value)
    console.log(this.usuario)
    if (this.usuario.email === email.value && this.usuario.pass === pass.value && this.usuario.tipo === "Pasajero") {
      this.loginFire(this.usuario.email, this.usuario.pass)
      this.router.navigate(['/home']); 
    } else if ( this.usuario.email === email.value && this.usuario.pass === pass.value && this.usuario.tipo === 'Conductor'){
      this.loginFire(this.usuario.email,this.usuario.pass)
      this.router.navigate(['/home-conductor'])
    } else {
      this.servicio.mensaje('Error en la credenciales')
    }
  }

  async loginFire(email, pass) {
    try {
      const user = this.servicio.login(email, pass)
      if (user) {
        console.log(user)
        this.router.navigate(['/home-conductor']);
      }
    } catch (error){
      console.log(error)
    }
  }

  private obtenerUsuario() {
    this.servicio.getCollection<Usuariotemporal>('UsuarioDuoc').subscribe(
      (res) => {
        console.log(res)
        this.usuarios = (res)
      },
      (err) => {
        console.log(err)
      }  
    )
  }

  private obtenerUsEs(email: string, pass: string) {
    return{
      ...this.usuarios.find(aux => {
        return aux.email === email && aux.pass === pass
      })
    }
  }

}


  


