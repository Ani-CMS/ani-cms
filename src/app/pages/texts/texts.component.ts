import { Component, OnInit } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { Title } from '@angular/platform-browser'
import { Observable } from 'rxjs'
import { RichTextConfig } from '../../rich-text/rich-text.component'

export interface LongText {
  id: string
  richTextConfig: RichTextConfig
}
@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css'],
})
export class TextsComponent implements OnInit {
  linkedText$ = this.contentfulService.linkedTexts$
  longTexts$: Observable<LongText[]> = this.contentfulService.longTexts$

  constructor(
    private contentfulService: ContentfulService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('ABOUT')
  }

  onUp() {
    window.scrollTo(0, 0)
  }
}
