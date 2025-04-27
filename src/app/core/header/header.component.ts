import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faUser, faCogs, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, FontAwesomeModule],
  animations: [
    trigger('fadeRotate', [
      state('light', style({ opacity: 1, transform: 'rotate(0deg)' })),
      state('dark', style({ opacity: 1, transform: 'rotate(360deg)' })),
      transition('light <=> dark', [
        animate('600ms ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  menuOpen = false;
  settingOpen = false;
  isDarkTheme = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faSun, faMoon, faUser, faCogs, faBars);
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark');
    } else {
      this.isDarkTheme = false;
      document.body.classList.remove('dark');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSetting() {
    this.settingOpen = !this.settingOpen;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInsideSetting = (event.target as HTMLElement).closest('.setting-panel') !== null;
    const clickedSettingButton = (event.target as HTMLElement).closest('.setting-button') !== null;
    if (!clickedInsideSetting && !clickedSettingButton) {
      this.settingOpen = false;
    }
  }
}
