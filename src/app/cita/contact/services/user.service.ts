import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserInterface } from '../../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APP_URL: string = 'https://deploy-7ohq.onrender.com/login';
  constructor(private http: HttpClient) { }


  authenticate(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.APP_URL, { email, password }).pipe(
      catchError((error) => {
        console.error('Error al autenticar:', error);
        return new Observable<boolean>((observer) => observer.next(false));
      })
    );
  }

  getUser(email: string): Observable<any> {
    const url = `${this.APP_URL}?email=${email}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.log('El usuario no existe');
          // Aquí puedes realizar otras acciones si el usuario no existe, como mostrar un mensaje al usuario
          return throwError('El usuario no existe');
        } else {
          // Manejar otros errores aquí si es necesario
          return throwError('Ocurrió un error al obtener los datos del usuario');
        }
      })
    );
  }

  public getData(): Observable<any>{
    return this.http.get<any>(this.APP_URL);
  }
  getLogersList():Observable<UserInterface>{
    return this.http.get<UserInterface>('https://deploy-7ohq.onrender.com/login');
  }

  getuser(): Observable<any> {
    return this.http.get<{ user: UserInterface[] }>(this.APP_URL);
  }
}
