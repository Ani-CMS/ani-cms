import { Component, Input, OnDestroy, OnInit } from '@angular/core'

export interface SlideshowInput {
  imageUrls: string[]
  width: number
  height: number
}

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnDestroy {
  @Input() slideshow: SlideshowInput

  public imageIndex = 0
  private intervalId: number

  ngOnInit(): void {
    console.log('SlideshowComponent', this.slideshow)
  }

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
