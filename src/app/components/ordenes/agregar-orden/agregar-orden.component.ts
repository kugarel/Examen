import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenService } from '../../../services/ordenes/orden.service';
import { Router } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSnackBar } from '@angular/material/snack-bar';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-orden',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './agregar-orden.component.html',
  styleUrls: ['./agregar-orden.component.css'],
})
export class AgregarOrdenComponent implements OnInit {
  ordenForm: FormGroup;
  usuarios: { idusuario: number; nombre: string, paterno: string, materno: string }[] = [];
  productos: { idproducto: number; nombre: string, categoria: string }[] = [];
  fechaHoy: string; 
  total: number = 0;  

  constructor(
    private fb: FormBuilder, 
    private ordenService: OrdenService,
    private router: Router, 
    private snackBar: MatSnackBar  
  ) {
    this.fechaHoy = new Date().toISOString().split('T')[0];

    this.ordenForm = this.fb.group({
      usuario: ['', Validators.required],
      producto: ['', Validators.required],
      fecha: [{ value: this.fechaHoy, disabled: true }], 
      total: [{ value: this.total, disabled: true }], 

      cantidad: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)],
      ],
      preciounitario: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarProductos();
  }

  calcularTotal(): void {
    const cantidad = this.ordenForm.value.cantidad;
    const precioUnitario = this.ordenForm.value.preciounitario;

    if (cantidad && precioUnitario) {
      this.total = cantidad * precioUnitario;
    } else {
      this.total = 0;
    }
  }

  cargarUsuarios(): void {
    this.ordenService.obtenerUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  cargarProductos(): void {
    this.ordenService.obtenerProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  agregarOrden(): void {
    if (this.ordenForm.valid) {
      const orden = {
        usuario: {
          idusuario: this.ordenForm.value.usuario,
        },
        producto: {
          idproducto: this.ordenForm.value.producto, 
        },
        cantidad: this.ordenForm.value.cantidad,
        preciounitario: this.ordenForm.value.preciounitario, 
        fecha: this.fechaHoy,
      };
  
      this.ordenService.agregarOrden(orden).subscribe({
        next: (response) => {
          console.log('Orden enviada con éxito:', response);
          this.snackBar.open('Orden agregada con éxito', 'Cerrar', {
            duration: 3000, 
          });
          this.ordenForm.reset();
          this.router.navigate(['/mostrar-ordenes']); 
        },
        error: (err) => {
          this.snackBar.open('Error al agregar la orden', 'Cerrar', {
            duration: 3000, 
          });
          console.error('Error al enviar la orden:', err);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
