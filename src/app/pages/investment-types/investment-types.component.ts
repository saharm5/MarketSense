import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-investment-types',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './investment-types.component.html',
    styleUrls: ['./investment-types.component.css']
})
export class InvestmentTypesComponent { }
