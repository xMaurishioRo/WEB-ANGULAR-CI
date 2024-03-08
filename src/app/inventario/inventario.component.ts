import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule,FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  cadenaDeBusqueda: string = '';
  productos: Productos[] = [];
  mostrarVentanaEmergente = false;
  precio_unitario: number = 0;
  stock: number = 0;
nombre: string = '';
descripcion: string = '';
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
  

  mostrarVentana() {
    this.mostrarVentanaEmergente = true;
  }

  cerrarVentana() {
    this.mostrarVentanaEmergente = false;
    // Limpiar los campos del formulario
    this.nombre = '';
    this.descripcion = '';
    this.precio_unitario = 0;
    this.stock = 0;
  }
  guardarProducto() {
    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio_unitario: this.precio_unitario,
      stock: this.stock
    };
  
    // Realizar la solicitud HTTP POST
    this.http.post('https://deploy-7ohq.onrender.com/productos', producto).subscribe(
      (response: any) => {
        console.log('Producto insertado correctamente:', response);
        // Luego de guardar, cierra la ventana emergente
        this.cerrarVentana();
      },
      (error) => {
        console.error('Error al insertar producto:', error);
        // Manejo de errores
      }
    );
  }
}
