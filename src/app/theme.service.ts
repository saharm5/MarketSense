import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  constructor() { }

  // برای تنظیم تم روشن/تاریک
  setDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  // برای گرفتن وضعیت فعلی تم
  getCurrentTheme(): boolean {
    return document.body.classList.contains('dark');
  }
}
