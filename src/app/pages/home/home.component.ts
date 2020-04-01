import { Component, ViewEncapsulation } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { Observable } from 'rxjs'
import { RichTextConfig } from '../../rich-text/rich-text.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  richTextConfig$: Observable<RichTextConfig> = this.contentfulService
    .homeProjects$

  constructor(private contentfulService: ContentfulService) {}
}
