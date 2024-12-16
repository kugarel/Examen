import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,MatExpansionModule,RouterLink],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Examen';

  sidebarAbierto = true;

  alternarSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }
}
