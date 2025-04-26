import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";
import { HeaderComponent } from "./core/header/header.component";
import { SidebarComponent } from "./core/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MarketSense';
}
