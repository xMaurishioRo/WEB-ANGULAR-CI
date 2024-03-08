import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface CitaAuto {
  loading: boolean;
  nombreUsuario: string;
  auto_id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cita_id: number;
  fecha_hora: string;
  duracion_minutos: number;
  descripcion: string;
  registro_id: number; // Agregamos registro_id aquí
  status: string; // Agregamos registro_id aquí
}

interface Registro {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password_hash: string;
  fecha_registro: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  //img = 'https://w3schools.com/howto/img_avatar.png';
  runrun = 'assets/images/chupo.jpeg'
  ranrun = 'assets/images/coche.avif'
  sr = 'assets/images/search.png'
  citasAutos: CitaAuto[] = [];
  // citasFiltradas: CitaAuto[] = [];
  cadenaDeBusqueda: string = '';
  registros: Registro[] = [];
  estadoFiltro: string = 'all'; 
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.obtenerCitasAutos();
    // this.citasFiltradas = this.citasAutos;
  }

  // filtrarCitas(event: Event) {
  //   const filtro = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.citasFiltradas = this.citasAutos.filter(cita => {
  //     return cita.nombreUsuario.toLowerCase().includes(filtro) ||
  //            cita.descripcion.toLowerCase().includes(filtro) ||
  //            cita.status.toLowerCase().includes(filtro) ||
  //            cita.fecha_hora.toLowerCase().includes(filtro) ||
  //            cita.placa.toLowerCase().includes(filtro);
  //   });
  // }

  

  obtenerCitasAutos(): void {
    this.http.get<Registro[]>('https://deploy-7ohq.onrender.com/login').subscribe(
      (data) => {
        this.registros = data;
        this.http.get<CitaAuto[]>('https://deploy-7ohq.onrender.com/citas-autos').subscribe(
          (citasAutosData) => {
            this.citasAutos = citasAutosData;
            this.asignarNombresUsuario();
          },
          (error) => {
            console.error('Error al obtener las citas y autos:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los registros de usuarios:', error);
      }
    );
  }

  asignarNombresUsuario(): void {
    this.citasAutos.forEach(citaAuto => {
      const registro = this.registros.find(reg => reg.id === citaAuto.registro_id);
      if (registro) {
        citaAuto.nombreUsuario = registro.nombre;
      }
    });
  }

  async actualizarEstadoCita(autoId: number, nuevoEstado: string): Promise<void> {
    const citaIndex = this.citasAutos.findIndex(cita => cita.auto_id === autoId);
    if (citaIndex !== -1) {
      this.citasAutos[citaIndex].loading = true;
  
      const url = `https://deploy-7ohq.onrender.com/actualizar-cita/${autoId}`;
      try {
        await this.http.put(url, { status: nuevoEstado }).toPromise();
        // Actualiza directamente el estado de la cita en el cliente
        this.citasAutos[citaIndex].status = nuevoEstado;
      } catch (error) {
        console.error('Error al actualizar el estado de la cita:', error);
      } finally {
        this.citasAutos[citaIndex].loading = false;
      }
    }
  }
  cambiarEstadoFiltro(nuevoEstado: string): void {
    this.estadoFiltro = nuevoEstado;
  }
  
  actualizarCadenaDeBusqueda(event: Event): void {
    this.cadenaDeBusqueda = (event.target as HTMLInputElement).value.toLowerCase();
  }
  // Método auxiliar para filtrar las citas basado en el estado del filtro
  // get citasFiltradas(): CitaAuto[] {
  //   if (this.estadoFiltro === 'all') {
  //     return this.citasAutos;
  //   } else {
  //     return this.citasAutos.filter(cita => cita.status === this.estadoFiltro);
  //   }
  // }
  get citasFiltradas(): CitaAuto[] {
    let resultadoFiltrado = this.citasAutos;

    // Primero, filtramos por estado si es necesario
    if (this.estadoFiltro !== 'all') {
      resultadoFiltrado = resultadoFiltrado.filter(cita => cita.status === this.estadoFiltro);
    }

    // Luego, aplicamos el filtro de búsqueda sobre el resultado anterior
    if (this.cadenaDeBusqueda) {
      resultadoFiltrado = resultadoFiltrado.filter(cita =>
        cita.nombreUsuario.toLowerCase().includes(this.cadenaDeBusqueda) ||
        cita.descripcion.toLowerCase().includes(this.cadenaDeBusqueda) ||
        cita.status.toLowerCase().includes(this.cadenaDeBusqueda) ||
        cita.fecha_hora.toLowerCase().includes(this.cadenaDeBusqueda) ||
        cita.placa.toLowerCase().includes(this.cadenaDeBusqueda)
      );
    }

    return resultadoFiltrado;
  }
}
