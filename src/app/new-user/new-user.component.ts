import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../cita/contact/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  userData: any;
  email: string = '';
  password: string = '';
  emptyFieldsError: boolean = false;
  errorContent: boolean = false;
  name: string = '';
  lastName: string = '';
  telefono: string = '';
  cpassword: string = '';
  invalidTelefono: boolean = false;
  invalidCorreo: boolean = false;


  constructor(private userService: UserService,private http: HttpClient, private router: Router) {}
  loading = false;
  error = false;

  submitLoginForms(event: Event) {
    event.preventDefault();
    // Simula un tiempo de carga
    this.loading = true;

  }
  getUserData() {
    this.userService.getUser(this.email).subscribe(
      data => {
        this.userData = data;
        console.log(this.userData);
      },
      error => {
        console.error(error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    );}

    incorrectPassword: boolean = false;
    invalidEmail: boolean = false;
    metooPassword: boolean = false;

    submitLoginForm(event: Event) {
      event.preventDefault();
      this.incorrectPassword = false;
      this.metooPassword = false;
      this.invalidEmail = false;
      this.emptyFieldsError = false;

      console.log("nombre: ", this.name);
      console.log("last name: ", this.lastName);
      console.log("Email: ", this.email);
      console.log("telefono: ", this.telefono);
      console.log("Contraseña: ", this.password);
      console.log("confirmar Contraseña: ", this.cpassword);
      this.loading = true;

        // Supongamos que ocurrió un error al enviar el formulario
      // Validar si los campos están vacíos

      if (!this.email || !this.password || !this.name|| !this.lastName|| !this.telefono|| !this.cpassword) {
          // Mostrar mensaje de error
          this.emptyFieldsError = true;
          this.loading = false;
          this.showEmptyFieldsError();
          return; // Detener el flujo de la función
      }  // Evitar envío predeterminado del formulario
      if (this.telefono.length !== 10 || /\D/.test(this.telefono)) { // Verificar si el teléfono tiene 10 dígitos y solo contiene números

          this.scrollToErrorT();
          this.showInvalidCError()
          this.error = true;
          this.loading = false;
          return;
      }if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)){
        this.scrollToError();
          this.showInvalidTError()
          this.error = true;
          this.loading = false;
          return;
      }

      // Reiniciar el mensaje de error de campos vacíos
      this.emptyFieldsError = false;

      // Enviar los datos con el nombre de campo correcto
      if(this.password !== this.cpassword){
        this.metooPassword = true;
        this.loading = false;
        this.showIncorrectPasswordError();
      }else{



      this.http.post<any>('https://deploy-7ohq.onrender.com/registros', {
        p_nombre: this.name,
        p_apellido: this.password,
        p_email: this.email,
        p_telefono: this.telefono,
        p_contrasena: this.password,
        p_rol_id: "4" })
          .subscribe(
              response => {
                  // Si la respuesta del backend es exitosa, redirige a la página de inicio
                  window.location.href = '';
              },
              error => {
                  // Si la respuesta del backend indica un error, muestra un mensaje al usuario
                  console.error('Error al intentar iniciar sesión:', error);
                  if (error.status === 500 ) {
                      // Contraseña incorrecta
                      // this.incorrectPassword = true;
                      this.invalidEmail = true;
                      this.loading = false;
                      this.error = false;
                      this.showInvalidEmailError();

                   }
                  //  else if (error.status === 404) {
                  //     // Correo electrónico no encontrado
                  //     this.invalidEmail = true;
                  //     this.incorrectPassword = false;
                  //     this.loading = false;
                  //     // this.error = false;
                  // }
                  // Mostrar alerta solo si no se muestra un mensaje en el formulario
                  // if (!this.incorrectPassword && !this.invalidEmail) {
                  //     alert('Correo o contraseña incorrectos');
                  // }
              }
          );

  }}
  showEmptyFieldsError() {
    this.emptyFieldsError = true;
    setTimeout(() => { this.emptyFieldsError = false; }, 1000);
  }

  showIncorrectPasswordError() {
    // this.incorrectPassword = true;
    setTimeout(() => { this.metooPassword = false; }, 1000);
  }

  showInvalidEmailError() {
    // this.invalidEmail = true;
    setTimeout(() => { this.invalidEmail = false; }, 1000);
  }
  showInvalidCError() {
    // this.invalidEmail = true;
    setTimeout(() => { this.invalidCorreo = false; }, 1000);
  }
  showInvalidTError() {
    // this.invalidEmail = true;
    setTimeout(() => { this.invalidTelefono = false; }, 1000);
  }
  scrollToError() {
    const errorElement = document.querySelector('.error-email'); // Seleccionar el primer elemento de mensaje de error
    if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazar suavemente al elemento
    }
}
  scrollToErrorT() {
    const errorElement = document.querySelector('.error-telefono'); // Seleccionar el primer elemento de mensaje de error
    if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazar suavemente al elemento
    }
}


}
