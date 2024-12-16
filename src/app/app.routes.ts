import { Routes } from '@angular/router';
import { AgregarOrdenComponent } from './components/ordenes/agregar-orden/agregar-orden.component';
import { MostrarOrdenesComponent } from './components/ordenes/mostrar-ordenes/mostrar-ordenes.component';
import { AgregarUsuarioComponent } from './components/usuarios/agregar-usuario/agregar-usuario.component';
import { MostrarUsuariosComponent } from './components/usuarios/mostrar-usuarios/mostrar-usuarios.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'mostrar-ordenes' },  
{ path: 'agregar-orden', loadComponent: () => import('./components/ordenes/agregar-orden/agregar-orden.component').then(m => m.AgregarOrdenComponent) },
{ path:'mostrar-ordenes',component:MostrarOrdenesComponent},
{ path: 'agregar-usuario', component: AgregarUsuarioComponent },
{ path: 'agregar-usuario/:idusuario', component: AgregarUsuarioComponent }, 
{ path:'mostrar-usuarios',component:MostrarUsuariosComponent}

];
