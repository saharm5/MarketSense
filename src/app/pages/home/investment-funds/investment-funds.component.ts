import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faPiggyBank,
  faChartLine,
  faBalanceScale,
  faCoins,
  faRandom,
  faChartArea,
  faProjectDiagram,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import { SvgIconComponent } from "../../../core/svg-icon/svg-icon.component";

@Component({
  selector: 'app-investment-funds',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SvgIconComponent],
  templateUrl: './investment-funds.component.html',
  styleUrl: './investment-funds.component.css'
})
export class InvestmentFundsComponent {
  funds = [
    {
      title: 'صندوق درآمد ثابت',
      link:"#",
      icon: 'assets/icons/bank.svg',
      description: 'سرمایه‌گذاری با ریسک پایین و سود ثابت.',
    },
    {
      title: 'صندوق سهامی',
      link:"#",
      icon: 'assets/icons/chart-line-up.svg',
      description: 'تمرکز بر سهام بورس با ریسک و بازده بیشتر.',
    },
    {
      title: 'صندوق مختلط',
      link:"#",
      icon: 'assets/icons/scale.svg',
      description: 'ترکیبی از سهام و اوراق با درآمد ثابت.',
    },
    {
      title: 'صندوق طلا',
      link:"#",
      icon: 'assets/icons/coins.svg',
      description: 'سرمایه‌گذاری در اوراق بهادار مبتنی بر طلا.',
    },
    {
      title: 'صندوق ETF',
      link:"#",
      icon: 'assets/icons/shuffle.svg',
      description: 'صندوق قابل معامله در بورس مانند سهام.',
    },
    {
      title: 'صندوق شاخصی',
      link:"#",
      icon: 'assets/icons/chart-area.svg',
      description: 'پیروی از شاخص‌های بازار مثل شاخص کل.',
    },
    {
      title: 'صندوق پروژه‌ای / خصوصی',
      link:"#",
      icon: 'assets/icons/diagram-project.svg',
      description: 'سرمایه‌گذاری در پروژه‌ها یا شرکت‌های خاص.',
    },
    {
      title: 'صندوق زمین و ساختمان',
      link:"#",
      icon: 'assets/icons/building.svg',
      description: 'متمرکز بر املاک، زمین و ساخت‌وساز.',
    },
  ];

  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(
      faPiggyBank,
      faChartLine,
      faBalanceScale,
      faCoins,
      faRandom,
      faChartArea,
      faProjectDiagram,
      faBuilding
    );
  }
}
