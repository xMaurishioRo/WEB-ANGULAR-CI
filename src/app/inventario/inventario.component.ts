import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClient } from '@angular/common/http';
interface Productos {
  producto_id: number;
  nombre: string;
  descripcion: string;
  precio_unitario: number;
  stock: number;
}
@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  cadenaDeBusqueda: string = '';
  productos: Productos[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.obtenerInventario();
  }
  obtenerInventario() {
    this.http.get<Productos[]>('https://deploy-7ohq.onrender.com/productos').subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los registros de usuarios:', error);
      }
    );
  }
  actualizarCadenaDeBusqueda(event: Event): void {
    this.cadenaDeBusqueda = (event.target as HTMLInputElement).value.toLowerCase();
  }
  get citasFiltradas(): Productos[] {
    let resultadoFiltrado = this.productos;

    // Primero, filtramos por estado si es necesario
    // if (this.estadoFiltro !== 'all') {
    //   resultadoFiltrado = resultadoFiltrado.filter(cita => cita.status === this.estadoFiltro);
    // }

    // Luego, aplicamos el filtro de búsqueda sobre el resultado anterior
    if (this.cadenaDeBusqueda) {
      resultadoFiltrado = resultadoFiltrado.filter(prodc =>
        prodc.nombre.toLowerCase().includes(this.cadenaDeBusqueda) ||
        prodc.descripcion.toLowerCase().includes(this.cadenaDeBusqueda) ||
        prodc.precio_unitario.toString().toLowerCase().includes(this.cadenaDeBusqueda) ||
        prodc.stock.toString().toLowerCase().includes(this.cadenaDeBusqueda)
      );
    }

    return resultadoFiltrado;
  }
}
