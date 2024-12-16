import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';  
import { MatSnackBar } from '@angular/material/snack-bar';  

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],  
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  fechaHoy: string;
  usuarioId: number | null = null;  

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,
    private route: ActivatedRoute,  
    private snackBar: MatSnackBar  
  ) {
    this.fechaHoy = new Date().toISOString().split('T')[0]; 

    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      paterno: ['', [Validators.required, Validators.maxLength(50)]],
      materno: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      fecharegistro: [{ value: this.fechaHoy, disabled: true }],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.usuarioId = +params.get('idusuario')!;  
      if (this.usuarioId) {
        this.cargarUsuario(this.usuarioId);  
      }
    });
  }

  cargarUsuario(id: number): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          paterno: usuario.paterno,
          materno: usuario.materno,
          correo: usuario.correo,
          fecharegistro: usuario.fecharegistro,
        });
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  agregarUsuario(): void {
    if (this.usuarioForm.valid) {
      const usuario = {
        nombre: this.usuarioForm.value.nombre,
        paterno: this.usuarioForm.value.paterno,
        materno: this.usuarioForm.value.materno,
        correo: this.usuarioForm.value.correo,
        estatus: 1,
        fecharegistro: this.fechaHoy,
      };

      if (this.usuarioId) {
        this.usuarioService.actualizarUsuario(this.usuarioId, usuario).subscribe({
          next: (response) => {
            console.log('Usuario actualizado con éxito:', response);
            this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/mostrar-usuarios']);
          },
          error: (err) => {
            console.error('Error al actualizar el usuario:', err);
            this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      } else {
        this.usuarioService.agregarUsuario(usuario).subscribe({
          next: (response) => {
            console.log('Usuario agregado con éxito:', response);
            this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/mostrar-usuarios']);
          },
          error: (err) => {
            console.error('Error al agregar el usuario:', err);
            this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
