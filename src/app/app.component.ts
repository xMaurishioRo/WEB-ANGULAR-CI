import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { InventarioComponent } from "./inventario/inventario.component";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TrabajadoresComponent } from "./trabajadores/trabajadores.component";
interface CitaAuto {
  auto_id: number;
  fecha_hora: string;
  duracion_minutos: number;
  status: string; // Nueva propiedad para el estado
  descripcion: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomepageComponent, InventarioComponent, HomeComponent, CommonModule, TrabajadoresComponent,RouterLink]
})
export class AppComponent  implements OnInit{
  // showTabs = true;

  // constructor(private router: Router) {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Verifica si la ruta actual es '/login'
  //       this.showTabs = !event.url.includes('/');
  //       this.showTabs = !event.url.includes('/sing-up');
  //     }
  //   });
  // }
  citasAutos: CitaAuto[] = [];
  cantidadOnHold: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerCitasAutos();
  }

  obtenerCitasAutos(): void {
    this.http.get<CitaAuto[]>('https://deploy-7ohq.onrender.com/citas-autos')
      .subscribe(
        (data) => {
          this.citasAutos = data;
          
          // Filtrar citas con estado "Processing"
          const onHoldCitas = this.citasAutos.filter(cita => cita.status === 'On-Hold');
          
          // Contar cuántas citas tienen el estado "Processing"
          this.cantidadOnHold = onHoldCitas.length;
          
          console.log('Cantidad de citas con estado "Processing":', this.cantidadOnHold);
        },
        (error) => {
          console.error('Error al obtener las citas y autos:', error);
        }
      );
  }
  

  
  selectedTab: number = 1;

  showContent(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
}
