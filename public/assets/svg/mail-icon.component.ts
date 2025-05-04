// mail-icon.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-mail-icon',
    standalone: true,
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         width="20"
         height="20"
         fill="currentColor">
      <path d="M9.878,12.546a3.007,3.007,0,0,0,4.244,0l9.659-9.66A3,3,0,0,0,21,1H3A3,3,0,0,0,.219,2.886Z"/>
      <path d="M15.536,13.96a5.007,5.007,0,0,1-7.072,0L0,5.5V23H24V5.5Z"/>
    </svg>
  `
})
export class MailSvg { }
