import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";

interface FooterItem {
  iconPath: string;
  label: string;
  href?: string; 
}

interface FooterSection {
  label: string;
  items: FooterItem[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  menuOpen = false;
  openSubMenu: string | null = null;

  footerSections: FooterSection[] = [
    {
      label: 'لینک‌ها',
      items: [
        { iconPath: 'assets/icons/pin.svg', label: 'نمادهای برگزیده', href: '#' },
        { iconPath: 'assets/icons/star.svg', label: 'دنبال شده‌ها', href: '#' },
        { iconPath: 'assets/icons/trophy.svg', label: 'برترین تریدرها', href: '#' },
      ]
    },
    {
      label: 'ارتباط با ما',
      items: [
        { iconPath: 'assets/icons/mail.svg', label: 'شکایات و پیشنهادات', href: '#' },
        { iconPath: 'assets/icons/questions.svg', label: 'سوالات متداول (FAQ)', href: '#' },
        { iconPath: 'assets/icons/telegram.svg', label: 'شبکه‌های اجتماعی', href: '#' },
      ]
    },
    {
      label: 'تماس با ما',
      items: [
        { iconPath: 'assets/icons/phone.svg', label: 'پشتیبانی فنی: 09123456789' },
        { iconPath: 'assets/icons/chart-histogram.svg', label: 'تحلیلگر سرمایه‌گذاری: 09123456789' },
      ]
    }
  ];


  toggleMobileSubMenu(label: string) {
    this.openSubMenu = this.openSubMenu === label ? null : label;
  }
}
