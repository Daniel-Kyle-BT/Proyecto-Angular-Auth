import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBannerComponent } from "@shared/components/organism/error-banner/error-banner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto-Angular-Auth');
}
