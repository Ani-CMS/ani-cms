import { Component, Input, OnInit } from '@angular/core'

export interface OverlayImage {
  src: string
  figcaption: string
  width: number
  height: number
}

@Component({
  selector: 'app-overlay-image',
  templateUrl: './overlay-image.component.html',
  styleUrls: ['./overlay-image.component.css'],
})
export class OverlayImageComponent implements OnInit {
  @Input() config: OverlayImage
  // @HostBinding('style.padding-bottom') paddingBottom = '0px'
  constructor() {}
  ngOnInit(): void {
    // this.paddingBottom = `${(this.config.height / this.config.width) * 100}%`
  }
}
