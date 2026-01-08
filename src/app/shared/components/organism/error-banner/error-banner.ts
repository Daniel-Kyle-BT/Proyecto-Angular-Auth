import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ErrorStateService } from '@core/error/error-state.service';
import { CardErrorComponent } from "@shared/components/molecules/card-error/card-error";

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule, CardErrorComponent],
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.css',
})
export class ErrorBannerComponent {
  error = inject(ErrorStateService).error;
}