import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-table.component.html',
  styleUrl: './info-table.component.css'
})
export class InfoTableComponent {
  fundPerformance = [
    {
      name: 'اطلاعات بازده صندوق',
      items: [
        { title: 'بازده روزانه', value: 1.0 },
        { title: 'بازده هفتگی', value: 1.4 },
        { title: 'بازده ماهانه', value: -2.87 },
        { title: 'بازده سه‌ماهه', value: 1.0 },
        { title: 'بازده شش‌ماهه', value: 0 },
        { title: 'بازده یک‌ساله', value: 1.0 },
        { title: 'بازده از ابتدا', value: 1.0 },
        { title: 'نرخ سود پیش‌بینی شده', value: 1.0 },
        { title: 'آلفا', value: 1.62 },
        { title: 'بتا', value: 1.45 },
      ]
    }
  ];

}
