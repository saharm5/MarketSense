import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMapComponent } from '../../core/shared/tree-map/tree-map.component';

@Component({
  selector: 'app-tree-map-page',
  standalone: true,
  imports: [CommonModule, TreeMapComponent],
  templateUrl: './tree-map-page.component.html',
})
export class TreeMapPageComponent { }
