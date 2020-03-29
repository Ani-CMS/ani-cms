import { Component, ViewEncapsulation } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { SlideshowInput } from '../../slideshow/slideshow.component'

export interface HomeProjects {
  slideshows: SlideshowInput[],
  images: any[],
  richText: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  homeProjects$ = this.contentfulService.homeProjects$

  constructor(private contentfulService: ContentfulService) {}

  onInnerHtmlRendered() {
    console.log(1)
    // search template and replace div.slideshow
  }
}
