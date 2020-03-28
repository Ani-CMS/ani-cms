import { Component, Input, OnDestroy } from '@angular/core'

export interface Slideshow {
  imageUrls: string[]
  width: string
  height: string
  // '(height / width)px'
  aspectRatio: string
}

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnDestroy {
  @Input() slideshow: Slideshow

  public imageIndex = 0
  private intervalId: number

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
    this.intervalId = setInterval(this.nextImage.bind(this), 3000)
  }

  private nextImage() {
    this.imageIndex =
      this.imageIndex === this.slideshow.imageUrls.length - 1
        ? 0
        : this.imageIndex + 1
  }
}
