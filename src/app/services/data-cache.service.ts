// // src/app/core/services/data-cache.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root',
// })
// export class DataCacheService {
//     private readonly cacheDuration = 5 * 60 * 1000; // 5 دقیقه

//     get<T>(key: string): T | null {
//         const raw = localStorage.getItem(key);
//         if (!raw) return null;

//         try {
//             const parsed = JSON.parse(raw);
//             const now = Date.now();
//             const isValid = now - parsed.timestamp < this.cacheDuration;

//             return isValid ? parsed.data : null;
//         } catch {
//             return null;
//         }
//     }

//     set<T>(key: string, data: T): void {
//         const entry = {
//             data,
//             timestamp: Date.now(),
//         };
//         localStorage.setItem(key, JSON.stringify(entry));
//     }

//     clear(key: string): void {
//         localStorage.removeItem(key);
//     }

//     clearAll(): void {
//         localStorage.clear();
//     }
// }
