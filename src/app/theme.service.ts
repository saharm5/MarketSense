import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setDarkMode(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = this.document.body;
      if (isDarkMode) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }
  }

  getCurrentTheme(): boolean {
    return isPlatformBrowser(this.platformId) && this.document.body.classList.contains('dark');
  }
}
