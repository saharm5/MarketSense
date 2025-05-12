import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  imports: [],
  template: '',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent {
  @HostBinding('style.maskImage')
  @HostBinding('style.webkitMaskImage')
  public maskStyle = '';

  @Input() set path(filePath: string) {
    this.maskStyle = `url("${filePath}")`;
  }
}
