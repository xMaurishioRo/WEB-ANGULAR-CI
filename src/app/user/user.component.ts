  import { Component,OnInit  } from '@angular/core';
  import { Router, RouterLink, RouterOutlet } from '@angular/router';
  import { UserService } from '../cita/contact/services/user.service';
  import { FormsModule } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { CookieService } from 'ngx-cookie-service'; // Import CookieService here
import { Token } from '@angular/compiler';

  @Component({
    selector: 'app-user',
    standalone: true,
    imports: [RouterLink,FormsModule,CommonModule,RouterOutlet ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
  })
  export class UserComponent implements OnInit{ //REPARAR FUTURO ANTHONY ...
    userData: any;    email: string = '';
    password: string = '';
    emptyFieldsError: boolean = false;
    errorContent: boolean = false;
    invalidAnswer: boolean = false;

    constructor(private cookie : CookieService,private userService: UserService,private http: HttpClient, private router: Router) {}
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
    loading = false;
    error = false;

    submitLoginForms(event: Event) {
      event.preventDefault();
      // Simula un tiempo de carga
      this.loading = true;
      setTimeout(() => {
        // Supongamos que ocurrió un error al enviar el formulario
        this.loading = false;
        this.error = true;
      }, 2000); // Simula una demora de 2 segundos
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

      submitLoginForm(event: Event) {
        event.preventDefault();
        this.incorrectPassword = false;
        this.invalidEmail = false;
        this.emptyFieldsError = false;
        console.log("Email: ", this.email);
        console.log("Contraseña: ", this.password);
        this.loading = true;

          // Supongamos que ocurrió un error al enviar el formulario
        // Validar si los campos están vacíos
        if (!this.email || !this.password) {
            // Mostrar mensaje de error
            this.invalidEmail = false;
            this.incorrectPassword = false;
            this.emptyFieldsError = true;
            this.loading = false;
            this.showEmptyFieldsError();
            return; // Detener el flujo de la función
        }if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)){

          // this.showInvalidTError()
          this.error = true;
          this.loading = false;
          return;
      }

        // Reiniciar el mensaje de error de campos vacíos
        this.emptyFieldsError = false;

        // Enviar los datos con el nombre de campo correcto
        this.http.post<any>('https://deploy-7ohq.onrender.com/login', { email: this.email, contrasena: this.password })
            .subscribe(
                response => {

                  const token = response.token;

                  this.cookie.set('token', token);
                  const tokene = this.cookie.get('token');
                  console.log('Token almacenado en la cookie:', tokene);

                    // Si la respuesta del backend es exitosa, redirige a la página de inicio
                    window.location.href = '/home';
                },
                error => {
                    // Si la respuesta del backend indica un error, muestra un mensaje al usuario
                    console.error('Error al intentar iniciar sesión:', error);
                    if (error.status === 401) {
                        // Contraseña incorrecta
                        this.incorrectPassword = true
                        this.invalidEmail = false;
                        this.loading = false;
                        this.showInvalidEmailError();
                        this.error = false;
                    } else if (error.status === 404) {
                        // Correo electrónico no encontrado
                        this.invalidEmail = true;
                        this.incorrectPassword = false;
                        this.loading = false;
                        this.showIncorrectPasswordError()
                        this.error = false;
                    }

                    if (!this.incorrectPassword && !this.invalidEmail) {
                        this.invalidAnswer = true;
                        this.invalidEmail = false;
                        this.incorrectPassword = false;
                        this.showInvalidAnswer();
                        this.error;
                        this.loading = false;
                    }
                }
            );
    }
    showEmptyFieldsError() {
      this.emptyFieldsError = true;
      setTimeout(() => { this.emptyFieldsError = false; }, 1000);
    }

    showIncorrectPasswordError() {
      // this.incorrectPassword = true;
      setTimeout(() => { this.incorrectPassword = false; }, 1000);
    }

    showInvalidEmailError() {
      // this.invalidEmail = true;
      setTimeout(() => { this.invalidEmail = false; }, 1000);
    }
    showInvalidAnswer(){
      setTimeout(() => {this.invalidAnswer = false;},3000)
    }



    // login() {
    //   this.userService.authenticate(this.email, this.password).subscribe({

    //     next: (result: boolean) => {
    //       if (result) {
    //         Si la autenticación es exitosa, redirige a la página deseada
    //         this.router.navigate(['/user']); // Cambiar '/dashboard' por la ruta deseada
    //       } else {
    //         Si la autenticación falla, muestra un mensaje de error
    //         console.log('Correo o contraseña incorrectos');
    //       }
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //     }
    //   });
    // }
  }
