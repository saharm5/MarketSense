// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// export interface Fund {
//     id: number;
//     name: string;
//     dailyReturn: string;
//     weeklyReturn: string;
//     monthlyReturn: string;
//     issuePrice: string;
//     redeemPrice: string;
//     totalNAV: number;
// }

// @Injectable({ providedIn: 'root' })
// export class FundService {
//     private funds: Fund[] = [
//         {
//             id: 1,
//             name: 'لوتوس پارسیان',
//             dailyReturn: '0.09',
//             weeklyReturn: '1.00',
//             monthlyReturn: '-2.41',
//             issuePrice: '1,066,663',
//             redeemPrice: '1,066,622',
//             totalNAV: 5535222930261
//         },
//         {
//             id: 2,
//             name: 'صندوق رشد سامان',
//             dailyReturn: '0.12',
//             weeklyReturn: '0.85',
//             monthlyReturn: '1.25',
//             issuePrice: '987,654',
//             redeemPrice: '985,432',
//             totalNAV: 4722009930261
//         }
//     ];

//     getFundById(id: string): Observable<Fund | undefined> {
//         const matchedFund = this.funds.find(fund => fund.id === +id);

//         return of(matchedFund);
//     }
// }
