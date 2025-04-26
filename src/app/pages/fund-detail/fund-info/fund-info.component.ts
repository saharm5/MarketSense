import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fund-info',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './fund-info.component.html',
  styleUrls: ['./fund-info.component.css']
})
export class FundInfoComponent {
  fundBasicInfo = [
    { label: 'مدیر صندوق', value: 'نام مدیر' },
    { label: 'مدیر سرمایه‌گذاری', value: 'نام سرمایه‌گذار' },
    // بقیه آیتم‌ها...
  ];

  fundReturnInfo = [
    { label: 'بازده روزانه', value: '0.5%' },
    { label: 'بازده هفتگی', value: '1.2%' },
    // بقیه آیتم‌ها...
  ];
}
