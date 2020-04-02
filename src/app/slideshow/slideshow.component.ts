import { Component, Input, OnDestroy, OnInit } from '@angular/core'

export interface Slideshow {
  imageUrls: string[]
  width: number
  height: number
}

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  @Input() config: Slideshow

  public imageIndex = 0
  private intervalId: number

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }

  public onImageLoad() {
    if (this.intervalId) {
      return
    }
    this.startSlideShow()
  }

  public onButtonClick(index: number) {
    clearInterval(this.intervalId)
    this.imageIndex = index
    this.startSlideShow()
  }

  private startSlideShow() {
    this.intervalId = setInterval(this.nextImage.bind(this), 5000)
  }

  private nextImage() {
    this.imageIndex =
      this.imageIndex === this.config.imageUrls.length - 1
        ? 0
        : this.imageIndex + 1
  }
}
