import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-table.component.html',
  styleUrl: './info-table.component.css',
})
export class InfoTableComponent {
  @Input() fundPerformance: {
    name: string;
    items: { title: string; value: number | string }[];
  }[] = [];

  isPositive(value: number | string): boolean {
    return typeof value === 'number' && value > 0;
  }

  isNegative(value: number | string): boolean {
    return typeof value === 'number' && value < 0;
  }

  isZero(value: number | string): boolean {
    return typeof value === 'number' && value === 0;
  }

  isString(value: number | string): boolean {
    return typeof value === 'string';
  }

  getMonthlyReturn(section: {
    name: string;
    items: { title: string; value: number | string }[];
  }): number | null {
    const monthly = section.items.find(
      item => item.title === 'بازده ماهانه'
    );

    return typeof monthly?.value === 'number' ? monthly.value : null;
  }

  getHeaderClass(section: {
    name: string;
    items: { title: string; value: number | string }[];
  }): string {
    if (section.name !== 'اطلاعات بازده صندوق') {

      return 'bg-gray-100';
    }

    const monthlyReturn = this.getMonthlyReturn(section);

    if (monthlyReturn === null) {

      return 'bg-gray-100';
    }

    if (monthlyReturn > 0) {

      return 'bg-green-100';
    }

    if (monthlyReturn < 0) {

      return 'bg-red-100';
    }

    return 'bg-gray-200';
  }
}
