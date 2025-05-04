import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faUser, faCogs, faBars, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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

  // toggleSubMenu(label: string) {
  //   if (this.openSubMenu === label) {
  //     this.openSubMenu = null;
  //   } else {
  //     this.openSubMenu = label;
  //   }
  // }


  settingOpen = false;
  isDarkTheme = false;
  menuOpen = false;
  openSubMenu: string | null = null;

  menuItems = [
    {
      label: 'صندوق‌ها',
      submenu: [
        { title: 'اطلاعات صندوقها', links: [' فهرست صندوق های سرمایه گذاری', 'نقشه صندوق های سرمایه گذاری', ' گراف وابستگی صندوق های سرمایه گذاری', 'اطلاعات تجمیعی انواع صندوق های سرمایه گذاری', 'مقایسه بازده', 'گزارشات ماهانه صندوقها'] }
      ]
    },
    {
      label: 'تحلیل',
      submenu: [
        { title: ' نمودارها', links: ['مقایسه بازده'] },
        { title: 'مقایسه اطلاعات مالی شرکتها', links: [' مقایسه ی ترازنامه شرکتها', 'مقایسه ی صورت سود و زیان شرکتها'] },
      ]
    },
    {
      label: 'اخبار',
      submenu: [
        { title: 'موضوعات', links: [' بازار سرمایه', ' بورس و فرابورس', ' کالا و انرژی', 'مجامع و شرکتها', 'اقتصاد'] },
        { title: ' خبرگزاری ها', links: ['سنا', 'بورس نیوز', ' بورس پرس', 'دنیای اقتصاد', 'فارس', 'ایسنا', ' جهان اقتصاد'] }
      ]
    },
    {
      label: 'بازار',
      submenu: [
        { title: 'بورس', links: ['سهام', 'حق پیشروی', ' اوراق مشارکت', ' آمار و اطلاعات'] },
        { title: 'فرابورس', links: ['سهام', 'حق پیشروی', ' اوراق مشارکت', ' آمار و اطلاعات', 'پایه فرابورس'] },
        { title: 'شاخص ها و صنایع', links: [' لیست شاخصها', ' بازده شاخصها و منابع'] },
        { title: 'صنایع', links: ['نمودارها'] },

      ]
    }
  ];

  constructor(library: FaIconLibrary) {
    library.addIcons(faSun, faMoon, faUser, faCogs, faBars, faChevronUp, faChevronDown);
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDarkTheme = false;
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMobileSubMenu(label: string) {
    this.openSubMenu = this.openSubMenu === label ? null : label;
  }

  toggleSetting(event: MouseEvent) {
    event.stopPropagation();
    this.settingOpen = !this.settingOpen;
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
