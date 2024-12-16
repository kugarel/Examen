import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenService } from '../../../services/ordenes/orden.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mostrar-ordenes',
  standalone: true,
  imports: [
    MatTableModule, CommonModule, MatPaginator
  ],
  templateUrl: './mostrar-ordenes.component.html',
  styleUrls: ['./mostrar-ordenes.component.css'],
})
export class MostrarOrdenesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined; // Paginador

  displayedColumns: string[] = ['usuario', 'producto', 'cantidad', 'preciounitario', 'total'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  
  totalItems: number = 0;
  pageSize: number = 20;

  ordenes: any[] = []; 
  granTotal: number = 0; 
  granTotalSmartphones: number = 0;

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.ordenService.obtenerOrdenes().subscribe({
      next: (data) => {
        this.ordenes = data;
        this.totalItems = data.length;
        this.dataSource.data = data;
        this.calcularTotales(); 
        if (this.paginator) {
          this.paginator.pageIndex = 0; 
          this.paginator.pageSize = this.pageSize; 
        }
      },
      error: (err) => console.error('Error al cargar órdenes:', err),
    });
  }

  calcularTotales(): void {
    this.granTotal = this.ordenes.reduce((total, orden) => {
      return total + (orden.cantidad * orden.preciounitario);
    }, 0);

    this.granTotalSmartphones = this.ordenes
      .filter((orden) => orden.producto.categoria === 'Smartphone') 
      .reduce((total, orden) => {
        return total + (orden.cantidad * orden.preciounitario);
      }, 0);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; 
    }
  }
}
