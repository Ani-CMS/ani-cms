import { Component } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { RichTextElement } from '../../rich-text-element/rich-text-element.component'

export interface HomeProject {
  richTextElements: RichTextElement<any>[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  homeProjects$ = this.contentfulService.homeProjects$

  constructor(private contentfulService: ContentfulService) {
  }
}
