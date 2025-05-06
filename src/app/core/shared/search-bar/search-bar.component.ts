import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  search = '';
  faSearch = faSearch;

  constructor(private router: Router) { }

  handleSearch(event: Event): void {
    event.preventDefault();
    const trimmed = this.search.trim();
    if (trimmed) {
      console.log('جستجو شده:', trimmed);
      this.router.navigate(['/Products'], { queryParams: { search: trimmed } });
      this.search = '';
    }
  }
}
