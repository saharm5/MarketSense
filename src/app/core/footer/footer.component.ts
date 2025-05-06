import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MailIconComponent } from '../../../assets/svg/mail-icon.component';

interface FooterItem {
  icon: string;
  label: string;
  href?: string; // <== اینجا optional کردیم
}

interface FooterSection {
  label: string;
  items: FooterItem[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
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
        { icon: '📌', label: 'نمادهای برگزیده', href: '#' },
        { icon: '⭐', label: 'دنبال شده‌ها', href: '#' },
        { icon: '🏆', label: 'برترین تریدرها', href: '#' },
      ]
    },
    {
      label: 'ارتباط با ما',
      items: [
        { icon: '📨', label: 'شکایات و پیشنهادات', href: '#' },
        { icon: '❓', label: 'سوالات متداول (FAQ)', href: '#' },
        { icon: '🌐', label: 'شبکه‌های اجتماعی', href: '#' },
      ]
    },
    {
      label: 'تماس با ما',
      items: [
        { icon: '📞', label: 'پشتیبانی فنی: 09123456789' },
        { icon: '📈', label: 'تحلیلگر سرمایه‌گذاری: 09123456789' },
      ]
    }
  ];


  toggleMobileSubMenu(label: string) {
    this.openSubMenu = this.openSubMenu === label ? null : label;
  }
}
