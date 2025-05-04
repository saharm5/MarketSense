// moon-icon.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-moon-icon',
    standalone: true,
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         width="24"
         height="24"
         fill="currentColor">
      <path d="M14,24A12.013,12.013,0,0,1,2,12C1.847,3.044,12.031-2.985,19.791,1.509l1.553.862-1.543.88c-6.7,3.688-6.21,13.87.8,16.906l1.621.731-1.467,1.006A11.921,11.921,0,0,1,14,24Z" />
    </svg>
  `
})
export class MoonIconComponent { }
