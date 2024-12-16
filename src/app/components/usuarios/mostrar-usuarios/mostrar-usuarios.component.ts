import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenService } from '../../../services/ordenes/orden.service'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-mostrar-usuarios',
  standalone: true,
  imports: [
    MatTableModule, 
    CommonModule, 
    MatPaginator
  ],
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css'],
})
export class MostrarUsuariosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[] = ['nombre', 'paterno', 'materno', 'correo', 'fecharegistro', 'accion']; 
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  
  totalItems: number = 0;
  pageSize: number = 20;

  usuarios: any[] = [];
  
  constructor(private ordenService: OrdenService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.ordenService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.totalItems = data.length;
        this.dataSource.data = data;
        if (this.paginator) {
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = this.pageSize;
        }
      },
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; 
    }
  }

  editarUsuario(id: number): void {
    this.router.navigate([`/agregar-usuario/${id}`]);  
  }
}
