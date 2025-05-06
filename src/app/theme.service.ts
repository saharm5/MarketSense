// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// @Injectable({ providedIn: 'root' })
// export class ThemeService {
//     private isBrowser: boolean;

//     constructor(
//         @Inject(DOCUMENT) private document: Document,
//         @Inject(PLATFORM_ID) platformId: object
//     ) {
//         this.isBrowser = isPlatformBrowser(platformId);
//     }

//     setDarkMode(isDarkMode: boolean): void {
//         if (!this.isBrowser) return;

//         const html = this.document.documentElement;
//         if (isDarkMode) {
//             html.classList.add('dark');
//         } else {
//             html.classList.remove('dark');
//         }
//     }

//     getCurrentTheme(): boolean {
//         return this.isBrowser && this.document.documentElement.classList.contains('dark');
//     }
// }
